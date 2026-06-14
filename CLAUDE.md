# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page personal portfolio website for Mostafa Keshvary. No build system or package manager — edit files directly and open `index.html` in a browser to preview.

## Development

Open `index.html` directly in a browser (no server required). All assets are referenced with relative paths.

## Architecture

**Single entry point**: All content lives in `index.html` as nested `<div id="section">` elements. Navigation uses CSS `:target` pseudo-class to show/hide sections — clicking a nav link like `href="#about"` triggers `#about:target` rules in the CSS.

**CSS structure** — organized into three layers:
- `css/plugins/` — third-party plugin styles (Bootstrap, Font Awesome, SimpleBar, Animated Headline)
- `css/style-dark.css` — main theme; imports fonts and defines all section layouts
- `css/settings/` — swappable style modules loaded via named `<link>` elements:
  - `right-nav.css` / alternative nav positions
  - `box/box.css` + `box/circle.css` — card border styles
  - `title/title.css` — section title decoration styles
  - `color/green-color.css` — accent color (swap this file to change the color scheme)

**JS plugins** (loaded via `<script>` tags in order):
- `jquery.min.js` → `isotope.pkgd.min.js` → `bootstrap.min.js` → `simplebar.js` → `jquery.animatedheadline.min.js` → `jquery.easypiechart.js` → `tilt.js` → `main.js` → `mgGlitch.min.js`

`js/main.js` wires up: preloader, background music autoplay with fallback, portfolio isotope filter, mobile menu toggle, skill pie charts (easyPieChart), and portfolio tilt effect.

## Key Details

- **RTL layout**: `<html dir="rtl" lang="fa">` — all layout is right-to-left; use `margin-right`/`padding-right` (not left) for spacing adjustments.
- **Portfolio filter**: Items use CSS classes (`org`, `web`, `shop`) matched by Isotope via `data-filter` on the filter buttons.
- **Theme switching**: The `<link>` elements have class attributes (`.theme-st`, `.pos-nav`, `.box-bd`, `.box-st`, `.box-tl`, `.style-cl`) — these are hooks for a settings panel; swapping the `href` on these links changes the visual theme without touching the HTML structure.
- **Skill charts**: Progress bars use inline `style="width:XX%"`. Circular charts use `data-percent="XX"` on `.chart` divs, animated by easyPieChart on DOM ready.
- **Resume PDF**: Linked at `files/Mostafa-Keshvary-Resume.pdf` (not tracked in repo).
