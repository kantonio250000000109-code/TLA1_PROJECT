import React from 'react';

export default function CategoryBreakdown({ incomes }) {
  const total = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const categories = ['Salary', 'Freelance', 'Investments', 'Gifts', 'Side Business', 'Other'];

  const breakdown = categories.map((cat) => {
    const amount = incomes
      .filter((item) => item.category === cat)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
    return { cat, amount, percentage };
  });

  return (
    <div className="card-panel" style={{ marginTop: '24px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#ffffff' }}>
        📊 Category Allocation Breakdown
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {breakdown.map(({ cat, amount, percentage }) => (
          <div key={cat}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: '#cbd5e1' }}>{cat}</span>
              <span style={{ fontWeight: '600', color: '#ffffff' }}>
                ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({percentage}%)
              </span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#0f172a', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${percentage}%`,
                backgroundColor: '#6366f1',
                height: '100%',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
