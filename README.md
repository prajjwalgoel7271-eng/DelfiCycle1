# DelfiCycle Studio — Independent Full Project

A complete independent React/Vite implementation of the DelfiCycle Studio concept. It is **not the private source code or database of the Lovable project**; it is a standalone rebuild with its own editable data and local browser database.

## Included

- React + Vite app
- Responsive landing page and navigation
- Design-thinking/process section
- DIY Learning Hub with tutorial modals
- Tutorial completion + EcoCoins
- Weekly challenge submissions + EcoCoins
- Marketplace with search/category filters
- Local cart with quantity controls
- Simulated checkout + EcoCoin rewards
- School merchandise section
- Impact dashboard
- Six-person studio/team section
- Local EcoBuddy assistant
- Contact form saved to local database
- Seed database at `src/data/database.json`
- Persistence layer at `src/lib/storage.js`
- Local SVG logo/favicon assets
- No real payment processing
- No external backend required

## Run it

Install Node.js 18+.

```bash
npm install
npm run dev
```

Then open the localhost address printed by Vite.

For a production build:

```bash
npm run build
npm run preview
```

## Local database

This prototype uses the browser's `localStorage` as its working local database. The seed content is stored in `src/data/database.json`.

Persisted collections include:

- cart
- EcoCoin balance
- EcoCoin activity
- completed tutorials
- challenge submissions
- contact messages

To reset all locally saved data, open the browser console and run:

```js
Object.keys(localStorage).filter(k => k.startsWith('delficycle:')).forEach(k => localStorage.removeItem(k));
location.reload();
```

## Moving to a real backend later

The UI is deliberately separated from `src/lib/storage.js`, so the local persistence layer can later be replaced with Supabase, Firebase, SQLite + API, or another backend. Do not put real payment credentials in the frontend.
