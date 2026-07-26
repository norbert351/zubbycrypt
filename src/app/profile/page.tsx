'use client';

export default function ProfilePage() {
  const stats = [
    { label: 'Items Sold', value: '28' },
    { label: 'Items Bought', value: '15' },
    { label: 'Rating', value: '4.8 ⭐' },
    { label: 'Member Since', value: '2024' },
  ];

  const recentActivity = [
    { action: 'Sold', item: 'Nike Air Max 90', amount: '₦32,000', date: 'Jul 25' },
    { action: 'Bought', item: 'Off-White Hoodie', amount: '₦18,500', date: 'Jul 24' },
    { action: 'Listed', item: 'Jordan 4 Retro', amount: '₦38,000', date: 'Jul 23' },
    { action: 'Sold', item: 'Supreme Box Logo', amount: '₦45,000', date: 'Jul 22' },
  ];

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-3xl mx-auto w-full">
      {/* Profile header */}
      <div className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-2xl text-[#7c5cfc] font-bold">
            Z
          </div>
          <div>
            <h1 className="text-xl font-bold">Zubbycrypt</h1>
            <p className="text-xs text-[#8888a0]">@zubbycrypt &middot; Premium Reseller</p>
          </div>
        </div>
        <button className="bg-[#7c5cfc] hover:bg-[#6a4ae8] text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          Edit Profile
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-4 text-center">
            <p className="text-lg font-bold">{s.value}</p>
            <p className="text-[10px] text-[#8888a0] uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <h2 className="text-sm font-medium text-[#8888a0] uppercase tracking-wide mb-3">Recent Activity</h2>
      <div className="space-y-2">
        {recentActivity.map((a, i) => (
          <div key={i} className="bg-[#12121a] rounded-xl border border-[#2a2a3a] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                a.action === 'Sold' ? 'text-[#34d399]' : a.action === 'Bought' ? 'text-[#fb923c]' : 'text-[#60a5fa]'
              } bg-[#1a1a26]`}>
                {a.action === 'Sold' ? '↑' : a.action === 'Bought' ? '↓' : '→'}
              </span>
              <div>
                <p className="text-sm font-medium">{a.item}</p>
                <p className="text-xs text-[#8888a0]">{a.date}</p>
              </div>
            </div>
            <p className="text-sm font-semibold">{a.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
