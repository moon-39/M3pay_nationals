import React, { useState } from 'react';
import { RefreshCw, X, ArrowDownUp, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  balanceRial: number;
  balanceUsdt: number;
  rate: number;
  onExecuteSwap: (fromType: 'rial' | 'usdt', fromAmount: number, toAmount: number) => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  balanceRial,
  balanceUsdt,
  rate,
  onExecuteSwap,
}) => {
  if (!isOpen) return null;

  const [swapDirection, setSwapDirection] = useState<'rial_to_usdt' | 'usdt_to_rial'>('rial_to_usdt');
  const [inputAmount, setInputAmount] = useState<number>(10000000); // 10,000,000 Rials default
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Calculations
  const calculatedOutput =
    swapDirection === 'rial_to_usdt'
      ? parseFloat((inputAmount / rate).toFixed(2))
      : Math.round(inputAmount * rate);

  const handleToggleDirection = () => {
    if (swapDirection === 'rial_to_usdt') {
      setSwapDirection('usdt_to_rial');
      setInputAmount(50); // 50 USDT
    } else {
      setSwapDirection('rial_to_usdt');
      setInputAmount(10000000); // 10,000,000 Rials
    }
  };

  const handleConfirm = () => {
    if (swapDirection === 'rial_to_usdt' && inputAmount > balanceRial) {
      alert('موجودی ریالی شما برای این تبدیل کافی نیست.');
      return;
    }
    if (swapDirection === 'usdt_to_rial' && inputAmount > balanceUsdt) {
      alert('موجودی تتری شما برای این تبدیل کافی نیست.');
      return;
    }

    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      onExecuteSwap(
        swapDirection === 'rial_to_usdt' ? 'rial' : 'usdt',
        inputAmount,
        calculatedOutput
      );
      setSuccessMessage(
        swapDirection === 'rial_to_usdt'
          ? `تبدیل با موفقیت انجام شد! ${calculatedOutput} تتر به جیب ارزی شما اضافه گردید.`
          : `تبدیل با موفقیت انجام شد! ${calculatedOutput.toLocaleString('fa-IR')} ریال به کیف پول شما افزوده شد.`
      );
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1600);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">تبدیل آنی ریال / تتر (USDT)</h3>
              <span className="text-[10px] text-slate-400">بدون کارمزد شبکه • تسویه در کسری از ثانیه</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {successMessage ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-xs font-bold text-slate-800">{successMessage}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Live Exchange Rate Card */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">نرخ تبدیل زنده مونس:</span>
              <span className="font-extrabold text-slate-800 font-display">
                ۱ USDT = ۶۶۷,۰۰۰ ریال <span className="text-[10px] text-slate-400 font-sans">(۶۶,۷۰۰ تومان)</span>
              </span>
            </div>

            {/* Source Box */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>پرداخت می‌کنید:</span>
                <span>
                  موجودی:{' '}
                  {swapDirection === 'rial_to_usdt'
                    ? `${balanceRial.toLocaleString('fa-IR')} ریال`
                    : `${balanceUsdt.toLocaleString('fa-IR')} USDT`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={
                    swapDirection === 'rial_to_usdt'
                      ? inputAmount.toLocaleString('fa-IR')
                      : inputAmount.toString()
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, '');
                    setInputAmount(parseFloat(raw) || 0);
                  }}
                  className="w-2/3 bg-transparent text-lg font-black text-slate-900 font-display focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                  {swapDirection === 'rial_to_usdt' ? 'ریال (IRR)' : 'تتر (USDT)'}
                </span>
              </div>
            </div>

            {/* Switch Direction Button */}
            <div className="flex justify-center -my-1">
              <button
                type="button"
                onClick={handleToggleDirection}
                className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md hover:bg-slate-800 transition active:scale-95 cursor-pointer"
              >
                <ArrowDownUp className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Output Box */}
            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 space-y-1.5">
              <div className="flex justify-between text-[11px] text-emerald-800">
                <span>دریافت می‌کنید:</span>
                <span>واریز آنی به کیف پول</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-emerald-950 font-display">
                  {swapDirection === 'rial_to_usdt'
                    ? calculatedOutput.toLocaleString('fa-IR', { minimumFractionDigits: 2 })
                    : calculatedOutput.toLocaleString('fa-IR')}
                </span>
                <span className="text-xs font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-xl border border-emerald-300">
                  {swapDirection === 'rial_to_usdt' ? 'تتر (USDT)' : 'ریال (IRR)'}
                </span>
              </div>
            </div>

            {/* Transaction Guarantee */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>پشتوانه ۱۰۰٪ نقدینگی و بدون تغییر نرخ در لحظه ثبت</span>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={isSwapping || inputAmount <= 0}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {isSwapping ? (
                <span>در حال تبادل ارز...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>تایید و تبدیل لحظه‌ای</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
