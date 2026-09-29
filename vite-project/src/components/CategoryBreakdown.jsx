import React from 'react';

export default function CategoryBreakdown({ incomes }) {
  const total = incomes.reduce((sum, item) => sum + Number(item.amount), 0);

  const breakdown = incomes.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  return (
    <div className="breakdown-card">
      <h3>📊 Category Distribution</h3>
      {Object.keys(breakdown).length === 0 ? (
        <p className="text-muted">No data available.</p>
      ) : (
        <div className="bars-list">
          {Object.entries(breakdown).map(([category, amount]) => {
            const pct = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
            return (
              <div key={category} className="bar-item">
                <div className="bar-info">
                  <span>{category}</span>
                  <span>${amount.toFixed(2)} ({pct}%)</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}