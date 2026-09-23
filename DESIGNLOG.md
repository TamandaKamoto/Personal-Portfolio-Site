## 1. SCADA Telemetry API Integration
* **Decision**: Integrated the external Open-Meteo API (`https://api.open-meteo.com/v1/forecast?...`) inside `script.js` to compute live water telemetry (Intake Flow Rate, Reservoir Level, Turbidity) for the Blantyre Water Board section[cite: 2].
* **Alternatives Considered**: Generating synthetic data using client-side `Math.random()` loops, or building a custom WebSocket backend service.
* **Rationale**: Open-Meteo provides real location-based rainfall data (latitude `-15.68`, longitude `34.73`) with zero infrastructure costs, allowing rainfall spikes to realistically calculate turbidity levels[cite: 2].
* **Trade-offs**: Sacrificed native industrial protocol connections (e.g., Modbus/MQTT) and offline capabilities; telemetry fails to update if the client loses internet access[cite: 2].

---

## 2. Theme Switching & Preference Persistence
* **Decision**: Implemented CSS custom properties (`:root` vs `[data-theme="dark"]`) controlled by JavaScript that stores theme choices in `localStorage` while honoring system defaults via `prefers-color-scheme`[cite: 2, 3].
* **Alternatives Considered**: Swapping independent stylesheet links (`light.css` / `dark.css`) or using purely OS-level media queries without a explicit toggle button.
* **Rationale**: CSS variables enable smooth dynamic theme transitions without page reloads or unstyled flashes, while `localStorage` preserves user preferences across sessions[cite: 2, 3].
* **Trade-offs**: Increased CSS complexity, as all component backgrounds, borders, and text elements must be explicitly mapped to CSS variable tokens[cite: 3].

---

## 3. Accessible Mobile Navigation Overlay
* **Decision**: Developed a custom JavaScript overlay drawer sync’d with accessibility attributes (`aria-expanded`) and event listeners for backdrop clicks, navigation links, and the `Escape` key[cite: 1, 2, 3].
* **Alternatives Considered**: Using a CSS-only checkbox hack (`:checked`) or standard browser `<select>` dropdown menus.
* **Rationale**: Pure CSS toggles cannot dynamically update ARIA attributes or listen for keydown events (`Escape`), making JavaScript necessary to meet web accessibility guidelines[cite: 1, 2, 3].
* **Trade-offs**: Mobile menu toggling depends completely on client-side JavaScript executing without errors[cite: 2].

---

## 4. Client-Side Form Validation Strategy
* **Decision**: Intercepted the form submission using `event.preventDefault()` in `script.js` to validate input fields against regular expressions and render inline error messages[cite: 1, 2].
* **Alternatives Considered**: Relying strictly on native browser HTML5 validation (`required`, `type="email"`), or pulling in an external validation library.
* **Rationale**: Native tooltips render inconsistently across operating systems and browsers, whereas custom JavaScript provides complete design control over error states[cite: 1, 2, 3].
* **Trade-offs**: Incurred manual error handling logic and lost default browser focus-trapping behaviors for form validation summaries[cite: 2].

---

## 5. High-Priority Preloading for Hero Image
* **Decision**: Configured high-priority preloading for `hero-image.webp` directly in the `<head>` using `<link rel="preload" as="image" fetchpriority="high">`[cite: 1].
* **Alternatives Considered**: Referencing the hero image purely inside `style.css`, or using standard JPEG/PNG image formats.
* **Rationale**: Background images defined in external CSS files experience discovery delays in browser parsing pipelines. Preloading WebP assets minimizes Largest Contentful Paint (LCP) render times[cite: 1, 3].
* **Trade-offs**: Sacrificed legacy browser support for older clients that do not support WebP compression or the `fetchpriority` attribute[cite: 1].

---

## 6. Hybrid CSS Layout Engine (Grid + Flexbox)
* **Decision**: Applied CSS Grid for two-dimensional multi-card layouts (`.skills-grid`, `.telemetry-grid`) and Flexbox for one-dimensional directional components (header, navigation, forms, footer)[cite: 3].
* **Alternatives Considered**: Using Flexbox exclusively for all components, or importing a utility framework like Bootstrap.
* **Rationale**: CSS Grid handles responsive multi-column restructuring cleanly (`repeat(auto-fit, minmax(...))`) without needing redundant media queries[cite: 3].
* **Trade-offs**: Reduced rendering fidelity on outdated legacy browsers lacking modern CSS Grid support.

---

## 7. Single-Page Architecture
* **Decision**: Consolidated all sections—including project breakdowns, SCADA article, CV download, and contact form—into a single document (`index.html`) with internal anchor navigation[cite: 1].
* **Alternatives Considered**: Splitting projects and technical articles into separate HTML files (`/projects/server-room.html`, `/articles/scada.html`).
* **Rationale**: Provides a continuous, uninterrupted reading experience allowing reviewers to inspect project details and live telemetry without full page reloads[cite: 1].
* **Trade-offs**: Increased initial DOM payload size and lost granular per-page analytics tracking[cite: 1].

---

## 8. Mobile-First Progressive Enhancement
* **Decision**: Structured CSS rules targeting mobile viewport sizes first, introducing desktop enhancements progressively through `min-width` media queries at 640px, 768px, and 1024px[cite: 3].
* **Alternatives Considered**: Desktop-first CSS using `max-width` queries to strip styles down for smaller screens.
* **Rationale**: Mobile-first styling avoids unnecessary CSS rule overrides and recalculations on lower-powered mobile hardware[cite: 3].
* **Trade-offs**: Requires building layouts upward from mobile screens, which can slow down desktop prototyping speeds[cite: 3].
"""
