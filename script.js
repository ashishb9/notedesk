document.addEventListener("DOMContentLoaded", () => {
  console.log("NoteDesk site loaded.");

  // Scroll animations
  const scrollElements = document.querySelectorAll(".js-scroll");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };

  // News Ticker Enhancement
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
    const tickerWidth = ticker.scrollWidth / 2;
    const duration = Math.max(30, tickerWidth / 50);
    ticker.style.animationDuration = `${duration}s`;
  }

  // About Page Hero Shrink
  const aboutHero = document.querySelector(".hero.about-hero");
  const aboutPageContainer = document.querySelector(".about-page-container");

  if (aboutHero && aboutPageContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.body.classList.add("scrolled-about");
        } else {
          document.body.classList.remove("scrolled-about");
        }
      });
    }, { threshold: 0.1 });

    observer.observe(aboutPageContainer);
  }

  // Notes Page Functionality
  if (document.querySelector('.notes-container')) {
    const searchInput = document.getElementById('notes-search');
    const noteCards = document.querySelectorAll('.note-card');
    const categoryButtons = document.querySelectorAll('.category-filters button');

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      noteCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
      });
    });

    // Category Filtering
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        noteCards.forEach(card => {
          if (category === 'all') {
            card.style.display = 'block';
          } else {
            card.style.display = card.dataset.categories.includes(category) 
              ? 'block' 
              : 'none';
          }
        });
      });
    });
  }

  // Initialize
  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();
});
