# Finals TLA 1 – React JS Declarative Refactor Sprint: Income Category Ledger

This repository contains a modular, state-driven React application refactored from our Midterm Vanilla DOM Income Ledger codebase, created for **Finals TLA 1**.

- **Framework**: React 18 + Vite
- **State Architecture**: Declarative React Hooks (`useState`, `useEffect`, `useMemo`)
- **Deployment**: Vercel

---

## 🛠️ Architecture & Features Built

1. **Declarative State Management**:
   - Replaced imperative vanilla JS (`document.getElementById`, `.innerHTML +=`, `addEventListener`) with single-source-of-truth React state (`useState`).
   - Automated persistent storage synchronized via `localStorage` side-effects (`useEffect`).
2. **Modular Component Structure**:
   - `App.jsx`: Top-level orchestrator holding shared ledger state and cross-component handler logic.
   - `IncomeForm.jsx`: Dynamic dual-mode form component supporting both entry creation and record updates.
   - `SummaryCards.jsx`: Displays total income, highest income source, and entry count dynamically derived using `useMemo`.
   - `CategoryFilter.jsx`: Multi-criteria filter system allowing category filtering and instant title query matching.
   - `LedgerTable.jsx`: Clean list display rendering ledger data with inline edit and delete actions.
   - `CategoryBreakdown.jsx`: Interactive visual progress representation of overall income distribution across categories.

---

## 🤖 AI Implementation & Code Defense Strategy

### 1. What AI Helped Build & Refactor
- **Vanilla DOM to React Translation**: AI assisted in refactoring dynamic DOM node building (`tr` dynamic row insertion, manual input parsing) into React array mapping (`incomes.map(...)`).
- **Form State Dual-Binding**: Developed a clean system in `IncomeForm.jsx` that populates form inputs when an edit action triggers, allowing both new entry additions and existing record mutations within a single input form interface.
- **Computed Value Optimization**: Implemented `useMemo` hooks to prevent redundant calculation loops for financial metrics, search filtering, and category distribution percentages on un-related render cycles.

---

### 2. Code Defense & Underlying React Logic

#### A. Transitioning from Imperative DOM to Declarative React State
- **Midterm Vanilla DOM Baseline**:
  In the Midterm vanilla implementation, modifying income items required manual element selection, direct string concatenation to `innerHTML`, and explicitly registering click event listeners to dynamic DOM elements.
- **React Declarative Approach**:
  In React, user interactions mutate the top-level state array (`incomes`). React’s Virtual DOM calculates the diffing automatically and re-renders only the changed DOM nodes.

```jsx
// Declarative state update in React
const handleAddOrUpdate = (incomeData) => {
  if (editingIncome) {
    setIncomes(prev =>
      prev.map(item => item.id === editingIncome.id ? { ...incomeData, id: item.id } : item)
    );
  } else {
    setIncomes(prev => [{ ...incomeData, id: Date.now().toString() }, ...prev]);
  }
};