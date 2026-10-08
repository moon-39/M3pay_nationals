import React, { useState } from 'react';
import { X, CheckCircle2, Share2, Copy, Check, ShieldCheck, Printer } from 'lucide-react';
import { TransactionItem } from '../../types';

interface TransactionReceiptModalProps {
  tx: TransactionItem | null;
  onClose: () => void;
  onCopySuccess: (text: string) => void;
}

export const TransactionReceiptModal: React.FC<TransactionReceiptModalProps> = ({
  tx,
  onClose,
  onCopySuccess,
}) => {
  if (!tx) return null;

  const [copied, setCopied] = useState(false);

  const handleCopyReceipt = () => {
    const text = `رسید تراکنش مونس پرداخت\nعنوان: ${tx.title}\nمبلغ: ${tx.amount.toLocaleString('fa-IR')} ریال\nکد رهگیری: ${tx.trackingCode}\nتاریخ: ${tx.date} - ${tx.time}\nوضعیت: ${tx.statusLabel}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopySuccess('متن رسید کپی شد');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs font-bold text-slate-900">رسید دیجیتال تراکنش</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status and Amount Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-center space-y-2 relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h4 className="text-xs font-extrabold text-slate-900">{tx.title}</h4>
          <span className="text-[11px] text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold inline-block">
            {tx.statusLabel}
          </span>

          <div className="pt-2">
            <span className="text-2xl font-black text-slate-900 font-display">
              {tx.type === 'inflow' ? '+' : '-'} {tx.amount.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs font-bold text-slate-500 mr-1.5">ریال</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              ({Math.floor(tx.amount / 10).toLocaleString('fa-IR')} تومان)
            </span>
          </div>

          {tx.cashbackEarned && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold py-1.5 px-3 rounded-xl mt-2">
              پاداش نقدی (کش‌بک) این تراکنش: {tx.cashbackEarned.toLocaleString('fa-IR')} ریال
            </div>
          )}
        </div>

        {/* Detailed Metadata */}
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-600">
            <span className="text-slate-400">شماره پیگیری شاپرک:</span>
            <span className="font-mono font-bold text-slate-800 tracking-wider">{tx.trackingCode}</span>
          </div>

          <div className="flex justify-between items-center text-slate-600">
            <span className="text-slate-400">زمان و تاریخ:</span>
            <span className="font-medium text-slate-800">{tx.date} • {tx.time}</span>
          </div>

          {tx.counterparty && (
            <div className="flex justify-between items-center text-slate-600">
              <span className="text-slate-400">طرف حساب:</span>
              <span className="font-bold text-slate-800">{tx.counterparty}</span>
            </div>
          )}

          {tx.cardOrAccount && (
            <div className="flex justify-between items-center text-slate-600">
              <span className="text-slate-400">کارت / حساب مبدا:</span>
              <span className="font-mono font-medium text-slate-700 text-[11px]">{tx.cardOrAccount}</span>
            </div>
          )}

          {tx.note && (
            <div className="flex justify-between items-center text-slate-600 border-t border-slate-100 pt-2">
              <span className="text-slate-400">بابت:</span>
              <span className="font-medium text-slate-700">{tx.note}</span>
            </div>
          )}
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>تایید شده در سامانه یکپارچه مونس و شاپرک بانک مرکزی</span>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopyReceipt}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'رسید کپی شد' : 'کپی مشخصات رسید'}</span>
          </button>

          <button
            onClick={() => onCopySuccess('تصویر رسید برای اشتراک‌گذاری آماده گردید')}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>اشتراک‌گذاری</span>
          </button>
        </div>
      </div>
    </div>
  );
};
