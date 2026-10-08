import React from 'react';
import { SmartCard } from '../components/SmartCard';
import { CryptoPocket } from '../components/CryptoPocket';

interface PocketsScreenProps {
  balanceRial: number;
  balanceUsdt: number;
  rate: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  onOpenSwap: () => void;
  onOpenCryptoTransaction: () => void;
  onCopySuccess: (text: string) => void;
}

export const PocketsScreen: React.FC<PocketsScreenProps> = ({
  balanceRial,
  balanceUsdt,
  rate,
  onDeposit,
  onWithdraw,
  onOpenSwap,
  onOpenCryptoTransaction,
  onCopySuccess,
}) => {
  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="px-1">
        <h1 className="text-base font-extrabold text-slate-900">جیب‌های من</h1>
        <p className="text-[11px] text-slate-500 mt-0.5">
          مدیریت کیف پول ریالی و جیب ارزی تتر
        </p>
      </div>

      {/* کارت هوشمند دیجیتال مونس (ریالی) — دست‌نخورده */}
      <SmartCard
        balanceRial={balanceRial}
        onDeposit={onDeposit}
        onWithdraw={onWithdraw}
        onCopySuccess={onCopySuccess}
      />

      {/* جیب ارزی مونس (تتر) — با دکمه واریز و برداشت */}
      <CryptoPocket
        balanceUsdt={balanceUsdt}
        rate={rate}
        onOpenSwap={onOpenSwap}
        onOpenDepositWithdraw={onOpenCryptoTransaction}
      />
    </div>
  );
};