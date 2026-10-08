import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  ArrowDownCircle,
  Coins,
  Landmark,
  UserRound,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Clipboard,
  ChevronRight,
} from 'lucide-react';
import { TransactionItem } from '../../types';

type Direction = 'deposit' | 'withdraw';
type Channel = 'crypto' | 'rial' | 'internal';

const MY_WALLET_TRC20 = 'TKy94zQp3RmVx8bWn7YfLc2Dq5Hs9Jm1Xt';
const MY_MOUNES_ID = 'pouria_aziz@mounes';
const MY_CARD = '۶۰۳۷ - ۶۹۱۹ - ۲۸۴۰ - ۵۵۴۱';
const MY_SHEBA = 'IR5401200000000012345678';

interface CryptoTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  balanceUsdt: number;
  balanceRial: number;
  onExecute: (tx: TransactionItem) => void;
}

export const CryptoTransactionModal: React.FC<CryptoTransactionModalProps> = ({
  isOpen,
  onClose,
  balanceUsdt,
  balanceRial,
  onExecute,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<Direction>('deposit');
  const [channel, setChannel] = useState<Channel>('crypto');

  const [amount, setAmount] = useState<number>(0);
  const [destWallet, setDestWallet] = useState('');
  const [destCard, setDestCard] = useState('');
  const [destMounesId, setDestMounesId] = useState('');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handlePaste = async (setter: (v: string) => void) => {
    try {
      if (navigator.clipboard) {
        const t = await navigator.clipboard.readText();
        if (t) setter(t.trim());
      }
    } catch {
      /* ignore */
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setDirection('deposit');
    setChannel('crypto');
    setAmount(0);
    setDestWallet('');
    setDestCard('');
    setDestMounesId('');
    setCompleted(false);
    onClose();
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const validate = (): string | null => {
    if (amount <= 0) return 'لطفاً مبلغ معتبر وارد کنید.';
    if (direction === 'withdraw') {
      if (channel === 'crypto') {
        if (!destWallet.trim()) return 'آدرس کیف پول مقصد را وارد کنید.';
        if (amount > balanceUsdt) return 'موجودی تتر کافی نیست.';
      } else if (channel === 'rial') {
        if (!destCard.trim()) return 'شماره کارت یا شبا مقصد را وارد کنید.';
        if (amount > balanceRial) return 'موجودی ریالی کافی نیست.';
      } else {
        if (!destMounesId.trim()) return 'شناسه کاربری مقصد را وارد کنید.';
        if (amount > balanceRial) return 'موجودی ریالی کافی نیست.';
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      const directionLabel = direction === 'deposit' ? 'واریز' : 'برداشت';
      const channelLabel =
        channel === 'crypto' ? 'ارزی' : channel === 'rial' ? 'ریالی' : 'داخلی';

      let note = '';
      if (channel === 'crypto') {
        note =
          direction === 'withdraw'
            ? `مقصد TRC20: ${destWallet.slice(0, 14)}...`
            : `واریز در شبکه TRC20`;
      } else if (channel === 'rial') {
        note =
          direction === 'withdraw'
            ? `مقصد: ${destCard}`
            : `واریز به حساب متصل به مونس`;
      } else {
        note =
          direction === 'withdraw'
            ? `مقصد: ${destMounesId}`
            : `شناسه مونس: ${MY_MOUNES_ID}`;
      }

      const newTx: TransactionItem = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        title: `${directionLabel} ${channelLabel}`,
        category: channel === 'crypto' ? 'crypto' : 'transfer',
        categoryLabel:
          channel === 'crypto'
            ? 'عملیات ارزی'
            : channel === 'rial'
            ? 'عملیات بانکی'
            : 'انتقال داخلی',
        type: direction === 'deposit' ? 'inflow' : 'outflow',
        amount,
        currency: channel === 'crypto' ? 'usdt' : 'rial',
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'successful',
        statusLabel: 'تراکنش موفق',
        trackingCode: `${channel === 'crypto' ? 'CRY' : 'SHP'}-${Math.floor(
          10000000 + Math.random() * 90000000
        )}`,
        note,
      };

      onExecute(newTx);
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        resetAndClose();
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp max-h-[92vh] overflow-y-auto hide-scrollbar">
        {/* هدر */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            {step > 1 && !completed && (
              <button
                type="button"
                onClick={handleBack}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {step === 1 && 'جیب ارزی مونس'}
                {step === 2 && (direction === 'deposit' ? 'واریز وجه' : 'برداشت وجه')}
                {step === 3 && (direction === 'deposit' ? 'واریز وجه' : 'برداشت وجه')}
              </h3>
              <span className="text-[10px] text-slate-400">
                {step === 1 && 'نوع تراکنش را انتخاب کنید'}
                {step === 2 && 'نوع تراکنش را انتخاب کنید'}
                {step === 3 &&
                  (direction === 'deposit'
                    ? 'مبلغ را به کیف پول مونس واریز کنید'
                    : 'مبلغ را از کیف پول مونس برداشت کنید')}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {completed ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">عملیات با موفقیت ثبت شد</h4>
            <p className="text-[11px] text-slate-500">جزئیات در بخش تراکنش‌ها ثبت گردید.</p>
          </div>
        ) : (
          <>
            {/* ═══ مرحله ۱: انتخاب جهت ═══ */}
            {step === 1 && (
              <div className="py-3">
                <p className="text-[11px] text-slate-500 text-center mb-4">
                  نوع عملیات را انتخاب کنید
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDirection('withdraw');
                      setStep(2);
                    }}
                    className="p-5 rounded-2xl bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 flex flex-col items-center gap-2 transition cursor-pointer active:scale-98"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                      <ArrowDownCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-orange-900">برداشت</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDirection('deposit');
                      setStep(2);
                    }}
                    className="p-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 flex flex-col items-center gap-2 transition cursor-pointer active:scale-98"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <PlusCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-900">واریز</span>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ مرحله ۲: انتخاب کانال ═══ */}
            {step === 2 && (
              <div className="grid grid-cols-3 gap-2 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setChannel('crypto');
                    setStep(3);
                    setAmount(0);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition cursor-pointer active:scale-98 ${
                    channel === 'crypto'
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
                    <Coins className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">ارز</span>
                  <span className="text-[9px] text-slate-500">USDT</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setChannel('rial');
                    setStep(3);
                    setAmount(0);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition cursor-pointer active:scale-98 ${
                    channel === 'rial'
                      ? 'bg-blue-50 border-blue-400'
                      : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">ریال</span>
                  <span className="text-[9px] text-slate-500">بانکی</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setChannel('internal');
                    setStep(3);
                    setAmount(0);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition cursor-pointer active:scale-98 ${
                    channel === 'internal'
                      ? 'bg-purple-50 border-purple-400'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center">
                    <UserRound className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">داخلی</span>
                  <span className="text-[9px] text-slate-500">مونس</span>
                </button>
              </div>
            )}

            {/* ═══ مرحله ۳: فرم ═══ */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* ─── واریز ارز ─── */}
                {direction === 'deposit' && channel === 'crypto' && (
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-3">
                    <p className="text-[11px] font-bold text-emerald-900">
                      واریز ارز (USDT) به کیف پول شما در شبکه TRC20
                    </p>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500">شبکه:</span>
                      <span className="font-bold text-slate-800">TRC20 (ترون)</span>
                    </div>
                    <div className="bg-white rounded-xl border border-emerald-200 px-3 py-2">
                      <span className="text-[10px] text-slate-500 block mb-1">
                        آدرس کیف پول شما:
                      </span>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] font-bold text-slate-800 break-all">
                          {MY_WALLET_TRC20}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(MY_WALLET_TRC20, 'w')}
                          className="text-emerald-600 p-1 cursor-pointer"
                        >
                          {copiedKey === 'w' ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-[10px] text-amber-900 leading-relaxed">
                        توجه: واریز ارز به این آدرس فقط در شبکه TRC20 انجام شود. مسئولیت اشتباه در انتخاب شبکه بر عهده کاربر است.
                      </span>
                    </div>
                  </div>
                )}

                {/* ─── واریز ریال ─── */}
                {direction === 'deposit' && channel === 'rial' && (
                  <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 space-y-3">
                    <p className="text-[11px] font-bold text-blue-900">
                      واریز ریالی به حساب بانکی شما (متصل به کیف پول مونس)
                    </p>
                    <div className="bg-white rounded-xl border border-blue-200 px-3 py-2 space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-0.5">شناسه شبا:</span>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-bold text-slate-800">
                            {MY_SHEBA}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(MY_SHEBA, 's')}
                            className="text-blue-600 p-1 cursor-pointer"
                          >
                            {copiedKey === 's' ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="border-t border-blue-100 pt-2">
                        <span className="text-[10px] text-slate-500 block mb-0.5">شماره کارت:</span>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-bold text-slate-800">
                            {MY_CARD}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(MY_CARD, 'c')}
                            className="text-blue-600 p-1 cursor-pointer"
                          >
                            {copiedKey === 'c' ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-[10px] text-amber-900 leading-relaxed">
                        توجه: واریز ریالی به این حساب فقط از حساب‌های به نام خودتان امکان‌پذیر است.
                      </span>
                    </div>
                  </div>
                )}

                {/* ─── واریز داخلی ─── */}
                {direction === 'deposit' && channel === 'internal' && (
                  <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 space-y-3">
                    <p className="text-[11px] font-bold text-purple-900">
                      واریز داخلی به شناسه کاربری مونس شما
                    </p>
                    <div className="bg-white rounded-xl border border-purple-200 px-3 py-2">
                      <span className="text-[10px] text-slate-500 block mb-0.5">
                        شناسه کاربری مونس شما:
                      </span>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[11px] font-bold text-slate-800">
                          {MY_MOUNES_ID}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(MY_MOUNES_ID, 'm')}
                          className="text-purple-600 p-1 cursor-pointer"
                        >
                          {copiedKey === 'm' ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-[10px] text-amber-900 leading-relaxed">
                        توجه: واریز داخلی به این شناسه فقط از کاربران مونس امکان‌پذیر است.
                      </span>
                    </div>
                  </div>
                )}

                {/* ─── برداشت ارز ─── */}
                {direction === 'withdraw' && channel === 'crypto' && (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      <span className="text-[11px] text-emerald-900 font-bold">
                        برداشت ارز (USDT) به آدرس کیف پول مقصد
                      </span>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        آدرس کیف پول مقصد (شبکه TRC20):
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={destWallet}
                          onChange={(e) => setDestWallet(e.target.value)}
                          placeholder="T..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pr-3 pl-20 text-[11px] font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => handlePaste(setDestWallet)}
                          className="absolute left-2 top-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Clipboard className="w-3 h-3" />
                          <span>چسباندن</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
                      <span className="text-slate-500">شبکه:</span>
                      <span className="font-bold text-slate-800">TRC20 (ترون)</span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-700">
                          مقدار (USDT):
                        </label>
                        <span className="text-[10px] text-slate-500">
                          موجودی: {balanceUsdt.toLocaleString('fa-IR')} USDT
                        </span>
                      </div>
                      <input
                        type="text"
                        value={amount.toString()}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
                          setAmount(v);
                        }}
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-center font-black text-lg text-slate-900 font-display focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                      {[10, 50, 100].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAmount(a)}
                          className="py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 cursor-pointer"
                        >
                          {a.toLocaleString('fa-IR')} تتر
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── برداشت ریال ─── */}
                {direction === 'withdraw' && channel === 'rial' && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                      <span className="text-[11px] text-blue-900 font-bold">
                        برداشت ریالی به شماره شبا یا کارت مقصد
                      </span>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        شماره کارت یا شبا مقصد:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={destCard}
                          onChange={(e) => setDestCard(e.target.value)}
                          placeholder="۶۰۳۷ - ۹۹۱۸ - ۴۳۲۱ - ۷۸۰۹ یا IR..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pr-3 pl-20 text-[11px] font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handlePaste(setDestCard)}
                          className="absolute left-2 top-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Clipboard className="w-3 h-3" />
                          <span>چسباندن</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-700">مبلغ (ریال):</label>
                        <span className="text-[10px] text-slate-500">
                          موجودی: {balanceRial.toLocaleString('fa-IR')} ریال
                        </span>
                      </div>
                      <input
                        type="text"
                        value={amount.toLocaleString('fa-IR')}
                        onChange={(e) => {
                          const v = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                          setAmount(v);
                        }}
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-center font-black text-lg text-slate-900 font-display focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                      {[5000000, 50000000, 500000000].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAmount(a)}
                          className="py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 cursor-pointer"
                        >
                          {(a / 1000000).toLocaleString('fa-IR')} م
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── برداشت داخلی ─── */}
                {direction === 'withdraw' && channel === 'internal' && (
                  <div className="space-y-3">
                    <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                      <span className="text-[11px] text-purple-900 font-bold">
                        برداشت داخلی به شناسه کاربری مونس مقصد
                      </span>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        شناسه کاربری مونس مقصد:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={destMounesId}
                          onChange={(e) => setDestMounesId(e.target.value)}
                          placeholder="username@mounes"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pr-3 pl-20 text-[11px] font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => handlePaste(setDestMounesId)}
                          className="absolute left-2 top-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Clipboard className="w-3 h-3" />
                          <span>چسباندن</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-700">مبلغ (ریال):</label>
                        <span className="text-[10px] text-slate-500">
                          موجودی: {balanceRial.toLocaleString('fa-IR')} ریال
                        </span>
                      </div>
                      <input
                        type="text"
                        value={amount.toLocaleString('fa-IR')}
                        onChange={(e) => {
                          const v = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
                          setAmount(v);
                        }}
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-center font-black text-lg text-slate-900 font-display focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                      {[5000000, 50000000, 500000000].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setAmount(a)}
                          className="py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 cursor-pointer"
                        >
                          {(a / 1000000).toLocaleString('fa-IR')} م
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* دکمه ثبت */}
                <button
                  type="submit"
                  disabled={isProcessing || (direction === 'withdraw' && amount <= 0)}
                  className={`w-full py-3 text-xs font-bold rounded-2xl shadow-md transition active:scale-98 cursor-pointer disabled:opacity-50 ${
                    direction === 'deposit'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      : 'bg-orange-500 hover:bg-orange-400 text-white'
                  }`}
                >
                  {isProcessing
                    ? 'در حال پردازش...'
                    : direction === 'deposit'
                    ? 'تایید و واریز'
                    : 'تایید و برداشت'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};