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
    const ticker = document.querySelector(".news-ticker");
    if (!ticker) return;

    // Duplicates content for a seamless loop
    ticker.innerHTML += ticker.innerHTML;
  };

  // ===== 4. NAVIGATION - HAMBURGER & ACTIVE LINKS =====
  const initNavigation = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('active');
      });

      // Close menu on link click for mobile
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // ===== 5. DARK MODE TOGGLE =====
  const initDarkMode = () => {
    const toggle = document.getElementById('dark-mode-toggle');
    const storedTheme = localStorage.getItem('theme');

    // Set initial theme
    if (storedTheme) {
      document.body.setAttribute('data-theme', storedTheme);
      if (toggle) {
        toggle.innerHTML = storedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      }
    } else {
      // Default to dark mode
      document.body.setAttribute('data-theme', 'dark');
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          document.body.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          toggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
          document.body.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
      });
    }
  };

  // ===== 6. NOTES SECTION DYNAMICALLY LOADED CONTENT & FUNCTIONALITY =====
  const initNotes = () => {
    const notesDatabase = {
      1: {
        title: '🖥️ Customizing Windows Terminal',
        category: 'windows',
        summary: 'A quick guide to changing themes and settings in the new Windows Terminal.',
        content: `
          <div class="note-body">
            <p>Windows Terminal is a modern, fast, and powerful terminal application for command-line users. Customizing it can greatly improve your workflow and make it more pleasant to use. Here's a simple guide to get you started.</p>
            <h4>1. Open Settings</h4>
            <p>You can open the settings by clicking the small down-arrow icon in the title bar and selecting "Settings" or by using the keyboard shortcut <code>Ctrl + ,</code>.</p>
            <h4>2. Edit the settings.json file</h4>
            <p>Windows Terminal uses a JSON file for all its configurations. You can find this file within the settings UI. Here’s a basic example of how to change the color scheme and font:</p>
            <pre><code class="language-json">{
  "$schema": "https://aka.ms/terminal-profiles-schema",
  "defaultProfile": "{00000000-0000-0000-0000-000000000000}",
  "profiles": {
    "list": [
      {
        "guid": "{00000000-0000-0000-0000-000000000000}",
        "hidden": false,
        "name": "Windows PowerShell",
        "commandline": "powershell.exe",
        "fontFace": "Cascadia Code PL",
        "colorScheme": "Dracula"
      }
    ]
  },
  "schemes": [
    {
      "name": "Dracula",
      "background": "#282a36",
      "foreground": "#f8f8f2",
      "selectionBackground": "#44475a",
      "cursorColor": "#f8f8f2",
      "black": "#21222c",
      "red": "#ff5555",
      "green": "#50fa7b",
      "yellow": "#f1fa8c",
      "blue": "#bd93f9",
      "purple": "#ff79c6",
      "cyan": "#8be9fd",
      "white": "#f8f8f2",
      "brightBlack": "#6272a4",
      "brightRed": "#ff6e6e",
      "brightGreen": "#69ff94",
      "brightYellow": "#ffffa5",
      "brightBlue": "#d6acff",
      "brightPurple": "#ff92df",
      "brightCyan": "#a4ffff",
      "brightWhite": "#ffffff"
    }
  ]
}</code></pre>
            <p>In this example, we've set the font to <code>Cascadia Code PL</code> and added a new color scheme called <code>Dracula</code>. You can find many color schemes online to paste into this section.</p>
          </div>
        `
      },
      2: {
        title: '🌐 Nginx Reverse Proxy Setup',
        category: 'linux web',
        summary: 'Configure Nginx as a reverse proxy for Node.js apps.',
        content: `
          <div class="note-body">
            <p>Nginx is a powerful web server that can also be used as a reverse proxy. This is particularly useful for Node.js applications, as it allows Nginx to handle incoming traffic and forward it to your application, providing benefits like load balancing, SSL termination, and serving static content.</p>
            <h4>1. Install Nginx</h4>
            <pre><code class="language-bash">sudo apt update
sudo apt install nginx</code></pre>
            <h4>2. Configure a new site</h4>
            <p>Create a new Nginx configuration file in the <code>/etc/nginx/sites-available/</code> directory. For example, <code>/etc/nginx/sites-available/myapp</code>.</p>
            <pre><code class="language-nginx">server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}</code></pre>
            <p>This configuration listens on port 80 and forwards all requests to a Node.js app running on <code>localhost:3000</code>.</p>
            <h4>3. Enable the site and restart Nginx</h4>
            <pre><code class="language-bash">sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx</code></pre>
            <p>The <code>ln</code> command creates a symbolic link to enable the site. <code>nginx -t</code> checks the syntax of the config file, and then you restart the service.</p>
          </div>
        `
      },
      3: {
        title: '💾 Basic Git Commands',
        category: 'programming web',
        summary: 'A quick reference for essential Git commands for version control.',
        content: `
          <div class="note-body">
            <p>Git is an essential tool for any developer. This is a quick reference for the most commonly used commands.</p>
            <h4>Initialize and Stage</h4>
            <pre><code class="language-bash">git init          # Initializes a new Git repository
git add .         # Adds all changes to the staging area
git add file.js   # Adds a specific file to the staging area</code></pre>
            <h4>Commits</h4>
            <pre><code class="language-bash">git commit -m "Initial commit"    # Commits staged changes with a message
git commit -am "Updated files"    # Stages and commits in one go (for tracked files)</code></pre>
            <h4>Branches and Merging</h4>
            <pre><code class="language-bash">git branch new-feature      # Creates a new branch
git checkout new-feature    # Switches to the new branch
git merge new-feature       # Merges the new-feature branch into the current one</code></pre>
            <h4>Remote Repositories</h4>
            <pre><code class="language-bash">git remote add origin https://github.com/user/repo.git
git push origin master      # Pushes changes to the remote 'master' branch
git pull origin master      # Pulls changes from the remote 'master' branch</code></pre>
          </div>
        `
      },
      4: {
        title: '⚙️ Setting up a LAMP Stack on Ubuntu',
        category: 'linux web',
        summary: 'Step-by-step guide to install Apache, MySQL, and PHP on Ubuntu.',
        content: `
          <div class="note-body">
            <p>A LAMP stack (Linux, Apache, MySQL, PHP) is a popular open-source web development environment. This guide walks you through setting it up on a fresh Ubuntu server.</p>
            <h4>1. Install Apache</h4>
            <pre><code class="language-bash">sudo apt update
sudo apt install apache2</code></pre>
            <p>After installation, you can verify it by navigating to your server's IP address in a web browser. You should see the Apache default page.</p>
            <h4>2. Install MySQL</h4>
            <pre><code class="language-bash">sudo apt install mysql-server
sudo mysql_secure_installation</code></pre>
            <p>The secure installation script will guide you through setting a root password and other security best practices.</p>
            <h4>3. Install PHP</h4>
            <pre><code class="language-bash">sudo apt install php libapache2-mod-php php-mysql</code></pre>
            <p>This installs PHP, the Apache module for PHP, and the MySQL extension. Restart Apache to apply the changes:</p>
            <pre><code class="language-bash">sudo systemctl restart apache2</code></pre>
            <h4>4. Test PHP</h4>
            <p>Create a small PHP info file in the web root directory <code>/var/www/html/info.php</code> with the content <code>&lt;?php phpinfo(); ?></code>. Visit <code>http://your_server_ip/info.php</code> to confirm everything is working.</p>
          </div>
        `
      },
      5: {
        title: '🐧 Zsh Customization with Oh My Zsh',
        category: 'linux',
        summary: 'Level up your Linux command line experience with Zsh plugins and themes.',
        content: `
          <div class="note-body">
            <p>Zsh is a powerful shell, and Oh My Zsh is a community-driven framework for managing your Zsh configuration. It comes with thousands of themes and plugins to supercharge your terminal.</p>
            <h4>1. Install Zsh</h4>
            <pre><code class="language-bash">sudo apt install zsh
chsh -s $(which zsh)</code></pre>
            <p>The second command changes your default shell to Zsh. You'll need to log out and log back in for the changes to take effect.</p>
            <h4>2. Install Oh My Zsh</h4>
            <p>Run the following command in your terminal:</p>
            <pre><code class="language-bash">sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"</code></pre>
            <h4>3. Customize your .zshrc file</h4>
            <p>The main configuration file is <code>~/.zshrc</code>. You can open it with your favorite text editor. Here, you can change the theme and enable plugins.</p>
            <p>Change the theme by editing the <code>ZSH_THEME</code> variable:</p>
            <pre><code class="language-bash">ZSH_THEME="agnoster"</code></pre>
            <p>Enable plugins by adding them to the <code>plugins</code> array:</p>
            <pre><code class="language-bash">plugins=(git zsh-autosuggestions zsh-syntax-highlighting)</code></pre>
            <p>Don't forget to install the plugins first if they are not included with Oh My Zsh by default.</p>
          </div>
        `
      },
      6: {
        title: '🔒 Generating an SSH Key',
        category: 'linux programming',
        summary: 'How to generate and use an SSH key for secure connections to servers and Git repos.',
        content: `
          <div class="note-body">
            <p>An SSH key provides a secure way to authenticate without relying on passwords. This is especially useful for connecting to servers and Git hosting services like GitHub.</p>
            <h4>1. Generate the key pair</h4>
            <p>Use the <code>ssh-keygen</code> command. It's recommended to use a strong algorithm like Ed25519.</p>
            <pre><code class="language-bash">ssh-keygen -t ed25519 -C "your_email@example.com"</code></pre>
            <p>Press Enter to accept the default file location, and enter a strong passphrase when prompted.</p>
            <h4>2. Add the key to the SSH agent</h4>
            <p>The SSH agent manages your keys and passphrases. This prevents you from having to enter your passphrase every time you use the key.</p>
            <pre><code class="language-bash">eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519</code></pre>
            <h4>3. Copy your public key</h4>
            <p>Your public key is the one you share with services like GitHub. You can view it with <code>cat</code> and copy the output.</p>
            <pre><code class="language-bash">cat ~/.ssh/id_ed25519.pub</code></pre>
            <p>Copy the entire output and paste it into the SSH key settings on your service provider's website.</p>
          </div>
        `
      },
      7: {
        title: '📦 Using npm and npx',
        category: 'web programming',
        summary: 'An explanation of the difference between npm and npx and when to use each.',
        content: `
          <div class="note-body">
            <p>When working with Node.js, you'll frequently use both <code>npm</code> and <code>npx</code>. While they are often used together, they serve different purposes.</p>
            <h4>npm (Node Package Manager)</h4>
            <p><code>npm</code> is a package manager. Its primary purpose is to install, manage, and update packages (libraries) in your project's <code>node_modules</code> directory. It's used for long-term project dependencies.</p>
            <pre><code class="language-bash">npm install lodash        # Installs a package to your project
npm uninstall lodash      # Uninstalls a package
npm run start             # Runs a script defined in your package.json file</code></pre>
            <h4>npx (Node Package eXecute)</h4>
            <p><code>npx</code> is a package executor. Its purpose is to run a package without installing it globally or locally. This is perfect for one-off commands or tools you don't need in your project long-term.</p>
            <pre><code class="language-bash">npx create-react-app my-app   # Runs the create-react-app package without installing it
npx cowsay "Hello world"      # Runs a fun, one-time command
npx --version                 # Checks the version without a global install</code></pre>
            <p>Using <code>npx</code> helps keep your global environment clean and ensures you are always running the latest version of a tool.</p>
          </div>
        `
      },
      8: {
        title: '🚀 Deploying a Static Site with GitHub Pages',
        category: 'web',
        summary: 'Quickly host your static HTML, CSS, and JS website for free.',
        content: `
          <div class="note-body">
            <p>GitHub Pages is a free and simple way to host a static website directly from your GitHub repository. Here’s how to do it.</p>
            <h4>1. Create a Repository</h4>
            <p>Create a new repository on GitHub. If you already have your code, push it to this repository.</p>
            <h4>2. Configure GitHub Pages</h4>
            <p>Go to your repository on GitHub. Click on the "Settings" tab, then find "Pages" in the left sidebar.</p>
            <h4>3. Select a Branch</h4>
            <p>Under "Source," choose the branch you want to deploy from (usually <code>main</code> or <code>master</code>). If your site's root files are not in the main directory, you can also specify a folder like <code>/docs</code>.</p>
            <h4>4. Publish</h4>
            <p>Click "Save." GitHub will now build and deploy your site. You will see a green banner with the URL to your live site, which will look something like <code>https://your-username.github.io/your-repo-name/</code>.</p>
            <h4>5. Custom Domain (Optional)</h4>
            <p>You can also set up a custom domain. In the "Custom domain" section, enter your domain and follow the instructions to set up the DNS records with your domain provider.</p>
          </div>
        `
      },
      9: {
        title: '📄 Markdown Cheat Sheet',
        category: 'programming',
        summary: 'A handy reference for the most common Markdown syntax.',
        content: `
          <div class="note-body">
            <p>Markdown is a lightweight markup language with plain text formatting syntax. It's widely used for README files, documentation, and blog posts.</p>
            <h4>Headings</h4>
            <pre><code class="language-markdown"># H1 Heading
## H2 Heading
### H3 Heading</code></pre>
            <h4>Emphasis</h4>
            <pre><code class="language-markdown">*Italic* or _Italic_
**Bold** or __Bold__
***Bold and Italic***</code></pre>
            <h4>Lists</h4>
            <pre><code class="language-markdown">- Item 1
- Item 2
- Item 3

1. First item
2. Second item
3. Third item</code></pre>
            <h4>Links and Images</h4>
            <pre><code class="language-markdown">[Link text](https://www.example.com)
![Alt text](https://www.example.com/image.jpg)</code></pre>
            <h4>Code Blocks</h4>
            <p>Use three backticks (```) to create a code block. You can specify the language for syntax highlighting.</p>
            <pre><code class="language-markdown">\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`</code></pre>
          </div>
        `
      },
      10: {
        title: '🔥 Using CSS Flexbox',
        category: 'web',
        summary: 'An introduction to Flexbox for creating flexible and responsive layouts.',
        content: `
          <div class="note-body">
            <p>Flexbox (Flexible Box Layout) is a one-dimensional layout model in CSS for designing complex layouts more easily. It helps you distribute space and align items in a container.</p>
            <h4>The Parent (Flex Container)</h4>
            <p>To use Flexbox, you must first define a container with <code>display: flex</code>.</p>
            <pre><code class="language-css">.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: center; /* aligns items along the main axis */
  align-items: center; /* aligns items along the cross axis */
}</code></pre>
            <h4>The Children (Flex Items)</h4>
            <p>Inside the container, child elements become flex items. You can control their size and behavior with properties like <code>flex-grow</code>, <code>flex-shrink</code>, and <code>flex-basis</code>.</p>
            <pre><code class="language-css">.item {
  flex: 1; /* Shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  /* Or
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 200px; */
}</code></pre>
            <p>Flexbox is an incredibly powerful tool for modern web design. Experiment with the different properties to see how they affect your layout.</p>
          </div>
        `
      },
      11: {
        title: '🛠️ Windows Registry Hacks',
        category: 'windows',
        summary: 'Explore some useful and safe registry edits to customize Windows.',
        content: `
          <div class="note-body">
            <p>The Windows Registry is a database that stores settings and options for the operating system. Making changes can customize your experience, but always back up the registry first! (Open <code>regedit</code> -> File -> Export)</p>
            <h4>1. Add a "Take Ownership" context menu</h4>
            <p>This allows you to easily gain full control over files and folders. Create a new key in <code>HKEY_CLASSES_ROOT\\*\\shell\\</code> and follow a detailed guide to add the necessary commands. A quick search will provide the full script.</p>
            <h4>2. Disable Low Disk Space Warnings</h4>
            <p>If you have a hard drive that is intentionally nearly full, you can disable the warning. Navigate to <code>HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer</code> and add a new DWORD value called <code>NoLowDiskSpaceChecks</code> and set it to <code>1</code>.</p>
            <h4>3. Change the location of your user folders</h4>
            <p>You can move folders like "Documents," "Downloads," and "Pictures" to a different drive. In <code>HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders</code>, you can edit the path values to point to a new location. This is useful for moving data off your main OS drive.</p>
          </div>
        `
      },
      12: {
        title: '🐧 Managing Processes with `ps` and `kill`',
        category: 'linux',
        summary: 'A guide to viewing and terminating processes in Linux.',
        content: `
          <div class="note-body">
            <p>Knowing how to manage processes is a fundamental skill in Linux. The <code>ps</code> command lists running processes, and the <code>kill</code> command terminates them.</p>
            <h4>1. Find a process with <code>ps</code> and <code>grep</code></h4>
            <p>The <code>ps aux</code> command shows all running processes. You can pipe the output to <code>grep</code> to search for a specific one.</p>
            <pre><code class="language-bash">ps aux | grep "nginx"</code></pre>
            <p>This will show you the process ID (PID) of the Nginx process, which is the number in the second column.</p>
            <h4>2. Terminate a process with <code>kill</code></h4>
            <p>Use the <code>kill</code> command followed by the PID to terminate a process. By default, this sends a <code>SIGTERM</code> signal, which requests the process to shut down gracefully.</p>
            <pre><code class="language-bash">kill 12345</code></pre>
            <h4>3. Force-terminate a process</h4>
            <p>If a process doesn't shut down with the standard <code>kill</code> command, you can use the <code>-9</code> flag to send a <code>SIGKILL</code> signal, which forces it to terminate immediately.</p>
            <pre><code class="language-bash">kill -9 12345</code></pre>
            <p>This should be used as a last resort, as it doesn't give the process a chance to clean up resources.</p>
          </div>
        `
      },
      13: {
        title: '🌐 CSS Grid Layout Basics',
        category: 'web',
        summary: 'A beginner-friendly introduction to creating two-dimensional layouts with CSS Grid.',
        content: `
          <div class="note-body">
            <p>CSS Grid Layout is a two-dimensional layout system for the web. It's designed to help you build complex, responsive layouts with rows and columns, a functionality that Flexbox is not primarily designed for.</p>
            <h4>1. Defining a Grid Container</h4>
            <p>To start, you set <code>display: grid</code> on a parent element. Then, you can define the number and size of your columns and rows.</p>
            <pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Creates three equal-width columns */
  grid-template-rows: auto 100px; /* Two rows, one auto-sized, one fixed 100px */
  gap: 20px; /* Sets the spacing between grid items */
}</code></pre>
            <p>The <code>fr</code> unit (fractional unit) is a powerful feature that allows you to distribute available space proportionally.</p>
            <h4>2. Placing Items in the Grid</h4>
            <p>You can place child items in specific locations using <code>grid-column</code> and <code>grid-row</code> properties.</p>
            <pre><code class="language-css">.item-header {
  grid-column: 1 / 4; /* Spans from column line 1 to 4 */
  grid-row: 1;
}</code></pre>
            <p>Grid is a very versatile tool for building modern website layouts. It works well in combination with Flexbox for more intricate components.</p>
          </div>
        `
      },
      14: {
        title: '💻 Essential Python Functions',
        category: 'programming',
        summary: 'A list of key built-in Python functions with simple examples.',
        content: `
          <div class="note-body">
            <p>Python has a rich set of built-in functions that make coding easier and more efficient. Here are some of the most useful ones to remember.</p>
            <h4>1. <code>len()</code></h4>
            <p>Returns the number of items in an object.</p>
            <pre><code class="language-python">my_list = [1, 2, 3, 4]
length = len(my_list) # length is 4
print(length)</code></pre>
            <h4>2. <code>range()</code></h4>
            <p>Generates a sequence of numbers, often used in for loops.</p>
            <pre><code class="language-python">for i in range(5):
    print(i) # Prints 0, 1, 2, 3, 4</code></pre>
            <h4>3. <code>enumerate()</code></h4>
            <p>Adds a counter to an iterable and returns it as an enumerate object.</p>
            <pre><code class="language-python">fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"Item {index}: {fruit}")</code></pre>
            <h4>4. <code>zip()</code></h4>
            <p>Combines two or more iterables into a single iterator of tuples.</p>
            <pre><code class="language-python">names = ['Alice', 'Bob']
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old.")</code></pre>
          </div>
        `
      },
      15: {
        title: '📈 Monitoring a Linux System',
        category: 'linux',
        summary: 'Commands for checking CPU, memory, and disk usage in Linux.',
        content: `
          <div class="note-body">
            <p>System administrators and developers need to monitor system resources to ensure applications are running smoothly. Here are some key commands for checking system status.</p>
            <h4>1. CPU and Memory Usage with <code>top</code></h4>
            <p>The <code>top</code> command provides a real-time, dynamic view of a running system. It shows a list of processes and their resource consumption.</p>
            <pre><code class="language-bash">top</code></pre>
            <p>Press <code>q</code> to exit. A more modern alternative is <code>htop</code>, which is more user-friendly and color-coded.</p>
            <h4>2. Disk Usage with <code>df</code> and <code>du</code></h4>
            <p><code>df</code> (disk free) reports the amount of disk space used and available on filesystems. Use the <code>-h</code> flag for human-readable output.</p>
            <pre><code class="language-bash">df -h</code></pre>
            <p><code>du</code> (disk usage) estimates file space usage. Use it with <code>-sh</code> to get a summary of a directory.</p>
            <pre><code class="language-bash">du -sh /var/log/</code></pre>
          </div>
        `
      },
      16: {
        title: '🌐 Frontend Development Tools',
        category: 'web programming',
        summary: 'A list of modern tools and frameworks for building web UIs.',
        content: `
          <div class="note-body">
            <p>The frontend ecosystem is constantly evolving. Here are some of the most popular and useful tools and frameworks for modern web development.</p>
            <h4>Frameworks & Libraries</h4>
            <ul>
              <li><strong>React:</strong> A JavaScript library for building user interfaces, particularly single-page applications.</li>
              <li><strong>Vue.js:</strong> A progressive framework for building user interfaces. It's known for its simplicity and easy learning curve.</li>
              <li><strong>Angular:</strong> A platform and framework for building single-page client applications using HTML and TypeScript.</li>
            </ul>
            <h4>Build Tools</h4>
            <ul>
              <li><strong>Webpack:</strong> A static module bundler for JavaScript applications.</li>
              <li><strong>Vite:</strong> A next-generation frontend tooling that provides a faster development experience.</li>
              <li><strong>Parcel:</strong> A zero-configuration web application bundler.</li>
            </ul>
            <h4>State Management</h4>
            <ul>
              <li><strong>Redux:</strong> A predictable state container for JavaScript apps.</li>
              <li><strong>Zustand:</strong> A small, fast, and scalable bear-necessities state management solution.</li>
            </ul>
            <p>This is just a small sample of the tools available. The choice often depends on the project's scale and requirements.</p>
          </div>
        `
      },
      17: {
        title: '⚙️ Automating Tasks with PowerShell',
        category: 'windows programming',
        summary: 'An introduction to using PowerShell for scripting and automation in Windows.',
        content: `
          <div class="note-body">
            <p>PowerShell is a command-line shell and scripting language developed by Microsoft. It's a powerful tool for automating administrative tasks and managing Windows systems.</p>
            <h4>Basic Commands (Cmdlets)</h4>
            <p>PowerShell commands are called "cmdlets" (command-lets). They follow a Verb-Noun naming convention.</p>
            <pre><code class="language-powershell">Get-Process      # Gets all processes on the computer
Get-Service      # Gets all services on the computer</code></pre>
            <h4>Piping and Filtering</h4>
            <p>You can "pipe" the output of one cmdlet to another to filter or process data.</p>
            <pre><code class="language-powershell">Get-Service | Where-Object {$_.Status -eq "Running"}
Get-Process | Select-Object -Property ProcessName, Id</code></pre>
            <p>The <code>Where-Object</code> cmdlet filters objects, and <code>Select-Object</code> selects specific properties.</p>
            <h4>Creating a Simple Script</h4>
            <p>You can save a series of cmdlets in a file with a <code>.ps1</code> extension to create a script. For example, a script to get a list of all running processes and save it to a file.</p>
            <pre><code class="language-powershell">Get-Process | Out-File "C:\\Temp\\running_processes.txt"</code></pre>
          </div>
        `
      },
      18: {
        title: '⌨️ Visual Studio Code Shortcuts',
        category: 'programming',
        summary: 'Boost your coding speed with these essential VS Code keyboard shortcuts.',
        content: `
          <div class="note-body">
            <p>Visual Studio Code is a highly popular code editor. Learning its keyboard shortcuts can significantly improve your productivity. Here are some must-know shortcuts.</p>
            <h4>File and Window Management</h4>
            <ul>
              <li><code>Ctrl + P</code> (or <code>Cmd + P</code>): Go to File... (Quickly open any file)</li>
              <li><code>Ctrl + Shift + T</code> (or <code>Cmd + Shift + T</code>): Reopen closed editor</li>
              <li><code>Ctrl + B</code> (or <code>Cmd + B</code>): Toggle Sidebar visibility</li>
            </ul>
            <h4>Editing and Navigation</h4>
            <ul>
              <li><code>Ctrl + D</code> (or <code>Cmd + D</code>): Select word and add next occurrence</li>
              <li><code>Ctrl + Shift + L</code> (or <code>Cmd + Shift + L</code>): Select all occurrences of current selection</li>
              <li><code>Alt + Up/Down</code> (or <code>Option + Up/Down</code>): Move line up or down</li>
            </ul>
            <h4>Terminal and Debugging</h4>
            <ul>
              <li><code>Ctrl + Backtick</code>: Toggle integrated terminal</li>
              <li><code>F5</code>: Start debugging</li>
              <li><code>Shift + F5</code>: Stop debugging</li>
            </ul>
            <p>These shortcuts are just the beginning. The command palette (<code>Ctrl + Shift + P</code>) can show you all available commands and their shortcuts.</p>
          </div>
        `
      },
      19: {
        title: '🎨 A Guide to Color Theory for Developers',
        category: 'web',
        summary: 'Basic principles of color theory to create visually appealing websites.',
        content: `
          <div class="note-body">
            <p>You don't need to be a designer to create a visually pleasing website. Understanding a few fundamental principles of color theory can make a huge difference.</p>
            <h4>1. The Color Wheel</h4>
            <p>The color wheel is a visual representation of colors.
              <ul>
                <li><strong>Primary Colors:</strong> Red, yellow, blue.</li>
                <li><strong>Secondary Colors:</strong> Green, orange, purple (made by mixing two primary colors).</li>
                <li><strong>Tertiary Colors:</strong> A mix of a primary and a secondary color (e.g., red-orange).</li>
              </ul>
            </p>
            <h4>2. Color Schemes</h4>
            <p>Different schemes create different moods and effects:</p>
            <ul>
              <li><strong>Analogous:</strong> Colors next to each other on the color wheel (e.g., blue, blue-green, green).</li>
              <li><strong>Complementary:</strong> Colors opposite each other on the color wheel (e.g., blue and orange). This provides high contrast.</li>
              <li><strong>Triadic:</strong> Three colors evenly spaced on the color wheel (e.g., red, yellow, blue).</li>
            </ul>
            <h4>3. Contrast and Accessibility</h4>
            <p>Ensure there is sufficient contrast between your text and background colors. This is crucial for accessibility. Tools like WebAIM Contrast Checker can help you test your color choices to meet accessibility standards.</p>
          </div>
        `
      },
      20: {
        title: '⌨️ Command-line Text Editing with Vim',
        category: 'linux programming',
        summary: 'Learn the basics of Vim, the powerful and efficient text editor for the terminal.',
        content: `
          <div class="note-body">
            <p>Vim is a highly configurable text editor for efficiently creating and changing text. It's known for its modal interface, which allows for powerful keyboard-driven editing.</p>
            <h4>1. Modes</h4>
            <p>Vim has three main modes:</p>
            <ul>
              <li><strong>Normal Mode:</strong> The default mode for navigation and commands.</li>
              <li><strong>Insert Mode:</strong> For typing text, similar to a standard editor. Enter by pressing <code>i</code>. Exit with <code>Esc</code>.</li>
              <li><strong>Visual Mode:</strong> For selecting text. Enter by pressing <code>v</code>.</li>
            </ul>
            <h4>2. Basic Commands (in Normal Mode)</h4>
            <ul>
              <li><code>h</code>, <code>j</code>, <code>k</code>, <code>l</code>: Move the cursor left, down, up, right.</li>
              <li><code>dd</code>: Delete the current line.</li>
              <li><code>yy</code>: Yank (copy) the current line.</li>
              <li><code>p</code>: Paste the yanked or deleted text.</li>
              <li><code>:w</code>: Save the file.</li>
              <li><code>:q</code>: Quit the editor.</li>
              <li><code>:wq</code>: Save and quit.</li>
            </ul>
            <p>Vim has a steep learning curve but is incredibly efficient once you get the hang of it.</p>
          </div>
        `
      },
      21: {
        title: '🔥 Using CSS Grid for a Responsive Header',
        category: 'web',
        summary: 'A practical example of building a responsive website header with CSS Grid.',
        content: `
          <div class="note-body">
            <p>CSS Grid is an excellent tool for building responsive layouts, and headers are a perfect use case. Here’s a simple example of how to create a header that adapts to different screen sizes.</p>
            <h4>HTML Structure</h4>
            <pre><code class="language-html">&lt;header class="header-grid">
  &lt;div class="logo">NoteDesk&lt;/div>
  &lt;nav class="main-nav">
    &lt;a href="#">Home&lt;/a>
    &lt;a href="#">Notes&lt;/a>
  &lt;/nav>
  &lt;div class="user-profile">Profile&lt;/div>
&lt;/header></code></pre>
            <h4>CSS for the Grid</h4>
            <p>We'll use a single grid for the desktop layout and adjust it for mobile using a media query.</p>
            <pre><code class="language-css">.header-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1rem;
  background-color: #121212;
}

.main-nav {
  justify-self: center;
}

@media (max-width: 768px) {
  .header-grid {
    grid-template-columns: 1fr;
  }
  .main-nav {
    justify-self: start;
  }
}</code></pre>
            <p>On larger screens, the grid has three columns for the logo, navigation, and user profile. On mobile, it collapses into a single column, stacking the elements vertically.</p>
          </div>
        `
      },
      22: {
        title: '📦 Basic Docker Commands',
        category: 'linux programming',
        summary: 'A quick reference for the most common Docker commands.',
        content: `
          <div class="note-body">
            <p>Docker is a platform for developing, shipping, and running applications in containers. Containers allow you to package an application with all its dependencies and run it anywhere.</p>
            <h4>1. Running a Container</h4>
            <p>The <code>docker run</code> command creates and starts a new container from an image.</p>
            <pre><code class="language-bash">docker run -d -p 8080:80 --name my-nginx nginx</code></pre>
            <p>This command runs a container in detached mode (<code>-d</code>), maps port 8080 on the host to port 80 in the container (<code>-p</code>), gives the container a name (<code>--name</code>), and uses the official <code>nginx</code> image.</p>
            <h4>2. Managing Containers</h4>
            <pre><code class="language-bash">docker ps                # Lists all running containers
docker ps -a             # Lists all containers (running and stopped)
docker stop my-nginx     # Stops the container named 'my-nginx'
docker start my-nginx    # Starts a stopped container
docker rm my-nginx       # Removes a container</code></pre>
            <h4>3. Managing Images</h4>
            <pre><code class="language-bash">docker images            # Lists all local images
docker pull ubuntu       # Downloads the latest 'ubuntu' image
docker rmi ubuntu        # Removes the 'ubuntu' image</code></pre>
          </div>
        `
      },
      23: {
        title: '🤖 Introduction to Bash Scripting',
        category: 'linux programming',
        summary: 'A beginner's guide to writing simple scripts for the Bash shell.',
        content: `
          <div class="note-body">
            <p>Bash scripting is a powerful way to automate tasks on Linux systems. A Bash script is a plain text file containing a series of commands for the shell to execute.</p>
            <h4>1. The Shebang</h4>
            <p>A script must start with a "shebang" line to tell the operating system which interpreter to use.</p>
            <pre><code class="language-bash">#!/bin/bash</code></pre>
            <h4>2. Variables and Echo</h4>
            <p>Variables are declared with a name and a value. You can access their value using a dollar sign <code>$</code>.</p>
            <pre><code class="language-bash">#!/bin/bash
NAME="world"
echo "Hello, $NAME!"</code></pre>
            <h4>3. Conditional Statements</h4>
            <p>You can use <code>if</code> statements to make decisions in your script.</p>
            <pre><code class="language-bash">#!/bin/bash
if [ -f "file.txt" ]; then
    echo "file.txt exists."
else
    echo "file.txt does not exist."
fi</code></pre>
            <p>The <code>-f</code> test checks if a file exists. This is just a small introduction to the vast possibilities of Bash scripting.</p>
          </div>
        `
      },
      24: {
        title: '🌐 Building a Simple REST API with Node.js',
        category: 'web programming',
        summary: 'A quick tutorial on how to create a basic API using Express.js.',
        content: `
          <div class="note-body">
            <p>Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's the de-facto standard for building APIs with Node.js.</p>
            <h4>1. Setup</h4>
            <p>First, create a new project and install Express.</p>
            <pre><code class="language-bash">mkdir my-api
cd my-api
npm init -y
npm install express</code></pre>
            <h4>2. Create the Server</h4>
            <p>Create a file named <code>server.js</code> with the following content.</p>
            <pre><code class="language-javascript">const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`API listening at http://localhost:\${port}\`);
});</code></pre>
            <p>This code creates a simple server that responds with "Hello World!" for requests to the root URL.</p>
            <h4>3. Running the Server</h4>
            <p>Run the server from your terminal:</p>
            <pre><code class="language-bash">node server.js</code></pre>
            <p>Your API is now running and can be accessed at <code>http://localhost:3000</code>.</p>
          </div>
        `
      }
    };

    const notesGrid = document.querySelector('.notes-grid');
    const noteModalOverlay = document.getElementById('noteModalOverlay');
    const noteModal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.querySelector('.close-modal');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const featuredNoteCards = document.querySelectorAll('.note-card');

    if (notesGrid) {
      // Function to render notes
      const renderNotes = (notes) => {
        notesGrid.innerHTML = '';
        const noteKeys = Object.keys(notes);
        if (noteKeys.length === 0) {
          notesGrid.innerHTML = '<p class="no-results">No notes found for this category.</p>';
        }
        noteKeys.forEach(noteId => {
          const note = notes[noteId];
          const noteCard = document.createElement('div');
          noteCard.classList.add('note-card');
          noteCard.setAttribute('data-categories', note.category);
          noteCard.setAttribute('data-index', noteId);
          noteCard.setAttribute('tabindex', '0'); // Make note card keyboard focusable

          // Get icon based on category
          let categoryIcon = '';
          if (note.category.includes('windows')) categoryIcon = 'fab fa-windows';
          else if (note.category.includes('linux')) categoryIcon = 'fab fa-linux';
          else if (note.category.includes('web')) categoryIcon = 'fas fa-code';
          else if (note.category.includes('programming')) categoryIcon = 'fas fa-laptop-code';

          noteCard.innerHTML = `
            <h3><i class="${categoryIcon}"></i> ${note.title}</h3>
            <p>${note.summary}</p>
            <span class="note-date">Last updated: July 2025</span>
          `;
          notesGrid.appendChild(noteCard);
        });
        addNoteCardListeners();
      };

      // Initial render of all notes
      renderNotes(notesDatabase);

      // Search functionality
      searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredNotes = Object.entries(notesDatabase).reduce((acc, [id, note]) => {
          const text = (note.title + note.summary).toLowerCase();
          if (text.includes(searchTerm)) {
            acc[id] = note;
          }
          return acc;
        }, {});
        renderNotes(filteredNotes);
      });

      // Category filtering
      categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          const category = button.dataset.category;
          const filteredNotes = Object.entries(notesDatabase).reduce((acc, [id, note]) => {
            if (category === 'all' || note.category.includes(category)) {
              acc[id] = note;
            }
            return acc;
          }, {});
          renderNotes(filteredNotes);
        });
      });
    }

    // Modal functionality for notes page and home page
    const addNoteCardListeners = () => {
      const noteCards = document.querySelectorAll('.note-card');
      noteCards.forEach(card => {
        card.addEventListener('click', () => {
          const noteId = card.dataset.index;
          const note = notesDatabase[noteId];
          if (note) {
            modalTitle.innerHTML = note.title;
            modalContent.innerHTML = note.content;
            noteModalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            noteModal.focus();
          }
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });
      });
    };

    // Close modal button
    closeModalBtn?.addEventListener('click', () => {
      noteModalOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    // Close modal by clicking outside
    noteModalOverlay?.addEventListener('click', (e) => {
      if (e.target === noteModalOverlay) {
        noteModalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && noteModalOverlay.style.display === 'flex') {
        noteModalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    // Add listeners for featured notes on index.html
    if(featuredNoteCards.length > 0) {
      addNoteCardListeners();
    }
  };

  // ===== 7. CONTACT FORM SUBMISSION (Client-side validation and feedback) =====
  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here, you would typically send the data to a server.
        // For this example, we'll just simulate a successful submission.
        
        // Show success message
        formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
        formStatus.classList.remove('error');
        formStatus.style.display = 'block';
        form.reset();
        
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      });
    }
  };

  // Initialize all functions
  pageLoader();
  scrollAnimations();
  initTicker();
  initNavigation();
  initDarkMode();
  initNotes();
  initContactForm();
});
