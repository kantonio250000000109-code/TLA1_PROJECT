import React, { useState, useEffect } from 'react';

const CATEGORY_OPTIONS = ['Salary', 'Freelance', 'Investments', 'Gifts', 'Side Business', 'Other'];

export default function IncomeForm({ onSave, editingIncome, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingIncome) {
      setTitle(editingIncome.title);
      setAmount(editingIncome.amount);
      setCategory(editingIncome.category);
      setDate(editingIncome.date);
    } else {
      resetForm();
    }
  }, [editingIncome]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(CATEGORY_OPTIONS[0]);
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      alert('Please fill out all fields with valid data.');
      return;
    }

    onSave({
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    });

    resetForm();
  };

  return (
    <div className="form-card">
      <h2>{editingIncome ? '✏️ Edit Income Record' : '➕ Add Income Entry'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title / Source</label>
          <input 
            type="text" 
            placeholder="e.g., Web Development Project" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date Received</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required 
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            {editingIncome ? 'Update Entry' : 'Add Record'}
          </button>
          {editingIncome && (
            <button type="button" className="btn btn-cancel" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}