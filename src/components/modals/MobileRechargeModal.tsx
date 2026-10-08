import React, { useState } from 'react';
import { X, Radio, CheckCircle2, Smartphone, Wifi } from 'lucide-react';
import { TransactionItem } from '../../types';

interface MobileRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteRecharge: (tx: TransactionItem) => void;
}

export const MobileRechargeModal: React.FC<MobileRechargeModalProps> = ({
  isOpen,
  onClose,
  onExecuteRecharge,
}) => {
  if (!isOpen) return null;

  const [operator, setOperator] = useState<'mci' | 'irancell' | 'rightel'>('mci');
  const [phoneNumber, setPhoneNumber] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [rechargeType, setRechargeType] = useState<'charge' | 'internet'>('charge');
  const [amount, setAmount] = useState(200000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const operatorName =
        operator === 'mci' ? 'همراه اول' : operator === 'irancell' ? 'ایرانسل' : 'رایتل';
      const newTx: TransactionItem = {
        id: `tx-rch-${Date.now().toString().slice(-6)}`,
        title:
          rechargeType === 'charge'
            ? `شارژ مستقیم ${operatorName}`
            : `بسته اینترنت ${operatorName}`,
        category: 'topup',
        categoryLabel: 'شارژ و بسته اینترنت',
        type: 'outflow',
        amount: amount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'شارژ فوری موفق',
        trackingCode: `TOP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        note: `شماره همراه: ${phoneNumber}`,
      };

      onExecuteRecharge(newTx);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
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
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">شارژ و بسته اینترنت</h3>
              <span className="text-[10px] text-slate-400">همراه اول، ایرانسل، رایتل و شاتل‌موبایل</span>
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
            <h4 className="text-xs font-bold text-slate-900">سفارش شارژ با موفقیت فعال شد</h4>
            <p className="text-[11px] text-slate-500">سیم‌کارت به صورت مستقیم شارژ گردید.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Operator selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOperator('mci')}
                className={`py-2 rounded-2xl border text-center font-bold transition ${
                  operator === 'mci'
                    ? 'bg-cyan-50 border-cyan-400 text-cyan-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                همراه اول
              </button>

              <button
                type="button"
                onClick={() => setOperator('irancell')}
                className={`py-2 rounded-2xl border text-center font-bold transition ${
                  operator === 'irancell'
                    ? 'bg-amber-50 border-amber-400 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                ایرانسل
              </button>

              <button
                type="button"
                onClick={() => setOperator('rightel')}
                className={`py-2 rounded-2xl border text-center font-bold transition ${
                  operator === 'rightel'
                    ? 'bg-purple-50 border-purple-400 text-purple-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                رایتل
              </button>
            </div>

            {/* Type selector */}
            <div className="bg-slate-100 p-1 rounded-2xl flex text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setRechargeType('charge');
                  setAmount(200000);
                }}
                className={`flex-1 py-1.5 rounded-xl transition ${
                  rechargeType === 'charge' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                شارژ مستقیم
              </button>
              <button
                type="button"
                onClick={() => {
                  setRechargeType('internet');
                  setAmount(680000);
                }}
                className={`flex-1 py-1.5 rounded-xl transition ${
                  rechargeType === 'internet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                بسته اینترنت
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">شماره تلفن همراه:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Packages / Amounts */}
            {rechargeType === 'charge' ? (
              <div className="grid grid-cols-3 gap-1.5">
                {[100000, 200000, 500000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition ${
                      amount === amt
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {(amt / 10).toLocaleString('fa-IR')} ت
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {[
                  { title: 'بسته ماهانه ۷ گیگابایت', price: 480000 },
                  { title: 'بسته ماهانه ۱۲ گیگابایت', price: 680000 },
                  { title: 'بسته ۳ ماهه ۳۵ گیگابایت', price: 1450000 },
                ].map((pkg) => (
                  <div
                    key={pkg.title}
                    onClick={() => setAmount(pkg.price)}
                    className={`p-2.5 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                      amount === pkg.price
                        ? 'bg-cyan-50 border-cyan-400 text-cyan-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{pkg.title}</span>
                    <span>{pkg.price.toLocaleString('fa-IR')} ریال</span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-2xl shadow-md transition active:scale-98 cursor-pointer"
            >
              {isProcessing ? 'در حال فعال‌سازی...' : 'پرداخت و شارژ آنی'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
