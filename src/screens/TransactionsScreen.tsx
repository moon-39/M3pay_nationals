import React, { useState } from 'react';
import {
  BarChart3,
  Sparkles,
  ShoppingBag,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  Search,
  Package,
  Calendar
} from 'lucide-react';
import { TransactionItem } from '../types';

interface TransactionsScreenProps {
  transactions: TransactionItem[];
  onSelectTransaction: (tx: TransactionItem) => void;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  onSelectTransaction,
}) => {
  const [filter, setFilter] = useState<'all' | 'stores' | 'inflow' | 'outflow'>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = transactions.filter((tx) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'stores' && tx.category === 'store') ||
      (filter === 'inflow' && tx.type === 'inflow') ||
      (filter === 'outflow' && tx.type === 'outflow');

    const matchesSearch =
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.trackingCode.toLowerCase().includes(search.toLowerCase()) ||
      (tx.note && tx.note.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Calculate live totals
  const totalInflow = transactions
    .filter((t) => t.type === 'inflow')
    .reduce((acc, curr) => acc + curr.amount, 52000000);

  const totalOutflow = transactions
    .filter((t) => t.type === 'outflow')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalCashback = transactions.reduce((acc, curr) => acc + (curr.cashbackEarned || 0), 2450000);

  // Group by date
  const groups: { [key: string]: TransactionItem[] } = {};
  filtered.forEach((tx) => {
    const groupKey = tx.date.includes('امروز')
      ? 'امروز | سه‌شنبه ۲۴ آبان'
      : tx.date.includes('دیروز')
      ? 'دیروز | دوشنبه ۲۳ آبان'
      : 'روزهای پیشین';
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(tx);
  });

  const getCategoryIcon = (category: string, title: string) => {
    if (title.includes('دیجی‌کالا')) return <Package className="w-5 h-5 text-blue-600" />;
    if (category === 'store') return <ShoppingBag className="w-5 h-5 text-teal-600" />;
    if (category === 'transfer') return <ArrowDownLeft className="w-5 h-5 text-emerald-600" />;
    return <Receipt className="w-5 h-5 text-amber-600" />;
  };

  const getIconBg = (category: string, title: string) => {
    if (title.includes('دیجی‌کالا')) return 'bg-blue-50';
    if (category === 'store') return 'bg-teal-50';
    if (category === 'transfer') return 'bg-emerald-50';
    return 'bg-amber-50';
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Monthly Financial Overview Banner */}
      <div className="glass-card text-white p-5 rounded-3xl space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold flex items-center gap-1.5 text-slate-200">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>گردش مالی آبان ۱۴۰۳</span>
          </h2>
          <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-xl text-slate-300 border border-white/5">
            ۳۰ روز گذشته
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/35 p-3 rounded-2xl border border-white/5 backdrop-blur-xs">
            <span className="text-[11px] text-emerald-300 flex items-center gap-1 mb-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span>مجموع واریزها:</span>
            </span>
            <span className="text-base font-black text-white font-display">
              +۵۲,۰۰۰,۰۰۰ <span className="text-[10px] font-sans text-slate-400 font-normal">ریال</span>
            </span>
          </div>

          <div className="bg-black/35 p-3 rounded-2xl border border-white/5 backdrop-blur-xs">
            <span className="text-[11px] text-rose-300 flex items-center gap-1 mb-1">
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
              <span>مجموع برداشت‌ها:</span>
            </span>
            <span className="text-base font-black text-white font-display">
              -۳۸,۲۰۰,۰۰۰ <span className="text-[10px] font-sans text-slate-400 font-normal">ریال</span>
            </span>
          </div>
        </div>

        {/* Total Cashback Earned */}
        <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-200">پاداش نقدی کسب‌شده مونس (کش‌بک):</span>
          </div>
          <span className="text-xs font-black text-emerald-300 font-display">
            {totalCashback.toLocaleString('fa-IR')} ریال
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در صورت‌حساب، کد رهگیری، بابت..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pr-9 pl-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-bold transition cursor-pointer ${
            filter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          همه تراکنش‌ها
        </button>

        <button
          onClick={() => setFilter('stores')}
          className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            filter === 'stores'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          خرید از فروشگاه‌ها (۱۰)
        </button>

        <button
          onClick={() => setFilter('inflow')}
          className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            filter === 'inflow'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          واریزها
        </button>

        <button
          onClick={() => setFilter('outflow')}
          className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            filter === 'outflow'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          انتقال‌ها و خرید
        </button>
      </div>

      {/* Grouped Timeline */}
      <div className="space-y-4">
        {Object.keys(groups).length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            تراکنشی با فیلتر انتخاب شده یافت نشد.
          </div>
        ) : (
          Object.keys(groups).map((groupTitle) => (
            <div key={groupTitle} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{groupTitle}</span>
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {groups[groupTitle].length.toLocaleString('fa-IR')} تراکنش
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-xs">
                {groups[groupTitle].map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="p-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${getIconBg(tx.category, tx.title)} flex items-center justify-center`}>
                        {getCategoryIcon(tx.category, tx.title)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{tx.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {tx.categoryLabel} • {tx.time}
                        </p>
                        {tx.cashbackEarned && (
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded mt-1 inline-block">
                            + {tx.cashbackEarned.toLocaleString('fa-IR')} ریال کش‌بک
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-left">
                      <span
                        className={`text-xs font-bold block font-display ${
                          tx.type === 'inflow' ? 'text-emerald-600' : 'text-slate-900'
                        }`}
                      >
                        {tx.type === 'inflow' ? '+' : '-'} {tx.amount.toLocaleString('fa-IR')}{' '}
                        <span className="text-[10px] font-sans font-normal text-slate-400">ریال</span>
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">
                        {tx.statusLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
