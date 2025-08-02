document.addEventListener("DOMContentLoaded", () => {
    // ===================================
    // 1. THEME SWITCHING
    // ===================================
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
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
    }

    // Add background to nav on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ===================================
    // 2. UTILITY FUNCTIONS
    // ===================================

    // Page Loader
    const pageLoader = () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 800);
            });
        }
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
            }, {
                threshold: 0.1
            });
            observer.observe(aboutPageContainer);
        }
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

    // Scroll Progress Bar
    const initScrollProgressBar = () => {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    };

    // Back to Top Button
    const initBackToTopBtn = () => {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // ===================================
    // 3. PAGE-SPECIFIC LOGIC
    // ===================================

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
                    headers: {
                        'Accept': 'application/json'
                    }
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

        // Fetch data from the new JSON file
        fetch('notes.json')
            .then(response => response.json())
            .then(notesData => {
                const modalOverlay = document.getElementById('noteModalOverlay');
                const modalTitle = document.getElementById('modalTitle');
                const modalProblem = document.getElementById('modalProblem');
                const closeModalBtn = document.getElementById('closeModalBtn');
                const searchInput = document.getElementById('notes-search');
                const categoryButtons = document.querySelectorAll('.category-filters button');
                const modalFixesContainer = document.querySelector('.modal-fixes');

                const generateNoteCards = (data) => {
                    notesGrid.innerHTML = '';
                    data.forEach(note => {
                        const card = document.createElement('div');
                        card.className = 'note-card';
                        card.dataset.id = note.id;
                        card.dataset.category = note.category;
                        card.dataset.title = note.title;
                        card.innerHTML = `
                            <h3><i class="fa-solid fa-gear"></i> ${note.title}</h3>
                            <p class="card-problem"><strong>Problem:</strong> ${note.problem}</p>
                        `;
                        notesGrid.appendChild(card);
                    });
                };

                const closeModal = () => {
                    if (modalOverlay) modalOverlay.classList.remove('active');
                };

                notesGrid.addEventListener('click', e => {
                    const noteCard = e.target.closest('.note-card');
                    if (!noteCard) return;

                    const noteId = parseInt(noteCard.dataset.id);
                    const note = notesData.find(n => n.id === noteId);

                    if (!note) return;

                    if (modalTitle) modalTitle.textContent = note.title;
                    if (modalProblem) modalProblem.textContent = note.problem;

                    if (modalFixesContainer) {
                        modalFixesContainer.innerHTML = '';
                        if (note.fixes && Array.isArray(note.fixes)) {
                            note.fixes.forEach(fix => {
                                const fixTitle = document.createElement('h4');
                                fixTitle.innerHTML = fix.title;
                                modalFixesContainer.appendChild(fixTitle);

                                const stepsList = document.createElement('ul');
                                if (fix.steps && Array.isArray(fix.steps)) {
                                    fix.steps.forEach(step => {
                                        const stepItem = document.createElement('li');
                                        stepItem.innerHTML = step;
                                        stepsList.appendChild(stepItem);
                                    });
                                }
                                modalFixesContainer.appendChild(stepsList);
                            });
                        }
                    }

                    if (modalOverlay) modalOverlay.classList.add('active');
                });

                if (closeModalBtn) {
                    closeModalBtn.addEventListener('click', closeModal);
                }
                if (modalOverlay) {
                    modalOverlay.addEventListener('click', (e) => {
                        if (e.target === modalOverlay) {
                            closeModal();
                        }
                    });
                }
                document.addEventListener('keydown', e => {
                    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
                        closeModal();
                    }
                });

                if (searchInput) {
                    searchInput.addEventListener('input', e => {
                        const term = e.target.value.toLowerCase();
                        const filteredNotes = notesData.filter(note =>
                            note.title.toLowerCase().includes(term) ||
                            note.problem.toLowerCase().includes(term) ||
                            (note.fixes && note.fixes.some(fix => fix.title.toLowerCase().includes(term) || (fix.steps && fix.steps.some(step => step.toLowerCase().includes(term)))))
                        );
                        generateNoteCards(filteredNotes);
                    });
                }

                if (categoryButtons) {
                    categoryButtons.forEach(btn => {
                        btn.addEventListener('click', () => {
                            categoryButtons.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            const category = btn.dataset.category;
                            const filteredNotes = category === 'all' ? notesData : notesData.filter(note => note.category === category);
                            generateNoteCards(filteredNotes);
                        });
                    });
                }

                // Check for a category in the URL and apply filter, otherwise default to 'All'
                const urlParams = new URLSearchParams(window.location.search);
                const urlCategory = urlParams.get('category');

                if (urlCategory) {
                    const categoryButton = document.querySelector(`.category-filters button[data-category="${urlCategory}"]`);
                    if (categoryButton) {
                        categoryButton.click();
                    } else {
                        // Fallback to 'All' if the category in the URL doesn't exist
                        document.querySelector('.category-filters button[data-category="all"]').click();
                    }
                } else {
                    // Default to 'All' if no category is specified in the URL
                    const allButton = document.querySelector('.category-filters button[data-category="all"]');
                    if (allButton) {
                        allButton.click();
                    }
                }
            });
    };
    
    // Hamburger Menu (This was a separate listener, now it's integrated)
    const initHamburger = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
    };

    // ===================================
    // 4. INITIALIZATION
    // ===================================

    // Call all initialization functions here
    pageLoader();
    scrollAnimations();
    initTicker();
    aboutHeroShrink();
    handleContactForm();
    initNotesPage();
    initParallax();
    initScrollProgressBar();
    initBackToTopBtn();
    initHamburger(); // Added the hamburger menu function call
});

