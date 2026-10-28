# ERP Lite

A small, fast ERP built with **React (Vite) + Express/Node**. There is **no database** — all data is stored in the browser's `localStorage`, so it works out of the box.

## Modules

| Module | Route | What it does |
| --- | --- | --- |
| Dashboard | `/` | Revenue, orders, customers, stock value, low-stock list |
| Sales Orders | `/orders` | Create orders, change status, delete |
| Inventory | `/inventory` | Product CRUD with stock badges |
| Customers | `/customers` | Customer CRUD |
| Employees | `/employees` | Employee CRUD |

Demo login: `admin@erp.com` / `admin123`

## Run it

```bash
npm run install:all   # installs root, server and client deps
npm run dev           # client on :5173, API on :5000
```

Production-style run (Express serves the built React app):

```bash
npm start             # http://localhost:5000
```

## Project structure

```
erp-lite/
├── server/               # Express API (health + meta only, no DB)
└── client/src/
    ├── components/CrudPage.jsx   # reusable list + add/edit/delete page
    ├── hooks/useLocalStorage.js  # localStorage-backed state
    ├── data/seed.js              # storage keys + demo data
    └── pages/                    # Dashboard, Orders, Inventory, ...
```

## Contributing

Found a bug or want to add a feature? Open an issue, then a pull request. Reset demo data any time by clearing localStorage in your browser's dev tools.
