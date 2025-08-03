// Your unique API key from NewsAPI.org
const apiKey = "0a4d93266a064206bc67158cb87d5f60";

// The API endpoint for top headlines, filtered for 'technology'
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

// The HTML element where the news headlines will be displayed
const newsTickerContent = document.getElementById("news-ticker-content");

// Function to fetch news from the API
async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "ok") {
      const articles = data.articles.slice(0, 20); // Get the top 20 articles
      displayNews(articles);
    } else {
      console.error("Error fetching news:", data.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to display the news headlines in the ticker
function displayNews(articles) {
  // Clear existing content from the ticker container
  newsTickerContent.innerHTML = "";

  // To create a continuous loop, we need two full sets of content.
  // This loop explicitly creates and appends both sets.
  for (let i = 0; i < 2; i++) {
    articles.forEach(article => {
      const newsItem = document.createElement("span");
      newsItem.textContent = ` ${article.title} `;
      newsTickerContent.appendChild(newsItem);
    });
  }
}

// Fetch the news when the page loads
fetchNews();