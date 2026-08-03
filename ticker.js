// ticker.js - Complete File

const FALLBACK_FEED_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss";

async function fetchNews() {
  const newsTickerContent = document.getElementById("news-ticker-content");
  if (!newsTickerContent) return;

  try {
    const response = await fetch(FALLBACK_FEED_URL);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data && data.status === "ok" && Array.isArray(data.items)) {
      displayNews(data.items, newsTickerContent);
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

  const limitedArticles = articles.slice(0, 12);
  const fragment = document.createDocumentFragment();

  // Create two duplicate sets so the continuous loop never breaks
  for (let i = 0; i < 2; i++) {
    limitedArticles.forEach(article => {
      if (!article.title) return;
      const newsItem = document.createElement("span");
      newsItem.textContent = article.title.trim();
      fragment.appendChild(newsItem);
    });
  }

  container.appendChild(fragment);
}

function displayFallback(message, container) {
  container.innerHTML = "";
  const fallbackItem = document.createElement("span");
  fallbackItem.textContent = message;
  container.appendChild(fallbackItem);
}

// Fetch the news when the page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fetchNews);
} else {
  fetchNews();
}
