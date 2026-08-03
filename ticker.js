// ticker.js - Complete File with In-Site Modal Reader

const FALLBACK_FEED_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss";
let fetchedArticles = [];

async function fetchNews() {
  const newsTickerContent = document.getElementById("news-ticker-content");
  if (!newsTickerContent) return;

  try {
    const response = await fetch(FALLBACK_FEED_URL);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data && data.status === "ok" && Array.isArray(data.items)) {
      fetchedArticles = data.items.slice(0, 12);
      displayNews(fetchedArticles, newsTickerContent);
    } else {
      displayFallback("Latest tech news updates loading soon...", newsTickerContent);
    }
  } catch (error) {
    console.error("News Ticker Error:", error);
    displayFallback("Tech News Ticker Temporarily Offline", newsTickerContent);
  }
}

function displayNews(articles, container) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  // Duplicate the list twice for seamless continuous loop
  for (let loop = 0; loop < 2; loop++) {
    articles.forEach((article, index) => {
      if (!article.title) return;
      const newsItem = document.createElement("span");
      newsItem.textContent = article.title.trim();
      newsItem.className = "ticker-item";
      newsItem.dataset.index = index;
      
      // Open article modal on click
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

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = article.title || "Tech Headline";
  if (modalDate) modalDate.textContent = article.pubDate ? new Date(article.pubDate).toLocaleDateString() : "Recent";
  if (modalDesc) {
    // Strip raw HTML tags if description has any
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = article.description || article.content || "No detailed summary available for this headline.";
    modalDesc.textContent = tempDiv.textContent || tempDiv.innerText || "";
  }

  modal.classList.add("active");
}

function displayFallback(message, container) {
  container.innerHTML = "";
  const fallbackItem = document.createElement("span");
  fallbackItem.textContent = message;
  container.appendChild(fallbackItem);
}

// Modal Close Listener
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
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fetchNews);
} else {
  fetchNews();
}
