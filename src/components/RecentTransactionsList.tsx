import React from 'react';
import { ShoppingBag, ArrowUpRight, Utensils } from 'lucide-react';
import { TransactionItem } from '../types';

interface RecentTransactionsListProps {
  transactions: TransactionItem[];
  onViewAll: () => void;
  onSelectTransaction: (tx: TransactionItem) => void;
}

export const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  transactions,
  onViewAll,
  onSelectTransaction,
}) => {
  const recentItems = transactions.slice(0, 3);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'store':
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'transfer':
        return <ArrowUpRight className="w-5 h-5 text-blue-600" />;
      case 'bill':
      default:
        return <Utensils className="w-5 h-5 text-rose-600" />;
    }
  };

  const getIconContainerBg = (category: string) => {
    switch (category) {
      case 'store':
        return 'bg-emerald-50';
      case 'transfer':
        return 'bg-blue-50';
      default:
        return 'bg-rose-50';
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span>آخرین تراکنش‌ها</span>
        </h2>
        <button
          onClick={onViewAll}
          className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold transition"
        >
          مشاهده تمام تراکنش‌ها
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-xs">
        {recentItems.map((tx) => (
          <div
            key={tx.id}
            onClick={() => onSelectTransaction(tx)}
            className="p-3 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${getIconContainerBg(tx.category)} flex items-center justify-center`}>
                {getCategoryIcon(tx.category)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{tx.title}</h4>
                <span className="text-[10px] text-slate-400">
                  {tx.category === 'transfer'
                    ? 'مونس به مونس (بدون کارمزد)'
                    : tx.title.includes('رفاه')
                    ? 'خرید حضوری با کد مونس • ۲۴ آبان'
                    : 'خرید اینترنتی مستقیم'}
                </span>
              </div>
            </div>

            <div className="text-left">
              <span className="text-xs font-bold text-slate-900 block font-display">
                - {tx.amount.toLocaleString('fa-IR')}{' '}
                <span className="text-[10px] font-sans font-normal text-slate-400">ریال</span>
              </span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                  tx.category === 'transfer'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-emerald-600 bg-emerald-50'
                }`}
              >
                {tx.category === 'transfer' ? 'برداشت وجه' : 'تراکنش موفق'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
