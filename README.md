# 🕷️ Tejendra Dharikar — Personal Portfolio

> A Spider-Man themed developer portfolio built with **Next.js 16**, **TypeScript**, and **Framer Motion** — dark, animated, and built to impress.

**Live site:** _(deploy link here)_ · **GitHub:** [TejendraDharikar](https://github.com/TejendraDharikar) · **LinkedIn:** [tejendra-dharikar](https://www.linkedin.com/in/tejendra-dharikar/)

---

## 🖥️ About the Site

This is my personal portfolio website — designed and built entirely by me to showcase my skills, experience, and projects. The design follows a **Spider-Man editorial aesthetic**: deep blacks, crimson red (#c1272d), angular clip-path cards, and a full set of web-themed animations.

### Sections

| Section | What It Contains |
|---|---|
| **Hero** | Intro headline with Spider-Sense hover glitch effect |
| **Skills** | Frontend, Backend, and Databases & Tools — each in an animated card |
| **Experience** | Timeline of work with animated swing-in cards |
| **Projects** | Shipped projects with live/GitHub links and Spidey card hover effects |
| **Contact** | Social links and resume download button |

---

## ✨ Animations & Effects

The site ships with a layered set of interactive and ambient animations, all powered by Framer Motion:

- **Spider-web backdrop** — SVG web strands draw themselves in on load
- **Corner webs** — fixed decorative webs in the viewport corners
- **Swinging Spiderman mask** — pendulum animation in the top-right
- **Hanging spider** — drops down from the top-left on a timer
- **Scroll-pull webs** — webs shoot in from top/bottom edges based on scroll velocity and direction
- **Crawling spider bot** — scurries across the Skills section background
- **Cursor glow** — soft red radial gradient that follows your mouse
- **Spider-Sense glitch** — hover the hero title for a red/blue chromatic aberration effect
- **Swing-in cards** — project and experience cards rotate into view like they are swinging from a web
- **Card hover webs** — spider webs expand from the corner of cards on hover

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Fonts | Bebas Neue + Inter (via `next/font/google`) |
| Icons | [`react-icons`](https://react-icons.github.io/react-icons/) (FA, FI, GI sets) |
| Runtime | Node.js ≥ 20 (v22 recommended) |

---

## 🚀 Getting Started (Local Dev)

### Prerequisites

- Node.js **v20 or higher** (v22 recommended)  
- npm / yarn

> If you use `nvm`, run `nvm use 22` before starting.

### Install & Run

```bash
# Clone the repository
git clone https://github.com/TejendraDharikar/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx       # Root layout, metadata, global font/scroll setup
│   ├── page.tsx         # Main page — all sections and animations
│   └── globals.css      # Global styles and Tailwind base
├── public/
│   └── resume.pdf       # Resume file (linked in Contact section)
├── package.json
└── README.md
```

---

## 🎨 Design Decisions

- **Bebas Neue** for headings — bold, editorial, matches the comic-book energy.
- **`clip-path: polygon()`** on cards creates an angular, asymmetric cutout that feels like a ripped comic panel.
- **`useVelocity` + `useSpring`** from Framer Motion power the scroll-reactive web effect — faster scrolling = webs stretch further onto the screen.
- All background elements use `pointer-events-none` and appropriate `z-index` layers so they never interfere with content interaction.

---

## 📬 Contact

Tejendra Dharikar — Fullstack Developer based in Nepal, open to remote roles.

- 📧 tejendradharikar@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/tejendra-dharikar/)
- 🐙 [GitHub](https://github.com/TejendraDharikar)

---

<p align="center">Built with ❤️ and a lot of web-slinging</p>