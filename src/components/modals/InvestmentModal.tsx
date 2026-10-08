import React, { useState } from 'react';
import { X, TrendingUp, CheckCircle2, ShieldCheck, Coins } from 'lucide-react';
import { InvestmentFund, TransactionItem } from '../../types';

interface InvestmentModalProps {
  fund: InvestmentFund | null;
  onClose: () => void;
  onExecuteInvestment: (fund: InvestmentFund, amount: number, tx: TransactionItem) => void;
}

export const InvestmentModal: React.FC<InvestmentModalProps> = ({
  fund,
  onClose,
  onExecuteInvestment,
}) => {
  if (!fund) return null;

  const [investmentAmount, setInvestmentAmount] = useState<number>(10000000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Expected returns calculation
  const calculatedReturn1Year = Math.round(investmentAmount * 0.292);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTx: TransactionItem = {
        id: `tx-inv-${Date.now().toString().slice(-6)}`,
        title: `صدور واحد در ${fund.title}`,
        category: 'transfer',
        categoryLabel: 'سرمایه‌گذاری در بورس',
        type: 'outflow',
        amount: investmentAmount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'صدور واحد موفق',
        trackingCode: `INV-${Math.floor(10000000 + Math.random() * 90000000)}`,
        note: `سرمایه‌گذاری با بازدهی پیش‌بینی شده ${fund.yieldRate}`,
      };

      onExecuteInvestment(fund, investmentAmount, newTx);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{fund.title}</h3>
              <span className="text-[10px] text-slate-400">سامانه صندوق‌های سرمایه‌گذاری مونس</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">واحدهای سرمایه‌گذاری صادر گردید</h4>
            <p className="text-[11px] text-slate-500">
              سود ماهانه روزشمار به موجودی کیف پول مونس شما واریز خواهد شد.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 text-xs">
            {/* Overview */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">نرخ بازدهی / بازده مورد انتظار:</span>
                <span className="font-bold text-emerald-700 font-display">{fund.yieldRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">پشتوانه قانونی:</span>
                <span className="font-medium text-slate-800">{fund.backing}</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed">{fund.description}</p>

            {/* Input Investment Amount */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-[11px] font-bold text-slate-700 block">مبلغ سرمایه‌گذاری (ریال):</label>
              <input
                type="text"
                value={investmentAmount.toLocaleString('fa-IR')}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                  setInvestmentAmount(val);
                }}
                className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-center font-bold text-sm text-slate-900 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-500 block text-center">
                معادل {Math.floor(investmentAmount / 10).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            {/* Expected Return Simulator */}
            {fund.id === 'fund-fixed' && (
              <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-200 flex justify-between items-center text-xs">
                <span className="text-blue-900">سود تقریبی سالانه:</span>
                <span className="font-extrabold text-blue-900 font-display">
                  + {calculatedReturn1Year.toLocaleString('fa-IR')} ریال
                </span>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={isProcessing || investmentAmount <= 0}
              className={`w-full py-3 text-xs font-bold rounded-2xl shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 ${fund.buttonColor}`}
            >
              {isProcessing ? 'در حال صدور واحد...' : 'تایید و صدور واحد سرمایه‌گذاری'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
