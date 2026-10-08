import React, { useState } from 'react';
import { X, Receipt, CheckCircle2, Zap, Droplet, Flame, Phone } from 'lucide-react';
import { TransactionItem } from '../../types';

interface BillPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayBill: (tx: TransactionItem) => void;
}

export const BillPaymentModal: React.FC<BillPaymentModalProps> = ({
  isOpen,
  onClose,
  onPayBill,
}) => {
  if (!isOpen) return null;

  const [billType, setBillType] = useState<'electricity' | 'water' | 'gas' | 'phone'>('electricity');
  const [billId, setBillId] = useState('۹۸۱۲۳۰۹۸۴۵');
  const [paymentId, setPaymentId] = useState('۷۷۴۲۱۰۹۰');
  const [billAmount, setBillAmount] = useState(1450000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTx: TransactionItem = {
        id: `tx-bil-${Date.now().toString().slice(-6)}`,
        title:
          billType === 'electricity'
            ? 'پرداخت قبض برق'
            : billType === 'water'
            ? 'پرداخت قبض آب'
            : billType === 'gas'
            ? 'پرداخت قبض گاز'
            : 'پرداخت قبض تلفن ثابت',
        category: 'bill',
        categoryLabel: 'قبوض خدماتی',
        type: 'outflow',
        amount: billAmount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'تسویه شده در سامانه قبوض',
        trackingCode: `BIL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        note: `شناسه قبض: ${billId} | شناسه پرداخت: ${paymentId}`,
      };

      onPayBill(newTx);
      setPaid(true);
      setTimeout(() => {
        setPaid(false);
        onClose();
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">پرداخت قبوض خدماتی</h3>
              <span className="text-[10px] text-slate-400">استعلام و تسویه آنی برق، آب، گاز و تلفن</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {paid ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">قبض با موفقیت تسویه گردید</h4>
            <p className="text-[11px] text-slate-500">کد رهگیری در بخش صورت‌حساب ذخیره شد.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Bill Type Selector */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setBillType('electricity');
                  setBillAmount(1450000);
                }}
                className={`p-2.5 rounded-2xl border text-center space-y-1 transition ${
                  billType === 'electricity'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Zap className="w-4 h-4 mx-auto text-amber-500" />
                <span className="text-[10px] block">برق</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBillType('water');
                  setBillAmount(820000);
                }}
                className={`p-2.5 rounded-2xl border text-center space-y-1 transition ${
                  billType === 'water'
                    ? 'bg-cyan-50 border-cyan-400 text-cyan-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Droplet className="w-4 h-4 mx-auto text-cyan-500" />
                <span className="text-[10px] block">آب</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBillType('gas');
                  setBillAmount(1980000);
                }}
                className={`p-2.5 rounded-2xl border text-center space-y-1 transition ${
                  billType === 'gas'
                    ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Flame className="w-4 h-4 mx-auto text-rose-500" />
                <span className="text-[10px] block">گاز</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBillType('phone');
                  setBillAmount(650000);
                }}
                className={`p-2.5 rounded-2xl border text-center space-y-1 transition ${
                  billType === 'phone'
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Phone className="w-4 h-4 mx-auto text-blue-500" />
                <span className="text-[10px] block">تلفن</span>
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">شناسه قبض:</label>
              <input
                type="text"
                value={billId}
                onChange={(e) => setBillId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">شناسه پرداخت:</label>
              <input
                type="text"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
              <span className="text-slate-500">مبلغ قابل پرداخت:</span>
              <span className="text-sm font-bold text-slate-900 font-display">
                {billAmount.toLocaleString('fa-IR')} ریال
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-2xl shadow-md transition active:scale-98 cursor-pointer"
            >
              {isProcessing ? 'در حال پرداخت قبض...' : 'پرداخت با کیف پول مونس'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
