import React, { useMemo } from 'react';

export default function SummaryCards({ incomes }) {
  const stats = useMemo(() => {
    const total = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
    const count = incomes.length;

    const categoryTotals = incomes.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
      return acc;
    }, {});

    let topCategory = 'N/A';
    let maxAmt = 0;
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > maxAmt) {
        maxAmt = amt;
        topCategory = cat;
      }
    });

    return { total, count, topCategory };
  }, [incomes]);

  return (
    <div className="summary-cards-grid">
      <div className="card card-primary">
        <h3>Total Income</h3>
        <p className="card-value">${stats.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </div>
      <div className="card card-secondary">
        <h3>Top Category</h3>
        <p className="card-value">{stats.topCategory}</p>
      </div>
      <div className="card card-accent">
        <h3>Total Entries</h3>
        <p className="card-value">{stats.count}</p>
      </div>
    </div>
  );
}