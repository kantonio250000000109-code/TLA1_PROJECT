import React, { useState, useEffect } from 'react';
import './App.css';
import SummaryCards from './components/SummaryCards';
import IncomeForm from './components/IncomeForm';
import CategoryFilter from './components/CategoryFilter';
import LedgerTable from './components/LedgerTable';
import CategoryBreakdown from './components/CategoryBreakdown';

const INITIAL_DATA = [
  { id: '1', title: 'Monthly Corporate Salary', amount: 3500.00, category: 'Salary', date: '2026-09-15' },
  { id: '2', title: 'Freelance Web System Refactor', amount: 1500.00, category: 'Freelance', date: '2026-09-01' },
  { id: '3', title: 'Dividend Payout', amount: 250.00, category: 'Investments', date: '2026-09-20' }
];

export default function App() {
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('enterprise_incomes');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    localStorage.setItem('enterprise_incomes', JSON.stringify(incomes));
  }, [incomes]);

  const handleSaveIncome = (incomeData) => {
    if (editingIncome) {
      setIncomes(prev => prev.map(item => item.id === editingIncome.id ? { ...incomeData, id: item.id } : item));
      setEditingIncome(null);
    } else {
      setIncomes(prev => [{ ...incomeData, id: Date.now().toString() }, ...prev]);
    }
  };

  const handleDelete = (id) => {
    setIncomes(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
  };

  const filteredIncomes = incomes.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="enterprise-container">
      <header className="enterprise-header">
        <h1 className="enterprise-title">💎 Enterprise Revenue Ledger</h1>
        <p className="enterprise-subtitle">Finals TLA 1: React JS Declarative Architecture Refactor</p>
      </header>

      <SummaryCards incomes={incomes} />

      <div className="dashboard-grid">
        <div>
          <IncomeForm
            onSave={handleSaveIncome}
            editingIncome={editingIncome}
            onCancelEdit={() => setEditingIncome(null)}
          />
          <CategoryBreakdown incomes={incomes} />
        </div>

        <div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <LedgerTable
            incomes={filteredIncomes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
