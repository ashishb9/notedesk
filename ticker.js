// Your unique API key from NewsData.io
const apiKey = "pub_e6900b8cca354741b760c1ea222bb8aa";

// The API endpoint for top headlines, filtered for 'technology'
const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=technology`;

// The HTML element where the news headlines will be displayed
const newsTickerContent = document.getElementById("news-ticker-content");

// Function to fetch news from the API
async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check for successful response and data
    if (data && data.results) {
      const articles = data.results.slice(0, 20); // Get the top 20 articles
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