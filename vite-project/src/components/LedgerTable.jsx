import React from 'react';

const CATEGORY_COLORS = {
  Salary: '#818cf8',
  Freelance: '#34d399',
  Investments: '#f59e0b',
  Gifts: '#ec4899',
  'Side Business': '#38bdf8',
  Other: '#a78bfa'
};

export default function LedgerTable({ incomes, onEdit, onDelete }) {
  return (
    <div className="card-panel" style={{ overflowX: 'auto', padding: '0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#ffffff' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#0f172a' }}>
            <th style={{ padding: '16px', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Date</th>
            <th style={{ padding: '16px', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Title / Source</th>
            <th style={{ padding: '16px', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Category</th>
            <th style={{ padding: '16px', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Amount</th>
            <th style={{ padding: '16px', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                No records match your criteria.
              </td>
            </tr>
          ) : (
            incomes.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '16px', fontSize: '0.85rem', color: '#cbd5e1' }}>{item.date}</td>
                <td style={{ padding: '16px', fontSize: '0.9rem', fontWeight: '600' }}>{item.title}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: (CATEGORY_COLORS[item.category] || '#94a3b8') + '22',
                    color: CATEGORY_COLORS[item.category] || '#94a3b8',
                    border: `1px solid ${CATEGORY_COLORS[item.category] || '#94a3b8'}44`
                  }}>
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '0.95rem', fontWeight: '700', color: '#10b981' }}>
                  +${Number(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button
                    onClick={() => onEdit(item)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginRight: '12px' }}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
