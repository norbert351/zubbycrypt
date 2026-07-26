'use client';

import { useState } from 'react';

type Tx = {
  id: string;
  type: 'sale' | 'purchase' | 'transfer';
  item: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
};

const sampleTxs: Tx[] = [
  { id: '1', type: 'sale', item: 'Nike Air Max 90', amount: '₦32,000', date: '2026-07-25', status: 'completed' },
  { id: '2', type: 'purchase', item: 'Off-White Hoodie', amount: '₦18,500', date: '2026-07-24', status: 'completed' },
  { id: '3', type: 'transfer', item: 'Yeezy 350 V2', amount: '₦28,000', date: '2026-07-23', status: 'pending' },
  { id: '4', type: 'sale', item: 'Supreme Box Logo Tee', amount: '₦45,000', date: '2026-07-22', status: 'completed' },
  { id: '5', type: 'purchase', item: 'Balenciaga Runner', amount: '₦19,200', date: '2026-07-21', status: 'cancelled' },
  { id: '6', type: 'sale', item: 'Essentials Hoodie', amount: '₦25,000', date: '2026-07-20', status: 'completed' },
];

const statusColor: Record<string, string> = {
  completed: 'text-[#34d399] bg-[#34d399]/10',
  pending: 'text-[#fb923c] bg-[#fb923c]/10',
  cancelled: 'text-[#f87171] bg-[#f87171]/10',
};

const typeIcon: Record<string, string> = {
  sale: '↑',
  purchase: '↓',
  transfer: '⇄',
};

const typeColor: Record<string, string> = {
  sale: 'text-[#34d399]',
  purchase: 'text-[#fb923c]',
  transfer: 'text-[#7c5cfc]',
};

export default function DashboardPage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? sampleTxs : sampleTxs.filter(t => t.type === filter);

  const stats = {
    totalSales: sampleTxs.filter(t => t.type === 'sale' && t.status === 'completed').length,
    totalRevenue: '₦102,000',
    pendingTxs: sampleTxs.filter(t => t.status === 'pending').length,
    activeItems: 12,
  };

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-5xl mx-auto w-full">
      {/* Page header — no duplicate nav here */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-[#8888a0] text-sm mt-1">Welcome back, Zubbycrypt</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {[
          { label: 'Sales', value: stats.totalSales.toString(), color: 'text-[#34d399]' },
          { label: 'Revenue', value: stats.totalRevenue, color: 'text-[#7c5cfc]' },
          { label: 'Pending', value: stats.pendingTxs.toString(), color: 'text-[#fb923c]' },
          { label: 'Listings', value: stats.activeItems.toString(), color: 'text-[#60a5fa]' },
        ].map((s) => (
          <div key={s.label} className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-4">
            <p className="text-[#8888a0] text-xs uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { key: 'all', label: 'All' },
          { key: 'sale', label: 'Sales' },
          { key: 'purchase', label: 'Purchases' },
          { key: 'transfer', label: 'Transfers' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filter === f.key
                ? 'bg-[#7c5cfc] text-white'
                : 'bg-[#1a1a26] text-[#8888a0] hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transactions list */}
      <div className="space-y-2">
        {filtered.map((tx) => (
          <div
            key={tx.id}
            className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-4 flex items-center justify-between hover:border-[#7c5cfc]/30 transition"
          >
            <div className="flex items-center gap-3">
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold ${typeColor[tx.type]} bg-[#1a1a26]`}>
                {typeIcon[tx.type]}
              </span>
              <div>
                <p className="text-sm font-medium">{tx.item}</p>
                <p className="text-xs text-[#8888a0]">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{tx.amount}</p>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[tx.status]}`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#8888a0] py-12 text-sm">No transactions found</p>
        )}
      </div>
    </div>
  );
}
