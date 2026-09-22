document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', dark);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').textContent = 'Please enter your name.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      document.getElementById('email-error').textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      document.getElementById('message-error').textContent = 'Please enter your message.';
      isValid = false;
    }

    if (isValid) {
      alert('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    }
  });

  // --- Mobile Navigation Toggle Logic ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuLinks = navLinks ? navLinks.querySelectorAll('a') : [];

  const closeMenu = () => {
    if (navLinks && navToggle) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };

  const openMenu = () => {
    if (navLinks && navToggle) {
      navLinks.classList.add('active');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  };

  if (navToggle && navLinks) {
    // Toggle menu state on button click
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking any navigation link
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside the navigation drawer
    document.addEventListener('click', (event) => {
      const isClickInside = navLinks.contains(event.target) || navToggle.contains(event.target);
      if (!isClickInside && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on pressing the Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }
});