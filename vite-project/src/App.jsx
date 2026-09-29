import React, { useState, useEffect, useMemo } from 'react';
import SummaryCards from './components/SummaryCards';
import IncomeForm from './components/IncomeForm';
import CategoryFilter from './components/CategoryFilter';
import LedgerTable from './components/LedgerTable';
import CategoryBreakdown from './components/CategoryBreakdown';
import './App.css';

const DEFAULT_INCOMES = [
  { id: '1', title: 'Freelance Web Design', amount: 1500, category: 'Freelance', date: '2026-09-01' },
  { id: '2', title: 'Monthly Salary', amount: 3500, category: 'Salary', date: '2026-09-15' },
  { id: '3', title: 'Dividend Payout', amount: 250, category: 'Investments', date: '2026-09-20' },
];

export default function App() {
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('income_ledger_data');
    return saved ? JSON.parse(saved) : DEFAULT_INCOMES;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    localStorage.setItem('income_ledger_data', JSON.stringify(incomes));
  }, [incomes]);

  const handleAddOrUpdate = (incomeData) => {
    if (editingIncome) {
      setIncomes(prev =>
        prev.map(item => item.id === editingIncome.id ? { ...incomeData, id: item.id } : item)
      );
      setEditingIncome(null);
    } else {
      const newEntry = { ...incomeData, id: Date.now().toString() };
      setIncomes(prev => [newEntry, ...prev]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setIncomes(prev => prev.filter(item => item.id !== id));
      if (editingIncome?.id === id) setEditingIncome(null);
    }
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
  };

  const cancelEdit = () => {
    setEditingIncome(null);
  };

  const filteredIncomes = useMemo(() => {
    return incomes.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [incomes, selectedCategory, searchQuery]);

  const categories = useMemo(() => {
    const set = new Set(incomes.map(i => i.category));
    return ['All', ...Array.from(set)];
  }, [incomes]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💵 Income Category Ledger</h1>
        <p>Finals TLA 1: React JS Declarative Refactor</p>
      </header>

      <main className="app-grid">
        <section className="left-panel">
          <IncomeForm 
            onSave={handleAddOrUpdate} 
            editingIncome={editingIncome} 
            onCancelEdit={cancelEdit} 
          />
          <CategoryBreakdown incomes={incomes} />
        </section>

        <section className="right-panel">
          <SummaryCards incomes={incomes} />
          
          <CategoryFilter 
            categories={categories}
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
        </section>
      </main>
    </div>
  );
}