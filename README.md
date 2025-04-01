# 📚 Bookme Monorepo

Welcome to the **Bookme** monorepo — a modern eBook platform for reading, buying, and managing books. Built with cutting-edge tools like **Next.js**, **Turborepo**, **Redux**, and **TypeScript**, this repository contains the client website, book reader, and admin panel.

---

## 📦 Repository Structure

```
frontend/
├── apps/
│   ├── store/        # Public-facing client website
│   ├── reader/       # Book reader (only for logged-in users)
│   └── admin/        # Admin panel (restricted access)
├── packages/
│   ├── ui/           # Shared UI components (React)
│   ├── lib/          # Helpers, Redux slices, API logic
│   └── config/       # Shared configurations (eslint, prettier, tsconfig, etc.)
├── turbo.json        # Turborepo configuration
├── package.json      # Root package.json with workspaces
└── tsconfig.json     # Base TypeScript config
```

---

## ✨ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development

```bash
npm run dev
```

### 3. Build all apps and packages

```bash
npm run build
```

---

## ⚙️ Technologies

- **Next.js** — SSR/ISR, App Router, Dynamic import
- **Turborepo** — High-speed monorepo orchestration
- **Redux Toolkit** — Centralized state management
- **TypeScript** — Static type checking

---

## 💡 Bookme Features

- 📖 Read purchased books directly on site
- 🛒 Add books to favorites and cart
- 🧑‍💻 Auth via Email and Google, secure refresh tokens
- 📚 Book and order management in the admin panel
- 🤖 Role-based access: User, Moderator, Admin
- ⚡ Client-side and RTK Query caching

---

## ☁️ Remote Caching (Optional)

Use [Vercel Remote Cache](https://turbo.build/repo/docs/core-concepts/remote-caching) for faster CI builds:

```bash
npx turbo login
npx turbo link
```

---

## 🔗 Useful Links

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Next.js Docs](https://nextjs.org/docs)

---

> Made with ❤️ by Misha & Bookme Dev Team