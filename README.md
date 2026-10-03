# AutoShowroom

A premium, reusable automotive showroom demo built with Next.js, React and TypeScript.

**Live Demo:** https://autoshowroom-tan.vercel.app/de  
**English Demo:** https://autoshowroom-tan.vercel.app/en

## Overview

AutoShowroom is a portfolio and client-demo project for modern car dealerships. It combines a polished responsive interface with immersive vehicle presentation, bilingual content and practical customer enquiry flows.

The current dealership details, contact information and inventory are demo data and can be customized for a real automotive business.

## Features

- Premium responsive showroom interface
- German and English localization
- Interactive 360° exterior vehicle viewer
- Immersive 360° interior panorama powered by Three.js
- Vehicle gallery with fullscreen viewing
- Detailed vehicle specification pages
- Test-drive request workflow
- Financing enquiry workflow
- Direct WhatsApp contact
- Services and contact pages
- Responsive mobile navigation
- SEO metadata and Open Graph support
- Custom AutoShowroom branding

## 360° Vehicle Experience

The Mercedes-Benz demo vehicle includes a 36-frame interactive exterior rotation with mouse and touch drag controls, plus an immersive interior panorama. The experience is integrated directly into the vehicle detail page.

## Tech Stack

- Next.js 16
- React
- TypeScript
- Three.js
- Tailwind CSS
- React Icons
- App Router
- Next.js Font Optimization

## Main Routes

```text
/de
/en
/[locale]/cars/[slug]
/[locale]/services
/[locale]/contact
/[locale]/test-drive
/[locale]/financing
```

## Run Locally

```bash
git clone https://github.com/malshaheri/autoshowroom.git
cd autoshowroom
npm install
npm run dev
```

Open http://localhost:3000 — the root route redirects to the German version.

For a production build:

```bash
npm run build
npm start
```

## Project Purpose

This project was created as a reusable automotive showroom concept for my professional developer portfolio. It demonstrates responsive frontend development, internationalization, interactive media experiences and practical dealership enquiry workflows.

## Developer

**Mohammed Alshaheri**  
Full-Stack Developer · Ludwigshafen am Rhein, Germany

- Portfolio: https://malshaheri.de
- GitHub: https://github.com/malshaheri
- LinkedIn: https://www.linkedin.com/in/alshaheri/

---

Built with Next.js, TypeScript and Three.js.
