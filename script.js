document.addEventListener("DOMContentLoaded", () => {
  // Theme Switching
  const themeSwitch = document.getElementById('theme-switch');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeSwitch.checked = true;
  }
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Page Loader
  const pageLoader = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.querySelector('.page-loader');
        if (loader) loader.style.opacity = '0';
        setTimeout(() => {
          if (loader) loader.style.display = 'none';
        }, 500);
      }, 800);
    });
  };

  // Scroll Animations
  const scrollAnimations = () => {
    const scrollElements = document.querySelectorAll(".js-scroll");
    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };
    const displayScrollElement = el => el.classList.add("scrolled");
    const handleScrollAnimation = () => {
      scrollElements.forEach(el => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        }
      });
    };
    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();
  };

  // News Ticker
  const initTicker = () => {
    const ticker = document.querySelector('.ticker');
    if (ticker) {
      ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
      const tickerWidth = ticker.scrollWidth / 2;
      const duration = Math.max(30, tickerWidth / 50);
      ticker.style.animationDuration = `${duration}s`;
    }
  };

  // About Page Hero
  const aboutHeroShrink = () => {
    const aboutHero = document.querySelector(".hero.about-hero");
    const aboutPageContainer = document.querySelector(".about-page-container");
    if (aboutHero && aboutPageContainer) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) document.body.classList.add("scrolled-about");
          else document.body.classList.remove("scrolled-about");
        });
      }, { threshold: 0.1 });
      observer.observe(aboutPageContainer);
    }
  };

  // Contact Form
  const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    const formSuccess = document.getElementById('formSuccess');
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
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
          setTimeout(() => {
            contactForm.style.display = 'flex';
            formSuccess.style.display = 'none';
          }, 5000);
        }
      } catch {
        alert('Error sending message. Please email me directly at b9.ashish@gmail.com');
      }
    });
  };

// Notes Page: Modal, Search & Filter Behavior
const initNotesPage = () => {
    const notesGrid = document.getElementById('notesGrid');
    if (!notesGrid) return;

    const modalOverlay = document.getElementById('noteModalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalProblem = document.getElementById('modalProblem');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const searchInput = document.getElementById('notes-search');
    const categoryButtons = document.querySelectorAll('.category-filters button');
    const modalFixesContainer = document.querySelector('.modal-fixes'); // New line

    // Function to close modal
    const closeModal = () => {
      modalOverlay.classList.remove('active');
    };

    // Open modal when a note card is clicked
    notesGrid.addEventListener('click', e => {
      const noteCard = e.target.closest('.note-card');
      if (!noteCard) return;

      const title = noteCard.getAttribute('data-title');
      const problem = noteCard.getAttribute('data-problem');
      const fixesListString = noteCard.getAttribute('data-fixes-list'); // New line
      const fixesList = fixesListString ? JSON.parse(fixesListString) : []; // New line

      modalTitle.textContent = title;
      modalProblem.textContent = problem;
      
      // Clear previous fixes and add the new, detailed steps
      modalFixesContainer.innerHTML = ''; // New line
      fixesList.forEach(fix => { // New line
        const fixTitle = document.createElement('h4'); // New line
        fixTitle.innerHTML = fix.title; // New line
        modalFixesContainer.appendChild(fixTitle); // New line
        
        const stepsList = document.createElement('ul'); // New line
        fix.steps.forEach(step => { // New line
          const stepItem = document.createElement('li'); // New line
          stepItem.innerHTML = step; // New line
          stepsList.appendChild(stepItem); // New line
        }); // New line
        modalFixesContainer.appendChild(stepsList); // New line
      }); // New line
      
      modalOverlay.classList.add('active');
    });

    // Close modal via button
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal by clicking outside
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Close modal with Esc key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Search Filter: filter visible note-cards
    searchInput?.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.note-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
      });
    });

    // Category Filter: filter visible note-cards
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        document.querySelectorAll('.note-card').forEach(card => {
          card.style.display =
            category === 'all' || card.dataset.category === category
              ? 'block'
              : 'none';
        });
      });
    });
};

  // Parallax Effect
  const initParallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = `-${scrollPosition * 0.3}px`;
    });
  };

  // Activate
  pageLoader();
  scrollAnimations();
  initTicker();
  aboutHeroShrink();
  handleContactForm();
  initNotesPage();
  initParallax();
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = `${scrollPercent}%`;
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTopBtn.classList.add('show');
  else backToTopBtn?.classList.remove('show');
});
backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
