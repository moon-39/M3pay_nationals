import React, { useState } from 'react';
import { PlusCircle, ArrowDownCircle, X, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';
import { TransactionItem } from '../../types';

interface DepositWithdrawModalProps {
  isOpen: boolean;
  initialType: 'deposit' | 'withdraw';
  onClose: () => void;
  balanceRial: number;
  onExecute: (type: 'deposit' | 'withdraw', amount: number, tx: TransactionItem) => void;
}

export const DepositWithdrawModal: React.FC<DepositWithdrawModalProps> = ({
  isOpen,
  initialType,
  onClose,
  balanceRial,
  onExecute,
}) => {
  if (!isOpen) return null;

  const [activeType, setActiveType] = useState<'deposit' | 'withdraw'>(initialType);
  const [amount, setAmount] = useState<number>(5000000);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('لطفاً مبلغ معتبری را مشخص فرمایید.');
      return;
    }
    if (activeType === 'withdraw' && amount > balanceRial) {
      alert('مبلغ درخواستی بیشتر از موجودی کیف پول است.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTx: TransactionItem = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        title: activeType === 'deposit' ? 'افزایش موجودی کیف پول' : 'برداشت وجه به کارت بانکی',
        category: 'transfer',
        categoryLabel: activeType === 'deposit' ? 'شارژ حساب بانکی' : 'تسویه حساب شتابی',
        type: activeType === 'deposit' ? 'inflow' : 'outflow',
        amount: amount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'تراکنش موفق شاپرک',
        trackingCode: `SHP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        cardOrAccount: '۶۰۳۷ - ۹۹۱۸ - ۴۳۲۱ - ۷۸۰۹',
        note: activeType === 'deposit' ? 'شارژ آنلاین از درگاه بانکی' : 'تسویه به شماره کارت پیش‌فرض',
      };

      onExecute(activeType, amount, newTx);
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        onClose();
      }, 1500);
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                activeType === 'deposit'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {activeType === 'deposit' ? (
                <PlusCircle className="w-4 h-4" />
              ) : (
                <ArrowDownCircle className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {activeType === 'deposit' ? 'افزایش موجودی کیف پول' : 'برداشت وجه از کیف پول'}
              </h3>
              <span className="text-[10px] text-slate-400">
                موجودی فعلی: {balanceRial.toLocaleString('fa-IR')} ریال
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {completed ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              {activeType === 'deposit'
                ? 'موجودی با موفقیت شارژ شد!'
                : 'درخواست برداشت با موفقیت ثبت شد و به حساب شما واریز گردید.'}
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Mode toggle */}
            <div className="bg-slate-100 p-1 rounded-2xl flex text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveType('deposit')}
                className={`flex-1 py-2 rounded-xl transition cursor-pointer ${
                  activeType === 'deposit'
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                افزایش موجودی
              </button>
              <button
                type="button"
                onClick={() => setActiveType('withdraw')}
                className={`flex-1 py-2 rounded-xl transition cursor-pointer ${
                  activeType === 'withdraw'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                برداشت وجه
              </button>
            </div>

            {/* Input Amount */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                مبلغ مورد نظر (ریال):
              </label>
              <input
                type="text"
                value={amount.toLocaleString('fa-IR')}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                  setAmount(val);
                }}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-center font-bold text-lg text-slate-900 font-display focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-emerald-700 block text-center">
                معادل {Math.floor(amount / 10).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            {/* Quick Chips */}
            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setAmount(2000000)}
                className="py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700"
              >
                ۲,۰۰۰,۰۰۰ ریال
              </button>
              <button
                type="button"
                onClick={() => setAmount(5000000)}
                className="py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700"
              >
                ۵,۰۰۰,۰۰۰ ریال
              </button>
              <button
                type="button"
                onClick={() => setAmount(10000000)}
                className="py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700"
              >
                ۱۰,۰۰۰,۰۰۰ ریال
              </button>
            </div>

            {/* Target Account details */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <span>
                {activeType === 'deposit'
                  ? 'اتصال به درگاه امن شبکه الکترونیکی شاپرک'
                  : 'واریز به شماره کارت متصل: ۶۰۳۷ - ۹۹۱۸ - ۴۳۲۱ - ۷۸۰۹'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing || amount <= 0}
              className={`w-full py-3 text-xs font-bold rounded-2xl shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 ${
                activeType === 'deposit'
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isProcessing ? 'در حال ارتباط با شاپرک...' : 'تایید و ادامه'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
