# Little Journey

An interactive birthday card — calm, cozy, and a little magical.

<p>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-0b0b12?style=for-the-badge&logo=vite&logoColor=FFD54A&labelColor=0b0b12&color=1b1b28">
  <img alt="React" src="https://img.shields.io/badge/React-19-0b0b12?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0b0b12&color=1b1b28">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-0b0b12?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=0b0b12&color=1b1b28">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-0b0b12?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8&labelColor=0b0b12&color=1b1b28">
</p>

<svg width="840" height="120" viewBox="0 0 840 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Little Journey header">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbbf24" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="#f43f5e" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#a855f7" stop-opacity="0.85"/>
    </linearGradient>
    <radialGradient id="r" cx="50%" cy="30%" r="75%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur" x="-30%" y="-200%" width="160%" height="500%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="840" height="120" rx="22" fill="#05050a"/>
  <path d="M32 92 C 210 10, 420 140, 808 40" stroke="url(#g)" stroke-width="10" stroke-linecap="round" opacity="0.22" filter="url(#blur)"/>
  <rect x="16" y="16" width="808" height="88" rx="18" fill="url(#r)" opacity="0.9"/>
  <g fill="#ffffff" opacity="0.55">
    <circle cx="70" cy="44" r="1.5"/><circle cx="114" cy="66" r="1"/><circle cx="158" cy="46" r="1"/>
    <circle cx="690" cy="54" r="1.5"/><circle cx="736" cy="72" r="1"/><circle cx="782" cy="50" r="1"/>
  </g>
  <text x="50%" y="57" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="16" fill="#e7e5e4" opacity="0.92" letter-spacing="2.8">
    A SMALL INTERACTIVE BIRTHDAY CARD
  </text>
  <text x="50%" y="83" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#ffffff" opacity="0.96">
    Little Journey
  </text>
</svg>

## Features

- Animated, atmospheric backgrounds
- Interactive timeline cards
- Hidden gifts mini-game
- Mobile-first layout

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

This project is configured for GitHub Pages (see `vite.config.ts` `base`).
