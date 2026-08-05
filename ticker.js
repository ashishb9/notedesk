// ticker.js - Modernized News Ticker & Rich Reader Modal

// Using Dev.to RSS feed converted to JSON (Provides rich full summaries & direct links!)
const PRIMARY_TECH_FEED = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fdev.to%2Ffeed%2Ftag%2Ftechnology";
const FALLBACK_FEED = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fhnrss.org%2Fnewest%3Fpoints%3D50";

let articlesList = [];

function showTickerSkeleton(container) {
  container.innerHTML = `
    <div class="ticker-skeleton">
      <span class="skeleton-bar"></span>
      <span class="skeleton-bar"></span>
      <span class="skeleton-bar"></span>
      <span class="skeleton-bar"></span>
    </div>
  `;
}

async function fetchNews() {
  const newsTickerContent = document.getElementById("news-ticker-content");
  if (!newsTickerContent) return;

  showTickerSkeleton(newsTickerContent);

  try {
    let response = await fetch(PRIMARY_TECH_FEED);
    let data = await response.json();

    if (!data || data.status !== "ok" || !Array.isArray(data.items) || data.items.length === 0) {
      // Fallback if primary fails
      response = await fetch(FALLBACK_FEED);
      data = await response.json();
    }

    if (data && data.status === "ok" && Array.isArray(data.items)) {
      articlesList = data.items.slice(0, 12);
      displayNews(articlesList, newsTickerContent);
    } else {
      displayFallback("Latest tech news updates loading soon...", newsTickerContent);
    }
  } catch (error) {
    console.error("News Ticker Fetch Error:", error);
    displayFallback("Tech news ticker is temporarily unavailable — check back soon.", newsTickerContent);
  }
}

function displayNews(articles, container) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  // Create duplicate set for infinite seamless scrolling
  for (let loop = 0; loop < 2; loop++) {
    articles.forEach((article, index) => {
      if (!article.title) return;
      const newsItem = document.createElement("span");
      newsItem.textContent = article.title.trim();
      newsItem.className = "ticker-item";
      newsItem.dataset.index = index;
      
      // Open modal on click
      newsItem.addEventListener("click", () => openNewsModal(article));
      
      fragment.appendChild(newsItem);
    });
  }

  container.appendChild(fragment);
}

function openNewsModal(article) {
  const modal = document.getElementById("newsModalOverlay");
  const modalTitle = document.getElementById("newsModalTitle");
  const modalDate = document.getElementById("newsModalDate");
  const modalDesc = document.getElementById("newsModalDescription");
  const modalLink = document.getElementById("newsModalSourceLink");

  if (!modal) return;

  // Set Title
  if (modalTitle) modalTitle.textContent = article.title || "Tech Article Details";

  // Set Date
  if (modalDate) {
    const pubDate = article.pubDate ? new Date(article.pubDate) : new Date();
    modalDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }

  // Set Rich Summary Content
  if (modalDesc) {
    let summaryText = "";

    if (article.description || article.content) {
      // Clean HTML tags and inline styles for a ultra-clean text view
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = article.description || article.content;
      
      // Grab text contents while preserving standard paragraph structure
      const paragraphs = tempDiv.querySelectorAll("p");
      if (paragraphs.length > 0) {
        summaryText = Array.from(paragraphs)
          .map(p => p.textContent.trim())
          .filter(t => t.length > 20)
          .slice(0, 3)
          .join("<br><br>");
      } else {
        summaryText = tempDiv.textContent || tempDiv.innerText || "";
      }
    }

    if (!summaryText || summaryText.trim().length < 30) {
      summaryText = "Explore the full coverage and discussion on this recent technology topic using the original source link below.";
    }

    modalDesc.innerHTML = summaryText;
  }

  // Set External Link
  if (modalLink) {
    if (article.link || article.guid) {
      modalLink.href = article.link || article.guid;
      modalLink.style.display = "inline-flex";
    } else {
      modalLink.style.display = "none";
    }
  }

  modal.classList.add("active");
}

function displayFallback(message, container) {
  container.innerHTML = "";
  const fallbackItem = document.createElement("span");
  fallbackItem.textContent = message;
  container.appendChild(fallbackItem);
}

// Attach Close Event Handlers safely
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("newsModalOverlay");
  const closeBtn = document.getElementById("closeNewsModalBtn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fetchNews);
} else {
  fetchNews();
}
