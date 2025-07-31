// ===== STICKY NAV & MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ===== ACTIVE PAGE HIGHLIGHT =====
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌞';
document.body.appendChild(darkModeToggle);
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  darkModeToggle.innerHTML = document.body.classList.contains('light-mode') ? '🌙' : '🌞';
});

// ===== MODAL CONTROLS =====
const modal = document.getElementById('noteModal');
if (modal) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

// ===== MAIN FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  // Page Loader
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

  // Scroll Animations
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

  // About Page Hero Shrink
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

  // Contact Form
  const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', async (e) => {
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
      } catch (error) {
        alert('Error sending message. Please email me directly at b9.ashish@gmail.com');
      }
    });
  };

  // Notes Page with 20+ Tech Notes
  const initNotesPage = () => {
    if (!document.querySelector('.notes-grid')) return;

    const noteCards = document.querySelectorAll('.note-card');
    const modal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const searchInput = document.getElementById('notes-search');
    const categoryButtons = document.querySelectorAll('.category-filters button');
    
    // 20+ Tech Notes Database
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
      },
      3: {
        title: "🔒 Windows Defender Exclusions",
        content: `<p><strong>Add folder to Defender exclusions:</strong></p>
                  <ol>
                    <li>Open Windows Security</li>
                    <li>Virus & threat protection > Manage settings</li>
                    <li>Add/remove exclusions under "Exclusions"</li>
                  </ol>`,
        category: "windows security"
      },
      4: {
        title: "🐧 Linux File Permissions",
        content: `<p><strong>Common permission commands:</strong></p>
                  <pre><code>chmod 755 filename  # Owner: rwx, Group/Others: rx
chmod +x script.sh  # Make executable
chown user:group file  # Change ownership</code></pre>`,
        category: "linux"
      },
      5: {
        title: "💾 Git Reset vs Revert",
        content: `<p><strong>When to use each:</strong></p>
                  <ul>
                    <li><code>git reset --hard HEAD~1</code> (DANGEROUS - removes commit)</li>
                    <li><code>git revert HEAD</code> (Safe - creates new undo commit)</li>
                  </ul>`,
        category: "git"
      },
      6: {
        title: "🚀 Boost VS Code Performance",
        content: `<p><strong>Tweaks for better performance:</strong></p>
                  <ol>
                    <li>Disable unused extensions</li>
                    <li>Set <code>"files.exclude"</code> for node_modules</li>
                    <li>Enable <code>"editor.largeFileOptimizations"</code></li>
                  </ol>`,
        category: "vscode"
      },
      7: {
        title: "📡 WiFi Signal Boost (Linux)",
        content: `<p><strong>iwconfig commands:</strong></p>
                  <pre><code>sudo iwconfig wlan0 txpower 30  # Max power
sudo iw reg set BO  # Bolivia has highest power limits</code></pre>`,
        category: "linux networking"
      },
      8: {
        title: "🛡️ Block IP with iptables",
        content: `<p><strong>Block malicious IP:</strong></p>
                  <pre><code>sudo iptables -A INPUT -s 192.168.1.100 -j DROP
sudo iptables-save > /etc/iptables/rules.v4</code></pre>`,
        category: "linux security"
      },
      9: {
        title: "🧹 Clean Disk Space (Windows)",
        content: `<p><strong>Quick cleanup commands:</strong></p>
                  <pre><code>cleanmgr /sageset:1  # Disk Cleanup settings
cleanmgr /sagerun:1  # Run cleanup
dism /online /cleanup-image /restorehealth  # Repair OS</code></pre>`,
        category: "windows"
      },
      10: {
        title: "🔐 Password Generator",
        content: `<p><strong>Linux/Mac one-liner:</strong></p>
                  <pre><code>openssl rand -base64 12 | cut -c1-16</code></pre>
                  <p>Generates 16-character random password</p>`,
        category: "security"
      },
      11: {
        title: "📦 Install .deb Files",
        content: `<p><strong>When dpkg fails:</strong></p>
                  <pre><code>sudo apt install -f  # Fix dependencies
sudo dpkg -i package.deb</code></pre>`,
        category: "linux"
      },
      12: {
        title: "🌐 SSH Port Forwarding",
        content: `<p><strong>Access remote DB locally:</strong></p>
                  <pre><code>ssh -L 5432:localhost:5432 user@server</code></pre>
                  <p>Now connect to Postgres at localhost:5432</p>`,
        category: "linux networking"
      },
      13: {
        title: "💻 Mac Screen Resolution",
        content: `<p><strong>Add custom resolutions:</strong></p>
                  <pre><code>sudo nano /Library/Preferences/com.apple.windowserver.plist</code></pre>
                  <p>Add your desired resolution under "DisplayAnyUserSets"</p>`,
        category: "mac"
      },
      14: {
        title: "🔥 Kill Stuck Processes",
        content: `<p><strong>Find and kill:</strong></p>
                  <pre><code>ps aux | grep -i "process_name"
kill -9 PID</code></pre>
                  <p>Use <code>pkill -f "name"</code> for pattern matching</p>`,
        category: "linux windows mac"
      },
      15: {
        title: "📅 Cron Job Setup",
        content: `<p><strong>Basic format:</strong></p>
                  <pre><code>* * * * * command-to-execute
┬ ┬ ┬ ┬ ┬
│ │ │ │ └─ Day of week (0-6) (0=Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)</code></pre>`,
        category: "linux"
      },
      16: {
        title: "🔄 Rsync Backup",
        content: `<p><strong>Mirror folders:</strong></p>
                  <pre><code>rsync -avz --delete /source/ user@host:/destination/</code></pre>
                  <p><code>-a</code> archive, <code>-v</code> verbose, <code>-z</code> compress</p>`,
        category: "linux"
      },
      17: {
        title: "📊 Check Disk Usage",
        content: `<p><strong>Find large files:</strong></p>
                  <pre><code>sudo du -sh /* | sort -rh  # Linux/Mac
windirstat  # Windows GUI tool</code></pre>`,
        category: "linux windows"
      },
      18: {
        title: "🔍 Grep Advanced Search",
        content: `<p><strong>Powerful search examples:</strong></p>
                  <pre><code>grep -r "pattern" /path  # Recursive
grep -i "pattern" file  # Case insensitive
grep -A 3 -B 2 "pattern" file  # Show context</code></pre>`,
        category: "linux"
      },
      19: {
        title: "📝 Vim Cheat Sheet",
        content: `<p><strong>Essential commands:</strong></p>
                  <pre><code>i - Insert mode
ESC - Normal mode
:wq - Save and quit
dd - Delete line
/search - Find text</code></pre>`,
        category: "linux"
      },
      20: {
        title: "🛠️ System Info Commands",
        content: `<p><strong>Quick diagnostics:</strong></p>
                  <pre><code>uname -a  # Kernel info
df -h  # Disk space
free -h  # RAM usage
lscpu  # CPU info</code></pre>`,
        category: "linux"
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

    // Modal close button
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      modal.style.display = 'none';
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
