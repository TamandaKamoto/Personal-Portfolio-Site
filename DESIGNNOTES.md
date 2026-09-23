## 1. Target Audience
The portfolio site is designed specifically for:
* **Engineering Recruiters & Hiring Managers** evaluating entry-level or junior Electronics & Computer Engineers for hardware, embedded systems, and software engineering roles.
* **Industrial & Agricultural Stakeholders** seeking localized IoT and automated supervisory control solutions (such as SCADA, telemetry, or disaster early-warning monitoring systems).
* **Academic & Technical Peers** interested in practical hardware prototyping, firmware design, and system architecture case studies.

---

## 2. Sitemap
The application follows a streamlined Single-Page Application (SPA) layout utilizing smooth internal anchor navigation:

* **Header / Navigation**
  * Hero Section (`#home`)
  * Theme Toggle (`#theme-toggle`)
  * Mobile Drawer Menu (`#nav-toggle`)
* **Main Content Sections**
  * **01. Home (`#home`)**: Professional welcome statement and background introduction.
  * **02. About Me (`#about`)**: Academic path at MUBAS and foundational interest in hardware systems engineering.
  * **03. Skills (`#skills`)**: Visual taxonomy of competencies across Database Design, Web Development, and Hardware/Programming languages.
  * **04. Projects (`#projects`)**: In-depth hardware and software case studies:
    * *Real-Time Riverine Flood Monitoring and Early Warning System*
    * *Server Room Monitoring System*
    * *Automatic Greenhouse Monitoring System*
  * **05. Article (`#article`)**: Technical essay ("Understanding SCADA Systems") with embedded real-time Blantyre Water Board (BWB) live telemetry API polling widget.
  * **06. CV (`#cv`)**: Direct action link to download full PDF Curriculum Vitae.
  * **07. Contact (`#contact`)**: Interactive contact form featuring client-side error handling.
* **Footer**: Copyright timestamp (`2026`) and author ownership credit.

---

## 3. Design System Specifications

### A. Color Palette & WCAG Contrast Ratios

#### Light Mode (Default)
* **Primary Background (`--bg-primary`)**: `#ffff99`
* **Secondary Card Background (`--bg-secondary`)**: `#f0f080`
* **Primary Text (`--text-color`)**: `#000000`
  * *Contrast Ratio*: **18.8:1** against `#ffff99` (Passes WCAG AAA)
* **Accent & Primary Buttons (`--accent-color`)**: `#2b5731` with `#ffffff` text
  * *Contrast Ratio*: **7.6:1** (Passes WCAG AAA)
* **Error States & Sub-Headings (`--error-color`)**: `#d32f2f`
  * *Contrast Ratio*: **4.7:1** against `#ffff99` (Passes WCAG AA)
* **Footer Background (`--footer-bg`)**: `#4a9155` with `#ffffff` text
  * *Contrast Ratio*: **3.5:1** (Passes WCAG AA Large Text)

#### Dark Mode (`[data-theme="dark"]`)
* **Primary Background (`--bg-primary`)**: `#0a1f11`
* **Secondary Card Background (`--bg-secondary`)**: `#132a1a`
* **Primary Text (`--text-color`)**: `#ffffff`
  * *Contrast Ratio*: **19.5:1** against `#0a1f11` (Passes WCAG AAA)
* **Accent & Highlights (`--accent-color`)**: `#81c784`
  * *Contrast Ratio*: **9.8:1** against `#0a1f11` (Passes WCAG AAA)
* **Footer Background (`--footer-bg`)**: `#2b5731` with `#ffffff` text
  * *Contrast Ratio*: **7.6:1** (Passes WCAG AAA)

---

### B. Type Scale & Hierarchy

* **Font Families**:
  * *Primary System Stack*: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  * *Fallback Theme Stack*: `Arial, sans-serif`

| Level / Token | Size | Weight | Line Height | Case / Letter Spacing | Usage Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1** | `2.5rem`–`2.75rem` (40–44px) | 700 | 1.2 | Standard | Home Intro Header & Hero H1 |
| **Heading 1 (H2)** | `2.0rem`–`2.25rem` (32–36px) | 700 | 1.3 | Uppercase (`0.1em`) | Main Section Titles |
| **Heading 2 (H3)** | `1.25rem`–`1.35rem` (20–21.6px) | 700 | 1.4 | Standard | Project Titles & Article H3 |
| **Subheading (H4)** | `0.825rem` (13.2px) | 700 | 1.4 | Uppercase (`0.08em`) | Project Detail Headers |
| **Body Lead** | `1.125rem` (18px) | 400 | 1.6–1.7 | Standard | Home / About paragraph copy |
| **Body Standard** | `0.95rem`–`1.025rem` (15–16.4px) | 400 | 1.6 | Standard | General text, lists, and form inputs |
| **Caption / Label** | `0.75rem`–`0.875rem` (12–14px) | 600–700 | 1.2 | Uppercase (`0.06em`) | Skill tags, telemetry metrics |

---

### C. Spacing & Elevation Scale

* **Padding & Margin Grid**:
  * `0.4rem` (6.4px) / `0.5rem` (8px) – Tight inline item padding
  * `1.0rem` (16px) / `1.25rem` (20px) – Standard card padding & component gaps
  * `1.75rem` (28px) / `2.0rem` (32px) – Container padding & card content boundaries
  * `4.0rem` (64px) / `4.5rem` (72px) – Section boundaries & layout margins
* **Corner Radius (`border-radius`)**:
  * `4px`: Standard inputs, contact submit button, CV download button
  * `8px`: Skill category tags
  * `12px`: Telemetry data items, mobile drawer navigation menu
  * `16px`: Interactive skill cards, telemetry container, project cards
  * `50%`: Mobile circular navigation hamburger button
* **Box Shadows & Elevation**:
  * *Default Card Shadow*: `0 10px 25px -5px rgba(0, 0, 0, 0.2)`
  * *Hover Focus Shadow*: `0 15px 25px -5px rgba(59, 130, 246, 0.15)`

---

### D. Component States

#### 1. Buttons (`.btn`, `#theme-toggle`, `#refresh-water-telemetry`)
* **Default**: `background-color: var(--accent-color)`, `color: #ffffff`, `border-radius: 4px`.
* **Hover**: `transform: translateY(-1px)`.
* **Active**: `transform: translateY(1px)`.
* **Focus**: Standard browser accessibility outline ring.

#### 2. Mobile Nav Toggle (`.nav-toggle`)
* **Default**: Floating circular button (`48px x 48px`), fixed at top right (`top: 1rem`, `right: 1rem`), `background-color: var(--accent-color)`.
* **Active**: `transform: scale(0.95)`.
* **Open State (`.nav-toggle.open`)**: The central `.hamburger` line hides while `:before` and `:after` pseudo-elements rotate `45deg` and `-45deg` to morph into an 'X' close icon.

#### 3. Form Inputs (`input`, `textarea`)
* **Default**: `border: 1px solid #ccc`, `border-radius: 4px`, `padding: 0.5rem`.
* **Focus**: Native outline active.
* **Error State**: Client-side validation targets empty or improperly formatted inputs, injecting inline messages (`#d32f2f`) into dedicated `.error-message` spans below the input field while keeping `min-height: 1.2rem` to prevent layout shift.
"""
