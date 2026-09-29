import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Salary', 'Freelance', 'Investments', 'Gifts', 'Side Business', 'Other'];

export default function IncomeForm({ onSave, editingIncome, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Salary');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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
    setCategory('Salary');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onSave({
      title,
      amount: parseFloat(amount),
      category,
      date
    });

    resetForm();
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: '6px'
  };

  return (
    <div className="card-panel">
      <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#ffffff' }}>
        {editingIncome ? '✏️ Update Transaction' : '➕ Add Income Entry'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Title / Revenue Source</label>
          <input
            type="text"
            placeholder="e.g., Enterprise Web Consulting"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Amount ($)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Date Received</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          {editingIncome ? 'Save Changes' : 'Record Entry'}
        </button>

        {editingIncome && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{
              width: '100%',
              marginTop: '8px',
              backgroundColor: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              padding: '10px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
