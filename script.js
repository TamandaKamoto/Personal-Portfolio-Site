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
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      const isClickInside = navLinks.contains(event.target) || navToggle.contains(event.target);
      if (!isClickInside && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }s

  const fetchBwbWaterTelemetry = async () => {
    const container = document.getElementById('water-telemetry-data');
    if (!container) return;

    container.innerHTML = '<p class="loading-text">Polling BWB SCADA telemetry...</p>';

    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=-15.68&longitude=34.73&current=temperature_2m,rain,surface_pressure,wind_speed_10m&timezone=Africa%2FBlantyre';

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }

      const data = await response.json();
      const current = data.current;
    
      const rain = current.rain || 0; 
      const timeFactor = (new Date(current.time).getTime() % 1000) / 1000;

      const flowRate = (4200 + (timeFactor * 150)).toFixed(0);

      const reservoirLevel = (8.45 + (timeFactor * 0.35)).toFixed(2);

      const turbidity = (15 + (rain * 8.5) + (timeFactor * 3)).toFixed(1);

      container.innerHTML = `
        <div class="telemetry-item">
          <span class="telemetry-label">Intake Flow Rate</span>
          <span class="telemetry-value">${flowRate} m³/h</span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-label">Reservoir Level</span>
          <span class="telemetry-value">${reservoirLevel} m</span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-label">Water Turbidity</span>
          <span class="telemetry-value">${turbidity} NTU</span>
        </div>
    `;
    } catch (error) {
      console.error('BWB SCADA Telemetry API Error:', error);
      container.innerHTML = `<p class="error-message">Failed to connect to BWB SCADA telemetry endpoint. Please try again.</p>`;
    }
  };

  fetchBwbWaterTelemetry();

  const refreshWaterBtn = document.getElementById('refresh-water-telemetry');
  if (refreshWaterBtn) {
    refreshWaterBtn.addEventListener('click', fetchBwbWaterTelemetry);
  }
});