import React from 'react';

export default function SummaryCards({ incomes }) {
  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const categoryTotals = incomes.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount || 0);
    return acc;
  }, {});

  let topCategory = 'N/A';
  let maxAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCategory = cat;
    }
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      <div className="card-panel" style={{ textAlign: 'center', padding: '20px' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
          Total Enterprise Revenue
        </span>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#10b981', marginTop: '8px' }}>
          ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div className="card-panel" style={{ textAlign: 'center', padding: '20px' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
          Top Performing Stream
        </span>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#818cf8', marginTop: '8px' }}>
          {topCategory}
        </div>
      </div>

      <div className="card-panel" style={{ textAlign: 'center', padding: '20px' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
          Total Transactions
        </span>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#f59e0b', marginTop: '8px' }}>
          {incomes.length}
        </div>
      </div>
    </div>
  );
}
