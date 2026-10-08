import React from 'react';
import { Coins, RefreshCw, ArrowLeftRight } from 'lucide-react';

interface CryptoPocketProps {
  balanceUsdt: number;
  rate: number;
  onOpenSwap: () => void;
  onOpenDepositWithdraw: () => void;
}

export const CryptoPocket: React.FC<CryptoPocketProps> = ({
  balanceUsdt,
  rate,
  onOpenSwap,
  onOpenDepositWithdraw,
}) => {
  const approximateRials = Math.round(balanceUsdt * rate);

  return (
    <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-4.5 text-white relative overflow-hidden shadow-sm">
      {/* Top Details */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-white">
                جیب ارزی مونس (USDT تتر)
              </h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                نقدشوندگی لحظه‌ای
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              کیف پول بین‌المللی بدون کارمزد انتقال درون‌شبکه‌ای
            </p>
          </div>
        </div>
      </div>

      {/* Balances Display Box */}
      <div className="grid grid-cols-2 gap-2 bg-black/40 rounded-2xl p-3 my-2.5 border border-white/5 backdrop-blur-xs">
        <div>
          <span className="text-[10px] text-slate-400 block mb-0.5">موجودی تتر (USDT):</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-emerald-400 font-display">
              {balanceUsdt.toLocaleString('fa-IR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-bold text-white">USDT</span>
          </div>
        </div>

        <div className="border-r border-white/10 pr-3">
          <span className="text-[10px] text-slate-400 block mb-0.5">معادل تقریبی ریالی:</span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-slate-200 font-display">
              {approximateRials.toLocaleString('fa-IR')}
            </span>
            <span className="text-[10px] text-slate-400">ریال</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 mt-2">
        <button
          id="btn-crypto-instant-swap"
          onClick={onOpenSwap}
          className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>تبدیل آنی ریال / تتر</span>
        </button>

        <button
          id="btn-crypto-deposit-withdraw"
          onClick={onOpenDepositWithdraw}
          className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 active:scale-98 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition border border-white/10 cursor-pointer"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>واریز و برداشت</span>
        </button>
      </div>
    </div>
  );
};