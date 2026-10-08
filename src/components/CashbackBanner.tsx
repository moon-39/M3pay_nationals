import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface CashbackBannerProps {
  onNavigateToStores: () => void;
}

export const CashbackBanner: React.FC<CashbackBannerProps> = ({ onNavigateToStores }) => {
  return (
    <div
      onClick={onNavigateToStores}
      className="bg-gradient-to-l from-emerald-600 via-teal-700 to-teal-800 text-white rounded-3xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md active:scale-99 transition shadow-xs"
    >
      <div className="space-y-1">
        <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full border border-white/10">
          باشگاه مشتریان طلایی
        </span>
        <h3 className="text-xs sm:text-sm font-extrabold text-white">
          تا ۱۵٪ بازگشت وجه نقد در ۱۰ فروشگاه منتخب
        </h3>
        <p className="text-[11px] text-emerald-100">
          واریز آنی به کیف پول بدون قرعه‌کشی با خرید حضوری یا درگاه آنلاین
        </p>
      </div>

      <button className="bg-white text-emerald-900 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1 shadow-xs hover:bg-emerald-50 transition shrink-0 mr-2">
        <span>مشاهده</span>
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
};
