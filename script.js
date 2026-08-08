document.addEventListener("DOMContentLoaded", () => {
    // ===================================
    // 1. THEME SWITCHING
    // ===================================
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = document.getElementById('theme-icon');
    
    const updateThemeIcon = (theme) => {
        if(themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    if (themeSwitch) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeSwitch.checked = true;
            updateThemeIcon('light');
        } else {
            updateThemeIcon('dark');
        }
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateThemeIcon('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcon('dark');
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

    // About Page Hero Shrink Effect
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
    // Contact Form Handling (Web3Forms)
    // ===================================
    const handleContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const formSuccess = document.getElementById('formSuccess');
        const formError = document.getElementById('formError');
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending...';
            if (formError) formError.style.display = 'none';

            const formData = new FormData(contactForm);
            const accessKey = formData.get('access_key');

            if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
                console.error('NoteDesk contact form: please set your Web3Forms access_key in contact.html (get one free at https://web3forms.com)');
                if (formError) {
                    formError.style.display = 'flex';
                    formError.querySelector('span').textContent =
                        'Form isn\u2019t fully set up yet. Please email me directly at b9.ashish@gmail.com.';
                }
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
                return;
            }

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                const result = await response.json();

                if (response.status === 200 && result.success) {
                    contactForm.style.display = 'none';
                    if (formSuccess) formSuccess.style.display = 'block';
                    contactForm.reset();

                    setTimeout(() => {
                        contactForm.style.display = 'flex';
                        if (formSuccess) formSuccess.style.display = 'none';
                        if (submitBtn) submitBtn.disabled = false;
                        if (btnText) btnText.textContent = 'Send Message';
                    }, 6000);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                console.error('Contact form submission error:', error);
                if (formError) formError.style.display = 'flex';
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
            }
        });
    };

    // ===================================
    // FEATURED NOTES LOGIC
    // ===================================
    const initFeaturedNotes = () => {
        const featuredContainer = document.getElementById('featuredNotesContainer');
        if (!featuredContainer) return;

        fetch('notes.json')
            .then(res => res.json())
            .then(data => {
                if (!data || data.length === 0) return;
                
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 3);
                
                featuredContainer.innerHTML = '';
                selected.forEach(note => {
                    const card = document.createElement('div');
                    card.className = 'note';
                    
                    const badge = document.createElement('span');
                    badge.className = `note-badge badge-${note.category}`;
                    badge.textContent = note.category.toUpperCase();
                    badge.style.display = 'inline-block';
                    badge.style.marginBottom = '12px';
                    
                    const title = document.createElement('h3');
                    title.textContent = note.title;
                    title.style.marginTop = '0';
                    title.style.fontSize = '1.15em';
                    
                    const prob = document.createElement('p');
                    prob.textContent = note.problem;
                    prob.style.fontSize = '0.95em';
                    prob.style.color = 'var(--text-secondary)';
                    prob.style.margin = '0';
                    prob.style.lineHeight = '1.5';
                    
                    card.appendChild(badge);
                    card.appendChild(title);
                    card.appendChild(prob);
                    
                    card.addEventListener('click', () => {
                        window.location.href = `notes.html#note-${note.id}`;
                    });
                    
                    featuredContainer.appendChild(card);
                });
            })
            .catch(err => {
                console.error('Error fetching featured notes:', err);
                featuredContainer.innerHTML = '<p>Unable to load featured notes at this time.</p>';
            });
    };

    // ===================================
    // 3. NOTES PAGE LOGIC & MODAL FIXES
    // ===================================
    const initNotesPage = () => {
        const notesGrid = document.getElementById('notesGrid');
        if (!notesGrid) return;

        let currentCategory = 'all';
        let currentSearchTerm = '';
        let allNotesData = [];

        fetch('notes.json')
            .then(response => response.json())
            .then(notesData => {
                allNotesData = notesData;
                
                const modalOverlay = document.getElementById('noteModalOverlay');
                const modalTitle = document.getElementById('modalTitle');
                const modalProblem = document.getElementById('modalProblem');
                const modalCategoryBadge = document.getElementById('modalCategoryBadge');
                const closeModalBtn = document.getElementById('closeModalBtn');
                const searchInput = document.getElementById('notes-search');
                const categoryButtons = document.querySelectorAll('.category-filters button');
                const modalFixesContainer = document.getElementById('modalFixesContainer');

                const generateNoteCards = (data) => {
                    notesGrid.innerHTML = '';
                    if (!data || data.length === 0) {
                        notesGrid.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No matching notes found. Try searching for another topic!</p>';
                        return;
                    }
                    data.forEach(note => {
                        const card = document.createElement('div');
                        card.className = 'note-card';
                        card.dataset.id = note.id;
                        card.dataset.category = note.category;

                        const categoryName = note.category.toUpperCase();

                        card.innerHTML = `
                            <div class="note-card-header">
                                <span class="note-badge badge-${note.category}">${categoryName}</span>
                            </div>
                            <h3 class="note-card-title">${note.title}</h3>
                            <p class="card-problem">${note.problem}</p>
                        `;
                        notesGrid.appendChild(card);
                    });
                };

                const updateNotesDisplay = () => {
                    const term = currentSearchTerm;
                    const filteredNotes = allNotesData.filter(note => {
                        const matchesCategory = currentCategory === 'all' || note.category === currentCategory;
                        const matchesSearch = !term || 
                            note.title.toLowerCase().includes(term) ||
                            note.problem.toLowerCase().includes(term) ||
                            note.category.toLowerCase().includes(term) ||
                            (note.fixes && note.fixes.some(fix => fix.title.toLowerCase().includes(term) || (fix.steps && fix.steps.some(step => step.toLowerCase().includes(term)))));
                        
                        return matchesCategory && matchesSearch;
                    });
                    generateNoteCards(filteredNotes);
                };

                const openModalForNote = (note) => {
                    if (!note) return;

                    if (modalTitle) modalTitle.textContent = note.title;
                    if (modalProblem) modalProblem.textContent = note.problem;

                    if (modalCategoryBadge) {
                        modalCategoryBadge.textContent = note.category.toUpperCase();
                        modalCategoryBadge.className = `note-badge badge-${note.category}`;
                    }

                    if (modalFixesContainer) {
                        modalFixesContainer.innerHTML = '';

                        if (note.fixes && Array.isArray(note.fixes)) {
                            note.fixes.forEach(fix => {
                                const fixBlock = document.createElement('div');
                                fixBlock.className = 'modal-fix-block';

                                const fixTitle = document.createElement('h4');
                                fixTitle.className = 'modal-fix-title';
                                fixTitle.innerHTML = fix.title;
                                fixBlock.appendChild(fixTitle);

                                if (fix.steps && Array.isArray(fix.steps)) {
                                    const stepsList = document.createElement('ol');
                                    stepsList.className = 'modal-steps-list';

                                    fix.steps.forEach(stepText => {
                                        const stepItem = document.createElement('li');
                                        stepItem.innerHTML = stepText;

                                        const codeTags = stepItem.querySelectorAll('code');
                                        codeTags.forEach(codeEl => {
                                            const codeWrapper = document.createElement('div');
                                            codeWrapper.className = 'code-snippet-box';

                                            const codeText = document.createElement('span');
                                            codeText.className = 'code-text-content';
                                            codeText.textContent = codeEl.textContent;

                                            const copyBtn = document.createElement('button');
                                            copyBtn.className = 'copy-code-btn';
                                            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                                            copyBtn.title = "Copy command";

                                            copyBtn.addEventListener('click', (e) => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(codeText.textContent.trim());
                                                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
                                                copyBtn.classList.add('copied');
                                                setTimeout(() => {
                                                    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                                                    copyBtn.classList.remove('copied');
                                                }, 2000);
                                            });

                                            codeWrapper.appendChild(codeText);
                                            codeWrapper.appendChild(copyBtn);
                                            codeEl.parentNode.replaceChild(codeWrapper, codeEl);
                                        });

                                        stepsList.appendChild(stepItem);
                                    });
                                    fixBlock.appendChild(stepsList);
                                }

                                modalFixesContainer.appendChild(fixBlock);
                            });
                        }
                    }

                    // --- Phase 3: Dynamic JSON-LD structured data injector ---
                    let ldScript = document.getElementById('dynamic-ld-json');
                    if (!ldScript) {
                        ldScript = document.createElement('script');
                        ldScript.id = 'dynamic-ld-json';
                        ldScript.type = 'application/ld+json';
                        document.head.appendChild(ldScript);
                    }
                    
                    let stepCount = 1;
                    let schemaSteps = [];
                    if (note.fixes && Array.isArray(note.fixes)) {
                        note.fixes.forEach(fix => {
                            if (fix.steps && Array.isArray(fix.steps)) {
                                fix.steps.forEach(stepText => {
                                    // Strip HTML like <code> or <kbd> out of the JSON schema text
                                    const cleanText = stepText.replace(/<[^>]*>?/gm, ''); 
                                    schemaSteps.push({
                                        "@type": "HowToStep",
                                        "position": stepCount++,
                                        "text": cleanText
                                    });
                                });
                            }
                        });
                    }

                    if (schemaSteps.length > 0) {
                        const howToSchema = {
                            "@context": "https://schema.org",
                            "@type": "HowTo",
                            "name": note.title,
                            "description": note.problem,
                            "step": schemaSteps
                        };
                        ldScript.textContent = JSON.stringify(howToSchema);
                    }

                    if (modalOverlay) {
                        modalOverlay.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        window.location.hash = `note-${note.id}`;
                    }
                };

                const closeModal = () => {
                    if (modalOverlay) {
                        modalOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        history.pushState("", document.title, window.location.pathname + window.location.search);
                        
                        // Phase 3: Clean up dynamic schema when modal closes
                        const ldScript = document.getElementById('dynamic-ld-json');
                        if (ldScript) {
                            ldScript.remove();
                        }
                    }
                };

                notesGrid.addEventListener('click', e => {
                    const noteCard = e.target.closest('.note-card');
                    if (!noteCard) return;

                    const noteId = parseInt(noteCard.dataset.id);
                    const note = notesData.find(n => n.id === noteId);
                    openModalForNote(note);
                });

                if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

                if (modalOverlay) {
                    modalOverlay.addEventListener('click', (e) => {
                        if (e.target === modalOverlay) closeModal();
                    });
                }

                document.addEventListener('keydown', e => {
                    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
                        closeModal();
                    }
                });

                if (searchInput) {
                    searchInput.addEventListener('input', e => {
                        currentSearchTerm = e.target.value.toLowerCase().trim();
                        updateNotesDisplay();
                    });
                }

                if (categoryButtons) {
                    categoryButtons.forEach(btn => {
                        btn.addEventListener('click', () => {
                            categoryButtons.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            currentCategory = btn.dataset.category;
                            updateNotesDisplay();
                        });
                    });
                }

                const urlParams = new URLSearchParams(window.location.search);
                const urlCategory = urlParams.get('category');

                if (urlCategory) {
                    currentCategory = urlCategory;
                    categoryButtons.forEach(b => b.classList.remove('active'));
                    const categoryButton = document.querySelector(`.category-filters button[data-category="${urlCategory}"]`);
                    if (categoryButton) categoryButton.classList.add('active');
                    else {
                        document.querySelector('.category-filters button[data-category="all"]').classList.add('active');
                        currentCategory = 'all';
                    }
                } else {
                    categoryButtons.forEach(b => b.classList.remove('active'));
                    const allButton = document.querySelector('.category-filters button[data-category="all"]');
                    if (allButton) allButton.classList.add('active');
                }

                updateNotesDisplay();

                const hash = window.location.hash;
                if (hash && hash.startsWith('#note-')) {
                    const targetId = parseInt(hash.replace('#note-', ''));
                    const matchedNote = notesData.find(n => n.id === targetId);
                    if (matchedNote) openModalForNote(matchedNote);
                }
            })
            .catch(error => {
                console.error('Failed to load notes.json:', error);
                notesGrid.innerHTML = '<p class="no-results" style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Couldn\u2019t load notes right now. Please refresh the page or check back shortly.</p>';
            });
    };
    
    // Hamburger Menu
    const initHamburger = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', !isExpanded);
            });

            // Close menu when a link is clicked
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    };

    // Auto-updating copyright year
    const initCopyrightYear = () => {
        document.querySelectorAll('.copyright-year').forEach(el => {
            el.textContent = new Date().getFullYear();
        });
    };

    // ===================================
    // 4. INITIALIZATION
    // ===================================
    pageLoader();
    scrollAnimations();
    aboutHeroShrink();
    handleContactForm();
    initFeaturedNotes();
    initNotesPage();
    initParallax();
    initScrollProgressBar();
    initBackToTopBtn();
    initHamburger();
    initCopyrightYear();
});
