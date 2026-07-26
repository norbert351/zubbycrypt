'use client';

import { useState } from 'react';

type TransferType = 'send' | 'request';

export default function TransferPage() {
  const [mode, setMode] = useState<TransferType>('send');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const recentTransfers = [
    { to: 'Chidi O.', item: 'Yeezy 350 V2', amount: '₦28,000', date: 'Jul 23', status: 'pending' },
    { to: 'Amara K.', item: 'Nike Dunks Low', amount: '₦22,000', date: 'Jul 19', status: 'completed' },
    { to: 'Tunde B.', item: 'Essentials Hoodie', amount: '₦25,000', date: 'Jul 18', status: 'completed' },
  ];

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-3xl mx-auto w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Transfer</h1>
      <p className="text-[#8888a0] text-sm mb-8">Send or request payments</p>

      {/* Mode toggle */}
      <div className="flex bg-[#12121a] rounded-xl border border-[#2a2a3a] p-1 mb-6 w-fit">
        {(['send', 'request'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              mode === m ? 'bg-[#7c5cfc] text-white' : 'text-[#8888a0] hover:text-white'
            }`}
          >
            {m === 'send' ? 'Send' : 'Request'}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-4 md:p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#8888a0] uppercase tracking-wide mb-1.5 block">
              {mode === 'send' ? 'Recipient' : 'From'}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="Username or wallet address"
              className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#5555] outline-none focus:border-[#7c5cfc] transition"
            />
          </div>
          <div>
            <label className="text-xs text-[#8888a0] uppercase tracking-wide mb-1.5 block">Amount (NGN)</label>
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#5555] outline-none focus:border-[#7c5cfc] transition"
            />
          </div>
          <button
            className="w-full bg-[#7c5cfc] hover:bg-[#6a4ae8] text-white font-medium rounded-lg py-3 text-sm transition"
            onClick={() => alert(`${mode === 'send' ? 'Sent' : 'Requested'} ₦${amount || '0'} ${mode === 'send' ? 'to' : 'from'} ${recipient || 'unknown'}`)}
          >
            {mode === 'send' ? 'Send Payment' : 'Request Payment'}
          </button>
        </div>
      </div>

      {/* Recent transfers */}
      <h2 className="text-sm font-medium text-[#8888a0] uppercase tracking-wide mb-3">Recent Transfers</h2>
      <div className="space-y-2">
        {recentTransfers.map((t, i) => (
          <div key={i} className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg flex items-center justify-center text-base bg-[#1a1a26] text-[#7c5cfc]">⇄</span>
              <div>
                <p className="text-sm font-medium">{t.to}</p>
                <p className="text-xs text-[#8888a0]">{t.item} &middot; {t.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{t.amount}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-block ${
                t.status === 'completed' ? 'text-[#34d399] bg-[#34d399]/10' : 'text-[#fb923c] bg-[#fb923c]/10'
              }`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
