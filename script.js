// Helper to get subdirectory prefix dynamically (e.g. /vigneeshjv.github.io or "")
function getPathPrefix() {
  const path = window.location.pathname;
  const prefix = path.substring(0, path.lastIndexOf('/'));
  if (['/home', '/about', '/resume', '/projects', '/work', '/contact', '/All-Projects'].some(p => path.endsWith(p))) {
    const segment = path.substring(path.lastIndexOf('/'));
    return path.substring(0, path.length - segment.length);
  }
  if (typeof projectsData !== 'undefined') {
    const matchedProject = projectsData.find(p => path.endsWith('/' + p.id));
    if (matchedProject) {
      return path.substring(0, path.length - matchedProject.id.length - 1);
    }
  }
  return prefix === '/' ? '' : prefix;
}


// Header scroll animation
function initHeaderScroll() {
  const header = document.querySelector('.header');

  if (!header) return;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    
    // Trigger scrolled style immediately upon the first scroll
    if (scrollPosition > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run once on load to establish correct state
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

// Active Nav Link Tracking on Scroll
function initActiveTabTracker() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a.nav-link:not(.hire-btn)');

  if (navLinks.length === 0) return;

  // Track if we are on homepage
  const isHomepage = window.location.pathname === '/' || 
                     window.location.pathname.endsWith('/index.html') || 
                     ['/home', '/about', '/resume', '/projects', '/work', '/contact'].some(p => window.location.pathname.endsWith(p));

  if (!isHomepage) {
    // If not homepage, ensure "Projects" is highlighted
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href.includes('projects') || href.includes('#projects')) {
        link.classList.add('active');
      }
    });
    return;
  }

  if (sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Center-focused band to detect active section
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${id}` || href.endsWith(`#${id}`)) {
            link.classList.add('active');
            
            // Rewrite URL in the address bar to the clean format on scroll
            const cleanUrl = getPathPrefix() + '/' + id;
            if (window.location.pathname !== cleanUrl) {
              window.history.replaceState(null, null, cleanUrl);
            }
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Fallback: If at the very top of the page, activate Home link
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === '#home' || link.getAttribute('href').endsWith('#home'));
      if (homeLink) {
        homeLink.classList.add('active');
        const cleanUrl = getPathPrefix() + '/home';
        if (window.location.pathname !== cleanUrl) {
          window.history.replaceState(null, null, cleanUrl);
        }
      }
    }
  });
}

// Global reveal observer reference so other subsystems can dynamically register elements
let scrollRevealObserver;

// Scroll Reveal Animation System
function initScrollReveal() {
  const selectorsToReveal = [
    '#about .sub-title',
    '#about .title',
    '#about .sub-title-text',
    '.about-col-1',           // Profile image container
    '.info-card',
    '.resume-header',
    '.timeline-item',
    '.skills-box',
    '.projects-header',
    '.work-card',
    '.social-section',        // Social section reveal
    '.contact-container',
    '.back-link',
    '.project-detail-header',
    '.detail-content-grid'
  ];

  selectorsToReveal.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal-on-scroll');
    });
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: '0px 0px -80px 0px' // Trigger slightly before element enters fully
  };

  scrollRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Find if this is part of a staggered group to apply delay
        if (target.classList.contains('info-card') || target.classList.contains('work-card') || target.classList.contains('timeline-item') || target.classList.contains('project-card')) {
          const parent = target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll(`.${target.classList[0]}`));
            const index = siblings.indexOf(target);
            if (index !== -1) {
              target.style.transitionDelay = `${(index % 3) * 0.15}s`;
            }
          }
        }
        
        target.classList.add('revealed');
        // Unobserve after showing so it only animates once
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    scrollRevealObserver.observe(el);
  });
}

// Reusable Project Card Tilt Effect (restricted specifically to project cards only)
function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    // Set standard transition on hover only, preventing it from overriding the initial slow scroll reveal transition
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease';
    });
    
    card.addEventListener('mousemove', e => {
      // Only permit tilt interactions once the card has been revealed!
      if (!card.classList.contains('revealed')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      // Remove transition temporarily for ultra-responsive tracking during mouse move
      card.style.transition = 'transform 0.05s linear, box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Restore smooth transition when leaving
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, border-color 0.5s ease';
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// Dynamic Projects System
function initProjectsSystem() {
  const projectsGrid = document.getElementById('projects-grid');
  const viewAllBtn = document.getElementById('view-all-btn');

  if (!projectsGrid) return;
  
  // Determine if we are on the homepage or the all projects page
  const isAllProjectsPage = window.location.pathname.includes('projects.html') || window.location.pathname.endsWith('/All-Projects');

  // Render Projects
  function renderProjects() {
    projectsGrid.innerHTML = '';

    // Slice projects for rendering based on page
    // Show 6 on homepage, all on projects.html
    const visibleProjects = isAllProjectsPage ? projectsData : projectsData.slice(0, 6);

    // Determine visibility of "View All" button on homepage
    if (!isAllProjectsPage && viewAllBtn) {
        viewAllBtn.style.display = 'inline-flex';
    }

    if (visibleProjects.length === 0) {
      projectsGrid.innerHTML = `
        <div class="no-projects animate__animated animate__fadeIn" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255, 21, 119, 0.02); border: 1px dashed rgba(255, 21, 119, 0.15); border-radius: 16px;">
          <i class='bx bx-folder-open' style="font-size: 3.5rem; color: var(--primary-color); opacity: 0.6; margin-bottom: 16px; display: block;"></i>
          <p style="font-size: 16px; color: #b0b0b0;">No projects found yet. Stay tuned!</p>
        </div>
      `;
      return;
    }

    // Generate HTML for each project
    visibleProjects.forEach((project) => {
      const card = document.createElement('div');
      card.className = `project-card reveal-on-scroll`;
      card.setAttribute('data-id', project.id);

      card.innerHTML = `
        <div class="project-image-wrapper">
          <div class="project-tag">${project.tag}</div>
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-card-content">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-desc">${project.shortDescription}</p>
          <a href="${getPathPrefix()}/project-detail.html?id=${project.id}" class="project-card-link">
            Explore more <i class='bx bx-right-arrow-alt' style="vertical-align: middle; margin-left: 4px; font-size: 1.1rem; transition: transform 0.3s ease;"></i>
          </a>
        </div>
      `;

      projectsGrid.appendChild(card);
      
      // Observe dynamically generated project cards for high-performance scroll reveal entrance
      if (scrollRevealObserver) {
        scrollRevealObserver.observe(card);
      }
    });

    // Apply tilt effect specifically to project cards only
    initTiltEffect();
  }

  // Bind view all click on homepage
  if (viewAllBtn && !isAllProjectsPage) {
    viewAllBtn.addEventListener('click', () => {
        window.location.href = getPathPrefix() + '/projects.html';
    });
  }

  // Initial render
  renderProjects();
}

// Typewriter effect in Hero Section
function initTypewriter() {
  const typedElement = document.getElementById('typed');
  if (!typedElement || typeof Typed === 'undefined') return;

  new Typed("#typed", {
    stringsElement: '#typed-strings',
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
  });
}

// Premium Toast Notification System
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification reveal-toast';
  
  toast.innerHTML = `
    <i class='bx bx-check-circle toast-icon'></i>
    <div class="toast-content">
      <p class="toast-message">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('reveal-toast');
    toast.classList.add('hide-toast');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 4000);
}

// Contact Form Integration with Google Forms
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSerOIDpwMdhaBAR7b4HtDPEO8Gli_lCM0rZokjm3H8e1WQlIA/formResponse";
  const FIELDS = {
    name: "entry.431577533",
    email: "entry.1638582695",
    subject: "entry.232013274",
    message: "entry.2001954653",
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i class='bx bx-loader-alt bx-spin' style="vertical-align: middle; margin-left: 6px;"></i>`;

    const nameVal = document.getElementById('name').value;
    const emailVal = document.getElementById('email').value;
    const subjectVal = document.getElementById('subject').value;
    const messageVal = document.getElementById('message').value;

    const formData = new URLSearchParams();
    formData.append(FIELDS.name, nameVal);
    formData.append(FIELDS.email, emailVal);
    formData.append(FIELDS.subject, subjectVal);
    formData.append(FIELDS.message, messageVal);

    fetch(FORM_ACTION, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    })
    .then(() => {
      showToast("Message sent successfully! Will contact soon.");
      form.reset();
    })
    .catch((error) => {
      console.error("Form Submission Error:", error);
      showToast("Oops! Something went wrong. Please try again.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  });
}

// Mobile menu navigation toggle
function initMobileMenu() {
  const menuIcon = document.getElementById('menu-icon');
  const navMenu = document.querySelector('.nav-menu');

  if (!menuIcon || !navMenu) return;

  menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
      menuIcon.classList.remove('bx-menu');
      menuIcon.classList.add('bx-x');
    } else {
      menuIcon.classList.remove('bx-x');
      menuIcon.classList.add('bx-menu');
    }
  });

  // Close menu when clicking a link
  const navLinks = navMenu.querySelectorAll('a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuIcon.classList.remove('bx-x');
      menuIcon.classList.add('bx-menu');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
      navMenu.classList.remove('active');
      menuIcon.classList.remove('bx-x');
      menuIcon.classList.add('bx-menu');
    }
  });
}

// Intercept all internal anchor clicks on the homepage to update URL to clean path format
function initCleanAnchorsRouting() {
  const isHomepage = window.location.pathname === '/' || 
                     window.location.pathname.endsWith('/index.html') || 
                     ['/home', '/about', '/resume', '/projects', '/work', '/contact'].some(p => window.location.pathname.endsWith(p));

  if (!isHomepage) return;

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update URL to clean format without hash symbol
        window.history.pushState(null, null, getPathPrefix() + '/' + targetId);
      }
    }
  });
}

// Master Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initActiveTabTracker();
  initProjectsSystem(); // Load projects first so cards are added to the DOM before scanning reveals
  initScrollReveal();   // Scan elements and initialize reveal observer
  initTypewriter();
  initContactForm();
  initMobileMenu();
  initCleanAnchorsRouting();
});
