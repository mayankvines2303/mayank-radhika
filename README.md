# Mayank & Radhika — private memories site

React + Vite. No backend.

## Edit your content
Everything personal is in **`src/config.js`**: profile photos, meetup titles, dates, locations,
descriptions, photo lists and the wedding poster path. Image/video files live in `public/images/`.

To add your real profile photos: drop them in `public/images/profiles/` and change the `image`
path of Mayank / Radhika in `src/config.js`.

## Run / build
    npm install
    npm run dev       # local preview
    npm run build     # production site → dist/  (upload the dist folder to Netlify, Vercel, GitHub Pages…)
    npm run preview   # serve the built site locally

Note: open the built site through a web server (or any host) — double-clicking dist/index.html
won't work because browsers block module scripts on file:// pages.
