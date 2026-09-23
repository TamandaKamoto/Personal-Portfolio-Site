# AI Tool Usage

* **AI Tool Used:** Gemini AI

---

## 1. CSS Grid Layout for Skills Cards

### What I Asked
> *"How do I implement a responsive CSS Grid layout for my skills section?"*

### What I Implemented

**HTML (`index.html`):
```html
<section id="skills">
  <h2 class="section-title">Skills</h2>
  <div class="skills-grid">
    <div class="skill-card">
      <h3>Database Design</h3>
      <div class="skill-tags">
        <span class="skill-tag">PostgreSQL</span>
      </div>
    </div>
    <div class="skill-card">
      <h3>Web Development</h3>
      <div class="skill-tags">
        <span class="skill-tag">HTML</span>
        <span class="skill-tag">CSS</span>
        <span class="skill-tag">JavaScript</span>
      </div>
    </div>
    <div class="skill-card">
      <h3>Programming Languages</h3>
      <div class="skill-tags">
        <span class="skill-tag">C++</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">MATLAB</span>
      </div>
    </div>
  </div>
</section>
```

**CSS (`style.css`):
```css
.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### What I learnt
* I learnt that the `1fr` unit divides available horizontal container space equally across columns.

---

## 2. Light / Dark Mode Toggle

### What I Asked
> *"How do I write a CSS and JavaScript code to toggle light and dark themes?"*

### What I Implemented

**CSS (`style.css`):
```css
:root {
  --bg-primary: #ffff99; 
  --bg-secondary: #f0f080;
  --text-color: #000000;
  --footer-bg: #4a9155; 
  --footer-text: #ffffff;
  --accent-color: #2b5731;
  --error-color: #d32f2f;
  --font-family: Arial, sans-serif;
  --transition-speed: 0.3s;
}

[data-theme="dark"] {
  --bg-primary: #0a1f11; 
  --bg-secondary: #132a1a;
  --text-color: #ffffff;
  --footer-bg: #2b5731;
  --footer-text: #ffffff;
  --accent-color: #81c784;
}
```

**JavaScript (`script.js`):
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
```

### What I learnt
* I learnt how `window.matchMedia('(prefers-color-scheme: dark)')` checks browser OS settings on first visit.

---

## 3. Live API Integration for BWB Telemetry Section

### What I Asked
> *"How do I use `async/await` and `fetch()` in JavaScript to consume an API, calculate simulated telemetry data for Blantyre Water Board (BWB)?"*

### What I Implemented

**HTML (`index.html`):
```html
<div id="water-telemetry" class="telemetry-card">
  <h3>BWB Walker's Ferry Station Live SCADA Telemetry</h3>

  <div id="water-telemetry-data" class="telemetry-grid">
    <p class="loading-text">Polling BWB SCADA telemetry...</p>
  </div>

  <button id="refresh-water-telemetry" class="btn">Poll Water Telemetry</button>
</div>
```

**JavaScript (`script.js`):
```javascript
const fetchBwbWaterTelemetry = async () => {
  const container = document.getElementById('water-telemetry-data');
  if (!container) return;

  container.innerHTML = '<p class="loading-text">Polling BWB SCADA telemetry...</p>';

  const apiUrl = '[https://api.open-meteo.com/v1/forecast?latitude=-15.68&longitude=34.73&current=temperature_2m,rain,surface_pressure,wind_speed_10m&timezone=Africa%2FBlantyre](https://api.open-meteo.com/v1/forecast?latitude=-15.68&longitude=34.73&current=temperature_2m,rain,surface_pressure,wind_speed_10m&timezone=Africa%2FBlantyre)';

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
```

### What I learnt
* I learnt how to calculate metrics dynamically based on live values fetched from an API, for instance flow rate from the weather API.

---

## 4. Lighthouse Performance Optimization (Score: 45 ➔ 71)

### What I Asked
> *"How do I improve the performance of my webpage from 45 to 85 on Lighthouse?"*

### What I Implemented

**HTML (`index.html`):
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tamanda J. T. Kamoto - Portfolio</title>

  <link rel="preload" as="image" href="hero-image.webp" type="image/webp" fetchpriority="high">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ...
  <script src="script.js"></script>
</body>
```

**CSS (`style.css`):
```css
.hero-header {
  background: url('hero-image.webp') no-repeat center center/cover;
  min-height: 250px;
}
```

### What I learnt
* **Resource Preloading:** Adding `<link rel="preload" as="image" href="hero-image.webp" fetchpriority="high">` forces high-priority fetching of the hero header image.
* **Next-Gen Image Formats:** Switching background image formats to WebP significantly reduced file size and improved rendering speed.

## Preview

![Portfolio Preview](lighthouse_screenshot.png)

