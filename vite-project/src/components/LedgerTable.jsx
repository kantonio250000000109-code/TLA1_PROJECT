import React from 'react';

export default function LedgerTable({ incomes, onEdit, onDelete }) {
  if (incomes.length === 0) {
    return (
      <div className="table-card empty-state">
        <p>No income records match your filters.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <table className="ledger-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td className="font-semibold">{item.title}</td>
              <td><span className="category-badge">{item.category}</span></td>
              <td className="amount-text">+${Number(item.amount).toFixed(2)}</td>
              <td className="action-buttons">
                <button className="btn-icon edit" onClick={() => onEdit(item)} title="Edit">✏️</button>
                <button className="btn-icon delete" onClick={() => onDelete(item.id)} title="Delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}