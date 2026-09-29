# Finals TLA 1 – Enterprise Revenue & Income Category Ledger

An enterprise-grade, declarative React application refactored from a Vanilla JS imperative baseline. Built with modern component composition, reactive state management, persistent client storage (`localStorage`), and responsive enterprise UI layout.

---

## 🛠️ Architecture & Features

- **Declarative State Flow**: High-level state management in `App.jsx` passing props down to isolated presentation components.
- **Persistent Data**: Local storage integration ensures revenue records persist across browser reloads.
- **Real-Time Analytics**: Reactive metrics calculated instantly on state updates (Total Revenue, Top Category, Transaction Count, Category % Breakdown).
- **Multi-Category System**: Dynamic filtering for **Salary**, **Freelance**, **Investments**, **Gifts**, **Side Business**, and **Other**.
- **Full CRUD Capabilities**: Instant creation, real-time title search, category filtering, updating, and removal of transactions.

---

## 🤖 AI Implementation & Code Defense Strategy

### 1. Refactoring Strategy (Imperative to Declarative)
- **Midterm Vanilla DOM Baseline**: Direct string concatenation via `innerHTML` and imperative element selection with standard event listeners.
- **React Declarative Approach**: Top-level array state (`incomes`) driving the Virtual DOM diffing engine to re-render modified nodes automatically.

### 2. Architectural Highlights
- **`App.jsx` Orchestrator**: Manages state, filters data based on search/category selection, and handles `localStorage` synchronization.
- **Component Isolation**: Form, Summary, Filters, Breakdown, and Table exist as modular, reusable components with strict single-responsibility boundaries.

---

## 🚀 Execution & Deployment

### Local Development
```bash
npm install
npm run dev
