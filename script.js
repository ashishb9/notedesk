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
    const notesGrid = document.getElementById('notesGrid');
    if (!notesGrid) return;

    const modal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const searchInput = document.getElementById('notes-search');
    const categoryButtons = document.querySelectorAll('.category-filters button');
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    
    // Enhanced note database with 20 real-world tech issues
    const notesDatabase = {
      1: { id: 1, title: "📋 Fix Clipboard Sync in Windows", content: `<p><strong>Steps to resolve clipboard sync issues:</strong></p><ol><li>Open Settings > System > Clipboard</li><li>Toggle "Clipboard history" off and on</li><li>Run: <code>net stop cbdhsvc & net start cbdhsvc</code></li><li>Reboot your machine</li></ol>`, category: "windows", date: "July 2025", bookmarked: false },
      2: { id: 2, title: "🌐 Nginx Reverse Proxy Setup", content: `<p><strong>Basic Nginx configuration:</strong></p><pre><code>server {<br>  listen 80;<br>  server_name yourdomain.com;<br>  <br>  location / {<br>    proxy_pass http://localhost:3000;<br>    proxy_set_header Host $host;<br>  }<br>}</code></pre>`, category: "linux web", date: "June 2025", bookmarked: false },
      3: { id: 3, title: "🔑 SSH Key Setup & Troubleshooting", content: `<p><strong>Create and use SSH keys:</strong></p><ol><li>Generate keys: <code>ssh-keygen -t rsa -b 4096</code></li><li>Copy public key: <code>ssh-copy-id user@host</code></li><li>Fix permissions: <code>chmod 700 ~/.ssh</code></li><li>Add to agent: <code>ssh-add ~/.ssh/id_rsa</code></li></ol>`, category: "linux", date: "May 2025", bookmarked: false },
      4: { id: 4, title: "🐍 Python Virtual Environments", content: `<p><strong>Create isolated Python environments:</strong></p><ol><li>Install venv: <code>python -m venv myenv</code></li><li>Activate: <code>source myenv/bin/activate</code></li><li>Install packages: <code>pip install package</code></li><li>Deactivate: <code>deactivate</code></li></ol>`, category: "web", date: "April 2025", bookmarked: false },
      5: { id: 5, title: "🛡️ Firewall Rules for Web Servers", content: `<p><strong>Essential firewall rules:</strong></p><pre><code># Allow HTTP/HTTPS<br>sudo ufw allow 80/tcp<br>sudo ufw allow 443/tcp<br><br># Allow SSH<br>sudo ufw allow 22/tcp<br><br># Enable firewall<br>sudo ufw enable</code></pre>`, category: "linux web", date: "April 2025", bookmarked: false },
      6: { id: 6, title: "📱 Android ADB Debugging", content: `<p><strong>ADB commands for developers:</strong></p><ol><li>Enable USB debugging in Developer options</li><li>Connect device: <code>adb devices</code></li><li>Install APK: <code>adb install app.apk</code></li><li>Logcat: <code>adb logcat</code></li></ol>`, category: "mobile", date: "March 2025", bookmarked: false },
      7: { id: 7, title: "💾 Disk Cleanup Automation", content: `<p><strong>Windows cleanup script:</strong></p><pre><code># Remove temp files<br>Remove-Item -Path "$env:TEMP\*" -Recurse -Force<br><br># Clear browser caches<br>Remove-Item -Path "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache\*" -Recurse -Force</code></pre>`, category: "windows", date: "March 2025", bookmarked: false },
      8: { id: 8, title: "🚀 Speed Up Windows 11", content: `<p><strong>Performance tweaks:</strong></p><ol><li>Disable startup apps in Task Manager</li><li>Adjust for best performance: System > Advanced > Performance Settings</li><li>Disable transparency effects</li><li>Run disk cleanup regularly</li></ol>`, category: "windows", date: "February 2025", bookmarked: false },
      9: { id: 9, title: "🧠 Memory Leak Detection", content: `<p><strong>Find memory leaks in Node.js:</strong></p><pre><code>// Use heapdump<br>npm install heapdump<br><br>// In code:<br>const heapdump = require('heapdump');<br><br>// Trigger on demand<br>heapdump.writeSnapshot();</code></pre>`, category: "web", date: "January 2025", bookmarked: false },
      10: { id: 10, title: "🔍 Fix DNS Resolution Issues", content: `<p><strong>Troubleshooting steps:</strong></p><ol><li>Flush DNS: <code>ipconfig /flushdns</code></li><li>Renew IP: <code>ipconfig /renew</code></li><li>Check hosts file: <code>C:\Windows\System32\drivers\etc\hosts</code></li><li>Change DNS to 8.8.8.8 and 8.8.4.4</li></ol>`, category: "windows", date: "January 2025", bookmarked: false },
      11: { id: 11, title: "📦 Docker Cleanup Commands", content: `<p><strong>Manage Docker resources:</strong></p><pre><code># Remove stopped containers<br>docker container prune<br><br># Remove unused images<br>docker image prune -a<br><br># Remove unused volumes<br>docker volume prune</code></pre>`, category: "linux web", date: "December 2024", bookmarked: false },
      12: { id: 12, title: "🔐 Passwordless SSH Login", content: `<p><strong>Setup passwordless authentication:</strong></p><ol><li>Generate key pair: <code>ssh-keygen</code></li><li>Copy public key: <code>ssh-copy-id user@host</code></li><li>Disable password auth in <code>/etc/ssh/sshd_config</code></li><li>Restart SSH: <code>sudo systemctl restart sshd</code></li></ol>`, category: "linux", date: "November 2024", bookmarked: false },
      13: { id: 13, title: "📶 WiFi Signal Boosting", content: `<p><strong>Improve wireless connectivity:</strong></p><ol><li>Change router channel to less crowded one</li><li>Position router centrally and elevate</li><li>Update router firmware</li><li>Use WiFi analyzer app to find optimal channel</li></ol>`, category: "productivity", date: "October 2024", bookmarked: false },
      14: { id: 14, title: "📊 Excel Power Query Tips", content: `<p><strong>Advanced data processing:</strong></p><ol><li>Unpivot columns for better analysis</li><li>Merge queries with fuzzy matching</li><li>Create custom columns with M formula</li><li>Parameterize data sources for refreshability</li></ol>`, category: "productivity", date: "September 2024", bookmarked: false },
      15: { id: 15, title: "🌐 VPN Troubleshooting", content: `<p><strong>Fix common VPN issues:</strong></p><ol><li>Change VPN protocol (IKEv2 to OpenVPN)</li><li>Disable IPv6 in network adapter</li><li>Add VPN exception to firewall</li><li>Clear DNS cache after connecting</li></ol>`, category: "windows", date: "August 2024", bookmarked: false },
      16: { id: 16, title: "💻 MacBook Battery Optimization", content: `<p><strong>Extend battery life:</strong></p><ol><li>Enable Battery Health Management</li><li>Reduce keyboard brightness</li><li>Use Safari instead of Chrome</li><li>Check battery usage in Activity Monitor</li></ol>`, category: "mobile", date: "July 2024", bookmarked: false },
      17: { id: 17, title: "📡 Raspberry Pi Headless Setup", content: `<p><strong>Configure without monitor:</strong></p><ol><li>Add empty 'ssh' file to boot partition</li><li>Create wpa_supplicant.conf for WiFi</li><li>Find IP using router admin or nmap</li><li>Connect via SSH: <code>ssh pi@raspberrypi.local</code></li></ol>`, category: "linux", date: "June 2024", bookmarked: false },
      18: { id: 18, title: "🔧 Fix Slow Boot Times", content: `<p><strong>Speed up system startup:</strong></p><ol><li>Run <code>msconfig</code> to manage startup items</li><li>Check BIOS for fast boot option</li><li>Disable unnecessary services</li><li>Convert to GPT partition with UEFI</li></ol>`, category: "windows", date: "May 2024", bookmarked: false },
      19: { id: 19, title: "📂 NTFS Permission Repair", content: `<p><strong>Reset broken permissions:</strong></p><pre><code># Take ownership<br>takeown /f "C:\path" /r /d y<br><br># Reset permissions<br>icacls "C:\path" /reset /t /c</code></pre>`, category: "windows", date: "April 2024", bookmarked: false },
      20: { id: 20, title: "🤖 Automate with Python", content: `<p><strong>Simple automation script:</strong></p><pre><code>import pyautogui<br>import time<br><br>time.sleep(5) # 5 sec to position cursor<br>pyautogui.click() # Click current position<br>pyautogui.typewrite('Hello, world!')</code></pre>`, category: "productivity", date: "March 2024", bookmarked: false }
    };

    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    savedBookmarks.forEach(id => {
      if (notesDatabase[id]) {
        notesDatabase[id].bookmarked = true;
      }
    });

    // Render notes to grid
    const renderNotes = (notes) => {
      notesGrid.innerHTML = '';
      Object.values(notes).forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.dataset.index = note.id;
        noteCard.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content.substring(0, 100)}...</p>
          <span class="note-date">Last updated: ${note.date}</span>
          <i class="bookmark-icon ${note.bookmarked ? 'fas fa-bookmark active' : 'far fa-bookmark'}" 
             data-id="${note.id}"></i>
        `;
        notesGrid.appendChild(noteCard);
      });
    };

    // Initial render
    renderNotes(notesDatabase);

    // Bookmark functionality
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('bookmark-icon')) {
        const id = e.target.dataset.id;
        const note = notesDatabase[id];
        note.bookmarked = !note.bookmarked;
        
        e.target.classList.toggle('far');
        e.target.classList.toggle('fas');
        e.target.classList.toggle('active');
        
        // Update localStorage
        const bookmarks = Object.values(notesDatabase)
          .filter(n => n.bookmarked)
          .map(n => n.id);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    });

    // Note card click handler
    notesGrid.addEventListener('click', (e) => {
      const noteCard = e.target.closest('.note-card');
      if (!noteCard) return;
      
      const noteId = noteCard.dataset.index;
      const note = notesDatabase[noteId];
      
      modalTitle.textContent = note.title;
      modalContent.innerHTML = note.content;
      bookmarkBtn.dataset.id = noteId;
      bookmarkBtn.innerHTML = `<i class="${note.bookmarked ? 'fas' : 'far'} fa-bookmark"></i> ${note.bookmarked ? 'Remove Bookmark' : 'Bookmark Note'}`;
      modal.style.display = 'flex';
document.body.classList.add('modal-open');
    });

    // Bookmark button in modal
    bookmarkBtn.addEventListener('click', () => {
      const id = bookmarkBtn.dataset.id;
      const note = notesDatabase[id];
      note.bookmarked = !note.bookmarked;
      
      bookmarkBtn.innerHTML = `<i class="${note.bookmarked ? 'fas' : 'far'} fa-bookmark"></i> ${note.bookmarked ? 'Remove Bookmark' : 'Bookmark Note'}`;
      
      // Update UI
      const bookmarkIcon = document.querySelector(`.bookmark-icon[data-id="${id}"]`);
      if (bookmarkIcon) {
        bookmarkIcon.classList.toggle('far');
        bookmarkIcon.classList.toggle('fas');
        bookmarkIcon.classList.toggle('active');
      }
      
      // Update localStorage
      const bookmarks = Object.values(notesDatabase)
        .filter(n => n.bookmarked)
        .map(n => n.id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });

    // Modal close button
   document.querySelector('.close-modal')?.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}
    // Fuzzy search function
    const fuzzySearch = (term) => {
      term = term.toLowerCase();
      return Object.values(notesDatabase).filter(note => {
        const titleMatch = note.title.toLowerCase().includes(term);
        const contentMatch = note.content.toLowerCase().includes(term);
        return titleMatch || contentMatch;
      });
    };

    // Search functionality
    searchInput?.addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      const results = searchTerm ? fuzzySearch(searchTerm) : Object.values(notesDatabase);
      const resultObj = {};
      results.forEach(note => resultObj[note.id] = note);
      renderNotes(resultObj);
    });

    // Category filtering
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        const filteredNotes = Object.values(notesDatabase).filter(note => {
          return category === 'all' || note.category.includes(category);
        });
        
        const filteredObj = {};
        filteredNotes.forEach(note => filteredObj[note.id] = note);
        renderNotes(filteredObj);
      });
    });
  };

  // ===== 7. PARALLAX EFFECT =====
  const initParallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const parallaxSpeed = 0.3;
      
      if (hero) {
        hero.style.backgroundPositionY = `-${scrollPosition * parallaxSpeed}px`;
      }
    });
  };

  // Initialize all functions
  pageLoader();
  scrollAnimations();
  initTicker();
  aboutHeroShrink();
  handleContactForm();
  initNotesPage();
  initParallax();
});
// === Scroll Progress Bar ===
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = `${scrollPercent}%`;
});

// === Back to Top Button ===
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

