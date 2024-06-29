# Admin Dashboard

This is a basic admin dashboard.

## Demo

https://antd-dashboard-xi.vercel.app

## Run Locally

Clone the project

```bash
  git clone https://github.com/FardinOA/antd-dashboard.git
```

Go to the project directory

```bash
  cd antd-dashboard
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Project structure for this App

```
├── public
│ ├── index.html
│ └── favicon.ico
├── src
│ ├── assets
│ │ └── ...
│ ├── components
│ │ ├── Auth
│ │ ├── layout
│ │ │ └── Main.tsx
│ │ └── pages
│ │ ├── Dashboard
│ │ └── Products
│ │ └── index.tsx
│ ├── lib
│ │ └── store
│ │ ├── features_products
│ │ │ ├── productsApi.ts
│ │ │ ├── productSlice.ts
│ │ │ └── apiSlice.ts
│ │ ├── hooks.ts
│ │ └── index.ts
│ ├── types/
│ │ └── product.d.ts
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx
├── .gitignore
├── package.json
├── README.md
└── vite.config.ts
```
