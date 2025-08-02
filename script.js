document.addEventListener("DOMContentLoaded", () => {
  // --- Data for all notes stored in JavaScript ---
  const notesData = [
    {
      id: 1,
      category: "windows",
      title: "Task Manager Not Opening",
      problem: "Clicking Task Manager shows nothing or crashes.",
      fixes: [
        {
          title: "Method 1: Keyboard Shortcut",
          steps: [
            "Press and hold the <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd> keys simultaneously.",
            "This key combination bypasses the Start Menu and should force Task Manager to open directly, even if it's not working normally."
          ]
        },
        {
          title: "Method 2: System File Checker (SFC)",
          steps: [
            "Open Command Prompt as an administrator by searching for 'CMD', right-clicking, and selecting 'Run as administrator'.",
            "Type <code>sfc /scannow</code> and press Enter.",
            "This command will scan all protected system files and replace corrupted files with a cached copy. It can often fix issues with built-in Windows applications like Task Manager."
          ]
        }
      ]
    },
    {
      id: 2,
      category: "windows",
      title: "WiFi Connected but No Internet",
      problem: "WiFi shows connected but websites don't load.",
      fixes: [
        {
          title: "Method 1: Reset Winsock Catalog",
          steps: [
            "Open Command Prompt as an administrator.",
            "Type <code>netsh winsock reset</code> and press Enter.",
            "Restart your computer. This command resets the Windows network stack and can fix many connectivity problems."
          ]
        },
        {
          title: "Method 2: Change DNS Server",
          steps: [
            "Open Network and Sharing Center and navigate to your adapter settings.",
            "Right-click your WiFi adapter, go to 'Properties', then 'Internet Protocol Version 4 (TCP/IPv4)'.",
            "Select 'Use the following DNS server addresses' and enter Google's public DNS: <code>8.8.8.8</code> and <code>8.8.4.4</code>. Click OK."
          ]
        }
      ]
    },
    {
      id: 3,
      category: "linux",
      title: "Permission Denied Error",
      problem: "Cannot write or execute files even as root.",
      fixes: [
        {
          title: "Method 1: Check File Ownership",
          steps: [
            "Use the command <code>ls -l filename</code> to view the file's owner and group.",
            "If the owner or group is not correct, use <code>sudo chown newuser:newgroup filename</code> to change them."
          ]
        },
        {
          title: "Method 2: Grant Execute Permissions",
          steps: [
            "If you need to execute the file, use the command <code>sudo chmod +x filename</code>.",
            "To set specific permissions (read, write, execute), use a numerical code (e.g., <code>chmod 755 filename</code> for read/write/execute for owner, read/execute for group/others)."
          ]
        }
      ]
    },
    {
      id: 4,
      category: "web",
      title: "CORS Policy Blocked",
      problem: "API calls fail with 'Access-Control-Allow-Origin' error.",
      fixes: [
        {
          title: "Method 1: Configure Backend Server",
          steps: [
            "On your backend server (e.g., Node.js, Python Flask), you need to set the appropriate CORS headers in the response.",
            "For a development environment, you can set the header to allow all origins: <code>'Access-Control-Allow-Origin': '*'</code>.",
            "For a production environment, specify the exact domain(s) that should be allowed."
          ]
        },
        {
          title: "Method 2: Use a Browser Extension (Development Only)",
          steps: [
            "Install a CORS browser extension (e.g., 'CORS Everywhere' for Firefox or 'Moesif CORS' for Chrome).",
            "Enable the extension to bypass CORS policies locally during development and testing.",
            "Remember to disable it for normal Browse and never rely on this for a production application."
          ]
        }
      ]
    },
    {
      id: 5,
      category: "productivity",
      title: "Slow Startup Time",
      problem: "Computer takes too long to boot up.",
      fixes: [
        {
          title: "Method 1: Disable Startup Programs",
          steps: [
            "Open Task Manager (Ctrl+Shift+Esc) and go to the 'Startup' tab.",
            "Sort by 'Startup impact' and disable any non-essential programs that are high impact. Right-click and select 'Disable'."
          ]
        },
        {
          title: "Method 2: Perform Disk Cleanup",
          steps: [
            "Open the 'Disk Cleanup' tool by searching for it in the Start Menu.",
            "Select the drive you want to clean (usually C:), then click 'Clean up system files'.",
            "This will remove temporary files, old updates, and other clutter that can slow down your system."
          ]
        }
      ]
    },
    {
      id: 6,
      category: "windows",
      title: "Blue Screen of Death (BSOD)",
      problem: "System crashes unexpectedly with a blue screen.",
      fixes: [
        {
          title: "Method 1: Check for Recent Changes",
          steps: [
            "Think about any hardware you've recently installed or any software/driver updates.",
            "If possible, revert the recent changes. For example, uninstall a recently installed driver or remove a new piece of hardware."
          ]
        },
        {
          title: "Method 2: Run Windows Memory Diagnostic",
          steps: [
            "Search for 'Windows Memory Diagnostic' in the Start Menu and run the application.",
            "Choose to restart your computer and let the tool run a scan for issues with your RAM (Random Access Memory).",
            "Faulty RAM is a common cause of unexpected BSOD errors."
          ]
        }
      ]
    },
    {
      id: 7,
      category: "linux",
      title: "Apt-Get Not Working",
      problem: "Cannot install or update packages using apt-get.",
      fixes: [
        {
          title: "Method 1: Check Network Connectivity",
          steps: [
            "Ensure your computer is connected to the internet. You can use <code>ping 8.8.8.8</code> to test for connectivity.",
            "If there is no connection, check your network configuration or router."
          ]
        },
        {
          title: "Method 2: Update Package List",
          steps: [
            "The list of available packages might be out of date. Run the command <code>sudo apt-get update</code> to refresh it.",
            "This command fetches the latest information about packages from your configured repositories."
          ]
        }
      ]
    },
    {
      id: 8,
      category: "web",
      title: "Layout Breaks in Mobile",
      problem: "Website looks fine on desktop but is broken on mobile.",
      fixes: [
        {
          title: "Method 1: Check Media Queries",
          steps: [
            "Ensure you have a viewport meta tag in your HTML: <code>&lt;meta name='viewport' content='width=device-width, initial-scale=1.0'&gt;</code>.",
            "In your CSS, check for proper media query breakpoints, such as <code>@media (max-width: 768px)</code>, to apply mobile-specific styles."
          ]
        },
        {
          title: "Method 2: Use Modern Layouts",
          steps: [
            "Prefer using CSS Flexbox or CSS Grid for layout, as they are designed for responsive and flexible design.",
            "Avoid using older techniques like floats and fixed widths, which are not mobile-friendly."
          ]
        }
      ]
    },
    {
      id: 9,
      category: "productivity",
      title: "Keyboard Shortcuts Not Working",
      problem: "Common keyboard shortcuts like Ctrl+C fail.",
      fixes: [
        {
          title: "Method 1: Restart Applications",
          steps: [
            "Sometimes, a bug in an application can cause keyboard shortcuts to stop working.",
            "Try closing and reopening the application. If that doesn't work, a full computer restart can often resolve the issue."
          ]
        },
        {
          title: "Method 2: Check for Conflicting Software",
          steps: [
            "Certain applications can hijack or override common keyboard shortcuts. This is often the case with clipboard managers or screen capture tools.",
            "Temporarily close any third-party software that might be running in the background and test if the shortcuts work."
          ]
        }
      ]
    },
    {
      id: 10,
      category: "windows",
      title: "Printer Not Responding",
      problem: "Printer is online but will not print documents.",
      fixes: [
        {
          title: "Method 1: Restart All Devices",
          steps: [
            "Perform a 'power cycle' by turning off your computer, printer, and router. Wait 30 seconds, then turn them back on in the reverse order (router, printer, then computer)."
          ]
        },
        {
          title: "Method 2: Update Drivers and OS",
          steps: [
            "Outdated printer drivers or a pending Windows update can cause printing issues.",
            "Check the printer manufacturer's website for the latest drivers or go to Windows Update to ensure your system is up to date."
          ]
        }
      ]
    }
  ];
  // --- End of Data ---

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
    const modalFixesContainer = document.querySelector('.modal-fixes');

    // Dynamically generate note cards from data
    const generateNoteCards = (data) => {
      notesGrid.innerHTML = ''; // Clear existing cards
      data.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.dataset.id = note.id; // Store ID for lookup
        card.dataset.category = note.category;
        card.dataset.title = note.title;
        card.innerHTML = `
          <h3><i class="fa-solid fa-gear"></i> ${note.title}</h3>
          <p class="card-problem"><strong>Problem:</strong> ${note.problem}</p>
        `;
        notesGrid.appendChild(card);
      });
    };

    // Initial card generation
    generateNoteCards(notesData);

    // Function to close modal
    const closeModal = () => {
      modalOverlay.classList.remove('active');
    };

    // Open modal when a note card is clicked
    notesGrid.addEventListener('click', e => {
      const noteCard = e.target.closest('.note-card');
      if (!noteCard) return;

      const noteId = parseInt(noteCard.dataset.id);
      const note = notesData.find(n => n.id === noteId);

      if (!note) return;

      modalTitle.textContent = note.title;
      modalProblem.textContent = note.problem;

      // Clear previous fixes and add the new, detailed steps
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

    // Search Filter
    searchInput?.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      const filteredNotes = notesData.filter(note => 
        note.title.toLowerCase().includes(term) ||
        note.problem.toLowerCase().includes(term) ||
        note.fixes.some(fix => fix.title.toLowerCase().includes(term) || fix.steps.some(step => step.toLowerCase().includes(term)))
      );
      generateNoteCards(filteredNotes);
    });

    // Category Filter
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        const filteredNotes = category === 'all' ? notesData : notesData.filter(note => note.category === category);
        generateNoteCards(filteredNotes);
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
  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = `${scrollPercent}%`;
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTopBtn?.classList.add('show');
  else backToTopBtn?.classList.remove('show');
});
backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
