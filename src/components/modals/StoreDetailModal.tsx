import React, { useState } from 'react';
import { X, Star, MapPin, Copy, Check, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { PartnerStore, TransactionItem } from '../../types';

interface StoreDetailModalProps {
  store: PartnerStore | null;
  onClose: () => void;
  onSimulatePurchase: (store: PartnerStore, amount: number, tx: TransactionItem) => void;
  onCopySuccess: (text: string) => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({
  store,
  onClose,
  onSimulatePurchase,
  onCopySuccess,
}) => {
  if (!store) return null;

  const [copiedCode, setCopiedCode] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(2500000);
  const [isPaying, setIsPaying] = useState(false);

  const voucherCode = `MOUNES-${store.id}0${store.rating * 10}`;

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(voucherCode);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    onCopySuccess(`کد تخفیف اختصاصی ${store.name} کپی شد`);
  };

  const handleBuy = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      // Calculate cashback percent
      const percentMatch = store.cashback.match(/\d+/);
      const percent = percentMatch ? parseInt(percentMatch[0], 10) : 10;
      const earnedCashback = Math.round(purchaseAmount * (percent / 100));

      const newTx: TransactionItem = {
        id: `tx-str-${Date.now().toString().slice(-6)}`,
        title: `خرید از ${store.name}`,
        category: 'store',
        categoryLabel: 'خرید فروشگاه‌های همکار',
        type: 'outflow',
        amount: purchaseAmount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'تراکنش موفق مونس‌پی',
        trackingCode: `STR-${Math.floor(10000000 + Math.random() * 90000000)}`,
        cashbackEarned: earnedCashback,
        counterparty: store.name,
        note: `پرداخت با تخفیف و دریافت ${percent}٪ بازگشت وجه نقدی`,
      };

      onSimulatePurchase(store, purchaseAmount, newTx);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{store.name}</h3>
              <span className="text-[10px] text-slate-400">{store.categoryLabel}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cashback highlight card */}
        <div className="bg-gradient-to-l from-emerald-600 to-teal-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
              پاداش نقدی
            </span>
            <h4 className="text-sm font-extrabold text-white">{store.cashback}</h4>
            <p className="text-[10px] text-emerald-100">واریز فوری به مانده کیف پول مونس</p>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-xl text-amber-300 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>{store.rating}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-slate-800">درباره فروشگاه:</h4>
          <p className="text-slate-500 leading-relaxed">{store.description}</p>
        </div>

        {/* Branches */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-1 text-slate-700 font-bold">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>شعب و محدوده پوشش:</span>
          </div>
          <p className="text-slate-500 text-[11px]">{store.branches}</p>
        </div>

        {/* Voucher Code Box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 space-y-1.5">
          <span className="text-[11px] font-bold text-emerald-900 block">
            کد تخفیف اختصاصی مشتریان مونس:
          </span>
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-emerald-300">
            <span className="font-mono font-bold text-xs text-slate-900 tracking-wider">
              {voucherCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'کپی شد' : 'کپی کد'}</span>
            </button>
          </div>
        </div>

        {/* Quick Purchase Simulation */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800">شبیه‌سازی خرید با کیف پول:</span>
            <span className="text-[10px] text-emerald-700 font-bold">
              + {Math.round(purchaseAmount * 0.08).toLocaleString('fa-IR')} ریال کش‌بک
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={purchaseAmount.toLocaleString('fa-IR')}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                setPurchaseAmount(val);
              }}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-center font-bold text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
            />
            <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">ریال</span>
          </div>

          <button
            onClick={handleBuy}
            disabled={isPaying || purchaseAmount <= 0}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPaying ? 'در حال ثبت خرید...' : 'پرداخت با مونس و دریافت کش‌بک آنی'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
