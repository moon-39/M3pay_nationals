import React from 'react';
import {
  ArrowLeftRight,
  Zap,
  QrCode,
  Receipt,
  Radio,
  Store,
  FileText,
  Wallet,
  Smartphone,
  Cross,
  GraduationCap
} from 'lucide-react';
import { TabType, ForeignCitizenService } from '../types';
import { FOREIGN_CITIZEN_SERVICES } from '../data/mockData';

interface QuickBankingServicesProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenTransferMode: (mode: 'mounes' | 'card' | 'sheba') => void;
  onOpenBills: () => void;
  onOpenRecharge: () => void;
  onOpenCrypto: () => void;
  onOpenQr: () => void;
  onSelectForeignService: (service: ForeignCitizenService) => void;  // ← جدید
}

export const QuickBankingServices: React.FC<QuickBankingServicesProps> = ({
  onNavigateTab,
  onOpenTransferMode,
  onOpenBills,
  onOpenRecharge,
  onOpenCrypto,
  onOpenQr,
  onSelectForeignService,
}) => {
  // ⬇️ ۳ خدمت آخر اتباع (سیم‌کارت، درمان، آموزش)
  const foreignExtraServices = FOREIGN_CITIZEN_SERVICES.slice(2);

  const getForeignIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Cross': return <Cross className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const getForeignIconBg = (type: string) => {
    switch (type) {
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'rose': return 'bg-rose-50 text-rose-600';
      case 'indigo': return 'bg-indigo-50 text-indigo-600';
      default: return 'bg-teal-50 text-teal-600';
    }
  };

  return (
    <div>
      {/* Title */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>خدمات پرکاربرد بانکی</span>
        </h2>
        <button
          onClick={() => alert('امکان چینش مجدد و شخصی‌سازی آیکون‌های دسترسی سریع')}
          className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold transition"
        >
          شخصی‌سازی
        </button>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-4 gap-2.5">
        {/* ۱. کارت به کارت */}
        <button
          id="btn-service-card-to-card"
          onClick={() => {
            onOpenTransferMode('card');
            onNavigateTab('transfer');
          }}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">کارت به کارت</span>
        </button>

        {/* ۲. جیب به جیب */}
        <button
          id="btn-service-mounes-to-mounes"
          onClick={() => {
            onOpenTransferMode('mounes');
            onNavigateTab('transfer');
          }}
          className="bg-white p-3 rounded-2xl border border-emerald-300 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-500 active:scale-95 transition relative"
        >
          <span className="absolute -top-1.5 right-1 bg-emerald-500 text-[9px] font-extrabold text-slate-950 px-1.5 py-0.2 rounded-full shadow-2xs">
            ۰٪ کارمزد
          </span>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <Zap className="w-5 h-5 fill-emerald-500/20" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">جیب به جیب</span>
        </button>

        {/* ۳. پرداخت QR */}
        <button
          id="btn-service-qr-pay"
          onClick={onOpenQr}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">پرداخت QR</span>
        </button>

        {/* ۴. پرداخت قبوض */}
        <button
          id="btn-service-bills"
          onClick={onOpenBills}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <Receipt className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">پرداخت قبوض</span>
        </button>

        {/* ۵. شارژ و اینترنت */}
        <button
          id="btn-service-recharge"
          onClick={onOpenRecharge}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <Radio className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">شارژ و اینترنت</span>
        </button>

        {/* ۶. فروشگاه‌ها */}
        <button
          id="btn-service-stores"
          onClick={() => onNavigateTab('stores')}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <Store className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">فروشگاه‌ها</span>
        </button>

        {/* ۷. صورت‌حساب */}
        <button
          id="btn-service-statements"
          onClick={() => onNavigateTab('transactions')}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">صورت‌حساب</span>
        </button>

        {/* ۸. جیب ارزی */}
        <button
          id="btn-service-crypto-pocket"
          onClick={onOpenCrypto}
          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-emerald-300 active:scale-95 transition"
        >
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 shadow-2xs">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">جیب ارزی</span>
        </button>

        {/* ۹ تا ۱۱. خدمات اتباع (سیم‌کارت، درمان، آموزش) - جدید */}
        {foreignExtraServices.map((service) => (
          <button
            key={service.id}
            id={`btn-service-foreign-${service.id}`}
            onClick={() => onSelectForeignService(service)}
            className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-teal-300 active:scale-95 transition"
          >
            <div className={`w-11 h-11 rounded-2xl ${getForeignIconBg(service.badgeType)} flex items-center justify-center mb-1.5 shadow-2xs`}>
              {getForeignIcon(service.iconName)}
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              {service.title
                .replace('خدمات ارتباطی و سیم‌کارت رسمی', 'سیم‌کارت اتباع')
                .replace('خدمات درمانی و بهداشتی', 'درمان اتباع')
                .replace('خدمات آموزشی و تحصیلی', 'آموزش اتباع')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};