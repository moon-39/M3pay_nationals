import React, { useState } from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { INVESTMENT_FUNDS } from '../data/mockData';
import { InvestmentFund } from '../types';

interface InvestmentFundsCardProps {
  onSelectFund: (fund: InvestmentFund) => void;
}

export const InvestmentFundsCard: React.FC<InvestmentFundsCardProps> = ({ onSelectFund }) => {
  // ⬇️ state باز/بسته بودن - به صورت پیش‌فرض بسته است
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
      {/* 🔽 هدر قابل کلیک */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <h2 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>سرمایه‌گذاری مونس (صندوق‌ها)</span>
        </h2>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500 font-medium">سود روزشمار و مصون از تورم</span>
          {/* فلش چرخان */}
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* 🔽 توضیح کوتاه (وقتی بسته است) */}
      {!isOpen && (
        <p className="text-[11px] text-slate-500 leading-relaxed">
          برای مشاهده صندوق‌های طلا، نقره و درآمد ثابت کلیک کنید.
        </p>
      )}

      {/* 🔽 لیست صندوق‌ها - فقط وقتی بازه نمایش داده می‌شه */}
      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 animate-fadeIn">
          {INVESTMENT_FUNDS.map((fund) => (
            <div
              key={fund.id}
              className={`p-3 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                fund.id === 'fund-gold'
                  ? 'bg-amber-50/50 border-amber-200'
                  : fund.id === 'fund-silver'
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-blue-50/40 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{fund.title}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${fund.badgeColor}`}>
                  {fund.badge}
                </span>
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed">{fund.description}</p>

              <button
                onClick={() => onSelectFund(fund)}
                className={`w-full py-1.5 text-[11px] font-bold rounded-xl transition active:scale-98 cursor-pointer ${fund.buttonColor}`}
              >
                {fund.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};