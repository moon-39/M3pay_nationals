import React from 'react';
import { CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { QuickBankingServices } from '../components/QuickBankingServices';
import { InvestmentFundsCard } from '../components/InvestmentFundsCard';
import { CashbackBanner } from '../components/CashbackBanner';
import { TabType, ForeignCitizenService, InvestmentFund } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenTransferMode: (mode: 'mounes' | 'card' | 'sheba') => void;
  onOpenBills: () => void;
  onOpenRecharge: () => void;
  onOpenCrypto: () => void;
  onOpenQr: () => void;
  onSelectForeignService: (service: ForeignCitizenService) => void;
  onSelectFund: (fund: InvestmentFund) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onOpenTransferMode,
  onOpenBills,
  onOpenRecharge,
  onOpenCrypto,
  onOpenQr,
  onSelectForeignService,
  onSelectFund,
}) => {
  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
            سلام کاربر عزیز ✨
          </h1>
          <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>حساب تایید شده سطح طلایی</span>
          </p>
        </div>

        <button
          onClick={() => alert('تنظیمات امنیتی و نمایش صفحه اصلی')}
          aria-label="شخصی‌سازی صفحه"
          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* خدمات پرکاربرد */}
      <QuickBankingServices
        onNavigateTab={onNavigateTab}
        onOpenTransferMode={onOpenTransferMode}
        onOpenBills={onOpenBills}
        onOpenRecharge={onOpenRecharge}
        onOpenCrypto={onOpenCrypto}
        onOpenQr={onOpenQr}
        onSelectForeignService={onSelectForeignService}
      />

      {/* سرمایه‌گذاری مونس (صندوق‌های طلا، نقره و درآمد ثابت) */}
      <InvestmentFundsCard onSelectFund={onSelectFund} />

      {/* بنر باشگاه مشتریان و ۱۰ فروشگاه */}
      <CashbackBanner onNavigateToStores={() => onNavigateTab('stores')} />
    </div>
  );
};