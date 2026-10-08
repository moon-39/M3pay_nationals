import React, { useState } from 'react';
import {
  QrCode,
  Scan,
  Zap,
  Camera,
  Flashlight,
  Copy,
  Share2,
  CheckCircle2,
  ShoppingBag,
  ArrowDownLeft
} from 'lucide-react';
import { TransactionItem } from '../types';

interface QrScreenProps {
  onSimulateQrPayment: (tx: TransactionItem) => void;
  onCopySuccess: (text: string) => void;
}

export const QrScreen: React.FC<QrScreenProps> = ({
  onSimulateQrPayment,
  onCopySuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'receive'>('scan');
  const [receiveAmount, setReceiveAmount] = useState<number>(5000000);
  const [flashOn, setFlashOn] = useState<boolean>(false);

  const handlePayMerchant = (merchantName: string, amount: number) => {
    const newTx: TransactionItem = {
      id: `tx-qr-${Date.now().toString().slice(-5)}`,
      title: `پرداخت بارکد ${merchantName}`,
      category: 'store',
      categoryLabel: 'پرداخت بارکد QR شاپرک',
      type: 'outflow',
      amount: amount,
      date: 'امروز | چند لحظه پیش',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      status: 'successful',
      statusLabel: 'تراکنش موفق بارکدخوان',
      trackingCode: `QR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      cashbackEarned: Math.round(amount * 0.08),
      counterparty: merchantName,
      note: 'پرداخت سریع در پایانه فروشگاهی با کد مونس',
    };
    onSimulateQrPayment(newTx);
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Tab Switcher */}
      <div className="bg-slate-200/80 p-1 rounded-2xl flex text-xs font-bold">
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'scan'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scan className="w-4 h-4" />
          <span>اسکن بارکد پایانه و کارتخوان</span>
        </button>

        <button
          onClick={() => setActiveTab('receive')}
          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'receive'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>کد QR من (دریافت پول)</span>
        </button>
      </div>

      {activeTab === 'scan' ? (
        <div className="space-y-4">
          {/* Simulated Camera Viewport */}
          <div className="bg-slate-950 rounded-3xl p-6 text-white text-center relative overflow-hidden border border-slate-800 shadow-xl min-h-[320px] flex flex-col items-center justify-between">
            {/* Top controls */}
            <div className="w-full flex justify-between items-center z-10">
              <span className="text-xs text-slate-400 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                دوربین آماده اسکن
              </span>
              <button
                onClick={() => setFlashOn(!flashOn)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  flashOn ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white/10 text-white border-white/10'
                }`}
              >
                <Flashlight className="w-4 h-4" />
              </button>
            </div>

            {/* QR Focus Box with Laser scanline */}
            <div className="relative w-56 h-56 my-4 flex items-center justify-center">
              {/* Corner frames */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />

              {/* Animated laser beam */}
              <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#00e599] animate-bounce" />

              <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xs border border-white/10 text-center space-y-1 pointer-events-none">
                <QrCode className="w-16 h-16 mx-auto text-white/30 stroke-[1.2]" />
                <span className="text-[10px] text-slate-300 block">بارکد صندوق یا کارتخوان را در کادر قرار دهید</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 z-10">
              سازگار با تمامی دستگاه‌های پوز به‌پرداخت، آپ، سپ، فن‌آوا و سامان
            </p>
          </div>

          {/* Quick Demo Scan Triggers */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>تست و شبیه‌سازی اسکن پایانه‌های منتخب:</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePayMerchant('هایپراستار باکری', 3450000)}
                className="p-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-right space-y-0.5 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>هایپراستار</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1 rounded">۷٪ کش‌بک</span>
                </div>
                <p className="text-[11px] text-slate-600">۳,۴۵۰,۰۰۰ ریال</p>
              </button>

              <button
                onClick={() => handlePayMerchant('کافه قنادی ناتلی', 2100000)}
                className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-right space-y-0.5 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>ناتلی پاسداران</span>
                  <span className="text-[10px] text-amber-800 bg-amber-200 px-1 rounded">۱۲٪ کش‌بک</span>
                </div>
                <p className="text-[11px] text-slate-600">۲,۱۰۰,۰۰۰ ریال</p>
              </button>

              <button
                onClick={() => handlePayMerchant('رستوران نایب وزرا', 5800000)}
                className="p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-right space-y-0.5 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>نایب وزرا</span>
                  <span className="text-[10px] text-rose-800 bg-rose-100 px-1 rounded">۱۰٪ تخفیف</span>
                </div>
                <p className="text-[11px] text-slate-600">۵,۸۰۰,۰۰۰ ریال</p>
              </button>

              <button
                onClick={() => handlePayMerchant('نشر چشمه کریمخان', 1650000)}
                className="p-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-right space-y-0.5 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>نشر چشمه</span>
                  <span className="text-[10px] text-indigo-800 bg-indigo-100 px-1 rounded">۱۵٪ کش‌بک</span>
                </div>
                <p className="text-[11px] text-slate-600">۱,۶۵۰,۰۰۰ ریال</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Receive via QR Screen */
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-4">
            <div>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                کیف پول امن مونس • پوریا عزیز
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-2">
                برای واریز فوری به کیف پول من اسکن کنید
              </h3>
            </div>

            {/* Generated QR Code SVG Box */}
            <div className="p-5 bg-slate-50 border-2 border-dashed border-emerald-400/50 rounded-3xl inline-block shadow-inner">
              <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-xs flex flex-col items-center justify-center relative">
                {/* SVG QR Code Pattern */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="white" />
                  {/* Position detection markers */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#0B1528" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" fill="#00E599" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#0B1528" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" fill="#00E599" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#0B1528" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" fill="#00E599" />

                  {/* QR Data Dots */}
                  <rect x="36" y="8" width="5" height="5" fill="#0B1528" />
                  <rect x="44" y="8" width="5" height="5" fill="#0B1528" />
                  <rect x="52" y="8" width="5" height="5" fill="#0B1528" />
                  <rect x="36" y="18" width="8" height="5" fill="#0B1528" />
                  <rect x="48" y="22" width="6" height="6" fill="#00E599" />
                  <rect x="58" y="18" width="5" height="8" fill="#0B1528" />

                  <rect x="10" y="38" width="5" height="5" fill="#0B1528" />
                  <rect x="20" y="38" width="6" height="8" fill="#0B1528" />
                  <rect x="35" y="35" width="10" height="10" fill="#0B1528" />
                  <rect x="48" y="38" width="6" height="6" fill="#0B1528" />
                  <rect x="60" y="36" width="8" height="6" fill="#0B1528" />
                  <rect x="74" y="38" width="6" height="6" fill="#0B1528" />
                  <rect x="85" y="36" width="6" height="8" fill="#0B1528" />

                  <rect x="36" y="52" width="6" height="6" fill="#00E599" />
                  <rect x="48" y="52" width="8" height="6" fill="#0B1528" />
                  <rect x="62" y="50" width="6" height="8" fill="#0B1528" />

                  <rect x="36" y="68" width="8" height="8" fill="#0B1528" />
                  <rect x="50" y="70" width="6" height="6" fill="#0B1528" />
                  <rect x="65" y="68" width="8" height="6" fill="#00E599" />
                  <rect x="78" y="70" width="8" height="8" fill="#0B1528" />
                  <rect x="40" y="82" width="6" height="8" fill="#0B1528" />
                  <rect x="52" y="80" width="10" height="6" fill="#0B1528" />
                  <rect x="68" y="82" width="8" height="8" fill="#0B1528" />
                </svg>

                {/* Center Mounes Logo Badge */}
                <div className="absolute w-10 h-10 rounded-xl bg-slate-900 border-2 border-emerald-400 flex items-center justify-center p-1 shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UtQEFig09tE8UiakTCpEh1R5fG8idZtRBW6YCl8K_epo7nEBv2nS7QtVTWav3MnwuXIM_AF0XQPbeEt5GPyoCLBUGL7xIG9ZkBu-57-iE_QCRilbqeZ1dCYomwHTMaWJHmZe58iNKLTrOmhyQBlvcc0YWgsXsPgNhWPVTnEnNMiBeKvbtPLd_9YGIiLMuct1a27dFHlLIevrZ_crVaPYHFSmk1bk0X_uSRyC_vnIT8giUjYCn0PYWM4Hg"
                    alt="مونس"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Set Specific Amount */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-700 block">مبلغ دلخواه برای دریافت (ریال):</label>
              <input
                type="text"
                value={receiveAmount.toLocaleString('fa-IR')}
                onChange={(e) => {
                  const num = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                  setReceiveAmount(num);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-center font-bold text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-emerald-700 block text-center">
                معادل {Math.floor(receiveAmount / 10).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onCopySuccess('لینک اختصاصی پرداخت مونس کپی شد: https://mounes.pay/p/pouria_aziz')}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>کپی لینک پرداخت</span>
              </button>

              <button
                onClick={() => onCopySuccess('تصویر بارکد برای ارسال در پیام‌رسان‌ها آماده شد')}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>اشتراک‌گذاری QR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
