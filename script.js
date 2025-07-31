document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. PAGE LOADER =====
  const pageLoader = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelector('.page-loader').style.opacity = '0';
        setTimeout(() => {
          document.querySelector('.page-loader').style.display = 'none';
        }, 500);
      }, 800);
    });
  };

  // ===== 2. SCROLL ANIMATIONS =====
  const scrollAnimations = () => {
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

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();
  };

  // ===== 3. NEWS TICKER =====
  const initTicker = () => {
    const ticker = document.querySelector('.ticker');
    if (ticker) {
      ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
      const tickerWidth = ticker.scrollWidth / 2;
      const duration = Math.max(30, tickerWidth / 50);
      ticker.style.animationDuration = `${duration}s`;
    }
  };

  // ===== 4. ABOUT PAGE HERO SHRINK =====
  const aboutHeroShrink = () => {
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
  };

  // ===== 5. CONTACT FORM =====
  const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Fallback to mailto if Formspree fails
      if (!contactForm.action.includes('formspree')) {
        contactForm.setAttribute('action', 'mailto:b9.ashish@gmail.com');
        contactForm.submit();
        return;
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
          contactForm.reset();
          
          // Reset form after 5 seconds
          setTimeout(() => {
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
          }, 5000);
        }
      } catch (error) {
        alert('Error sending message. Please email me directly at b9.ashish@gmail.com');
      }
    });
  };

  // ===== 6. NOTES PAGE FUNCTIONALITY =====
  const initNotesPage = () => {
    if (!document.querySelector('.notes-grid')) return;

    const noteCards = document.querySelectorAll('.note-card');
    const modal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const searchInput = document.getElementById('notes-search');
    const categoryButtons = document.querySelectorAll('.category-filters button');
    
    // Sample note database
    const notesDatabase = {
      1: {
        title: "📋 Fix Clipboard Sync in Windows",
        content: `<p><strong>Steps to resolve clipboard sync issues:</strong></p>
                  <ol>
                    <li>Open Settings > System > Clipboard</li>
                    <li>Toggle "Clipboard history" off and on</li>
                    <li>Run: <code>net stop cbdhsvc & net start cbdhsvc</code></li>
                    <li>Reboot your machine</li>
                  </ol>`,
        category: "windows"
      },
      2: {
        title: "🌐 Nginx Reverse Proxy Setup",
        content: `<p><strong>Basic Nginx configuration:</strong></p>
                  <pre><code>server {
  listen 80;
  server_name yourdomain.com;
  
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
  }
}</code></pre>`,
        category: "linux web"
      }
    };

    // Note card click handler
    noteCards.forEach(card => {
      card.addEventListener('click', () => {
        const noteId = card.dataset.index;
        const note = notesDatabase[noteId];
        
        modalTitle.textContent = note.title;
        modalContent.innerHTML = note.content;
        modal.style.display = 'flex';
      });
    });

// Close the modal when the close button is clicked or when clicking outside the modal
document.querySelector('.close-modal')?.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

    // Search functionality
    searchInput?.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      noteCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
      });
    });

    // Category filtering
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        noteCards.forEach(card => {
          if (category === 'all') {
            card.style.display = 'block';
          } else {
            const noteId = card.dataset.index;
            const note = notesDatabase[noteId];
            card.style.display = note.category.includes(category) 
              ? 'block' 
              : 'none';
          }
        });
      });
    });
  };

  // Initialize all functions
  pageLoader();
  scrollAnimations();
  initTicker();
  aboutHeroShrink();
  handleContactForm();
  initNotesPage();
});

// Close the modal when the close button is clicked or when clicking outside the modal
document.querySelector('.close-modal')?.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
