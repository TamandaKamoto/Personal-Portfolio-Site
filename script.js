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
});