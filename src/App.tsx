/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { PocketsScreen } from './screens/PocketsScreen';
import { StoresScreen } from './screens/StoresScreen';
import { TransferScreen } from './screens/TransferScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { QrScreen } from './screens/QrScreen';

// Modals
import { SwapModal } from './components/modals/SwapModal';
import { DepositWithdrawModal } from './components/modals/DepositWithdrawModal';
import { StoreDetailModal } from './components/modals/StoreDetailModal';
import { ForeignDetailModal } from './components/modals/ForeignDetailModal';
import { InvestmentModal } from './components/modals/InvestmentModal';
import { TransactionReceiptModal } from './components/modals/TransactionReceiptModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { BillPaymentModal } from './components/modals/BillPaymentModal';
import { MobileRechargeModal } from './components/modals/MobileRechargeModal';
import { CryptoTransactionModal } from './components/modals/CryptoTransactionModal';

// Data & Types
import {
  TabType,
  PartnerStore,
  ForeignCitizenService,
  InvestmentFund,
  TransactionItem,
  AppNotification,
} from './types';
import {
  INITIAL_RIAL_BALANCE,
  INITIAL_USDT_BALANCE,
  USDT_RIAL_RATE,
  INITIAL_TRANSACTIONS,
  NOTIFICATIONS,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [transferMode, setTransferMode] = useState<'mounes' | 'card' | 'sheba'>('mounes');

  // Balances
  const [balanceRial, setBalanceRial] = useState<number>(INITIAL_RIAL_BALANCE);
  const [balanceUsdt, setBalanceUsdt] = useState<number>(INITIAL_USDT_BALANCE);
  const [rate] = useState<number>(USDT_RIAL_RATE);

  // Lists
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);

  // Modals
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [depositWithdrawState, setDepositWithdrawState] = useState<{
    isOpen: boolean;
    type: 'deposit' | 'withdraw';
  }>({ isOpen: false, type: 'deposit' });
  const [isCryptoTransactionOpen, setIsCryptoTransactionOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<PartnerStore | null>(null);
  const [selectedForeignService, setSelectedForeignService] = useState<ForeignCitizenService | null>(null);
  const [selectedFund, setSelectedFund] = useState<InvestmentFund | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isBillsOpen, setIsBillsOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mainScrollRef = useRef<HTMLElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleTabChange = (newTab: TabType) => {
    setActiveTab(newTab);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  };

  // Instant Currency Swap
  const handleExecuteSwap = (fromType: 'rial' | 'usdt', fromAmount: number, toAmount: number) => {
    if (fromType === 'rial') {
      setBalanceRial((prev) => Math.max(0, prev - fromAmount));
      setBalanceUsdt((prev) => prev + toAmount);
      const newTx: TransactionItem = {
        id: `tx-swp-${Date.now().toString().slice(-6)}`,
        title: `تبدیل ریال به ${toAmount} تتر (USDT)`,
        category: 'crypto',
        categoryLabel: 'تبدیل آنی جیب ارزی',
        type: 'outflow',
        amount: fromAmount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'تبدیل آنی موفق',
        trackingCode: `SWP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        note: `تسویه به نرخ ${rate.toLocaleString('fa-IR')} ریال`,
      };
      setTransactions((prev) => [newTx, ...prev]);
    } else {
      setBalanceUsdt((prev) => Math.max(0, prev - fromAmount));
      setBalanceRial((prev) => prev + toAmount);
      const newTx: TransactionItem = {
        id: `tx-swp-${Date.now().toString().slice(-6)}`,
        title: `تبدیل ${fromAmount} تتر به ریال`,
        category: 'crypto',
        categoryLabel: 'تبدیل تتر به ریال',
        type: 'inflow',
        amount: toAmount,
        date: 'امروز | چند لحظه پیش',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        status: 'successful',
        statusLabel: 'واریز به کیف پول',
        trackingCode: `SWP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        note: `نقد کردن تتر در سامانه مونس`,
      };
      setTransactions((prev) => [newTx, ...prev]);
    }
    triggerToast('موجودی کیف پول و جیب ارزی بروزرسانی شد');
  };

  // Deposit or Withdraw (کیف پول ریالی)
  const handleExecuteDepositWithdraw = (
    type: 'deposit' | 'withdraw',
    amount: number,
    tx: TransactionItem
  ) => {
    if (type === 'deposit') {
      setBalanceRial((prev) => prev + amount);
      triggerToast(`مبلغ ${amount.toLocaleString('fa-IR')} ریال به موجودی اضافه شد`);
    } else {
      setBalanceRial((prev) => Math.max(0, prev - amount));
      triggerToast(`مبلغ ${amount.toLocaleString('fa-IR')} ریال برداشت شد`);
    }
    setTransactions((prev) => [tx, ...prev]);
  };

  // Crypto Transaction (واریز/برداشت جیب ارزی)
  const handleCryptoTransaction = (tx: TransactionItem) => {
    const isUsdt = tx.currency === 'usdt';
    if (tx.type === 'inflow') {
      if (isUsdt) setBalanceUsdt((prev) => prev + tx.amount);
      else setBalanceRial((prev) => prev + tx.amount);
    } else {
      if (isUsdt) setBalanceUsdt((prev) => Math.max(0, prev - tx.amount));
      else setBalanceRial((prev) => Math.max(0, prev - tx.amount));
    }
    setTransactions((prev) => [tx, ...prev]);
    triggerToast('تراکنش با موفقیت در سامانه ثبت گردید');
  };

  // Add generic transaction
  const handleAddTransaction = (tx: TransactionItem) => {
    if (tx.type === 'outflow') {
      setBalanceRial((prev) => Math.max(0, prev - tx.amount));
    } else {
      setBalanceRial((prev) => prev + tx.amount);
    }
    if (tx.cashbackEarned) {
      setBalanceRial((prev) => prev + tx.cashbackEarned!);
      triggerToast(`تراکنش ثبت شد + ${tx.cashbackEarned.toLocaleString('fa-IR')} ریال پاداش نقدی واریز گردید!`);
    } else {
      triggerToast('تراکنش با موفقیت در سامانه ثبت گردید');
    }
    setTransactions((prev) => [tx, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    triggerToast('تمامی اعلان‌ها خوانده شدند');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center text-slate-800 antialiased p-0 sm:p-4 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Mobile Simulator Frame */}
      <div className="w-full sm:max-w-md bg-slate-50 min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border border-slate-700/30">
        <Header
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={unreadCount}
        />

        <main ref={mainScrollRef} className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          {activeTab === 'home' && (
            <HomeScreen
              onNavigateTab={handleTabChange}
              onOpenTransferMode={(mode) => {
                setTransferMode(mode);
                handleTabChange('transfer');
              }}
              onOpenBills={() => setIsBillsOpen(true)}
              onOpenRecharge={() => setIsRechargeOpen(true)}
              onOpenCrypto={() => setIsSwapOpen(true)}
              onOpenQr={() => handleTabChange('qr')}
              onSelectForeignService={(service) => setSelectedForeignService(service)}
              onSelectFund={(fund) => setSelectedFund(fund)}
            />
          )}

          {activeTab === 'pockets' && (
            <PocketsScreen
              balanceRial={balanceRial}
              balanceUsdt={balanceUsdt}
              rate={rate}
              onDeposit={() => setDepositWithdrawState({ isOpen: true, type: 'deposit' })}
              onWithdraw={() => setDepositWithdrawState({ isOpen: true, type: 'withdraw' })}
              onOpenSwap={() => setIsSwapOpen(true)}
              onOpenCryptoTransaction={() => setIsCryptoTransactionOpen(true)}
              onCopySuccess={triggerToast}
            />
          )}

          {activeTab === 'stores' && (
            <StoresScreen
              onSelectStore={(store) => setSelectedStore(store)}
              onQuickSimulatePurchase={(store) => {
                const amount = 3000000;
                const percentMatch = store.cashback.match(/\d+/);
                const percent = percentMatch ? parseInt(percentMatch[0], 10) : 10;
                const cashback = Math.round(amount * (percent / 100));
                const newTx: TransactionItem = {
                  id: `tx-str-${Date.now().toString().slice(-6)}`,
                  title: `خرید از ${store.name}`,
                  category: 'store',
                  categoryLabel: 'خرید با کد مونس',
                  type: 'outflow',
                  amount: amount,
                  date: 'امروز | چند لحظه پیش',
                  time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
                  status: 'successful',
                  statusLabel: 'تراکنش موفق مونس‌پی',
                  trackingCode: `STR-${Math.floor(10000000 + Math.random() * 90000000)}`,
                  cashbackEarned: cashback,
                  counterparty: store.name,
                  note: `دریافت ${percent}٪ کش‌بک آنی`,
                };
                handleAddTransaction(newTx);
              }}
            />
          )}

          {activeTab === 'transfer' && (
            <TransferScreen
              balanceRial={balanceRial}
              initialMode={transferMode}
              onCompleteTransfer={handleAddTransaction}
              onOpenQrScreen={() => handleTabChange('qr')}
              onCopySuccess={triggerToast}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsScreen
              transactions={transactions}
              onSelectTransaction={(tx) => setSelectedReceipt(tx)}
            />
          )}

          {activeTab === 'qr' && (
            <QrScreen
              onSimulateQrPayment={handleAddTransaction}
              onCopySuccess={triggerToast}
            />
          )}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

        <Toast message={toastMessage} />

        {/* Modals */}
        <SwapModal
          isOpen={isSwapOpen}
          onClose={() => setIsSwapOpen(false)}
          balanceRial={balanceRial}
          balanceUsdt={balanceUsdt}
          rate={rate}
          onExecuteSwap={handleExecuteSwap}
        />

        <DepositWithdrawModal
          isOpen={depositWithdrawState.isOpen}
          initialType={depositWithdrawState.type}
          onClose={() => setDepositWithdrawState({ isOpen: false, type: 'deposit' })}
          balanceRial={balanceRial}
          onExecute={handleExecuteDepositWithdraw}
        />

        <CryptoTransactionModal
          isOpen={isCryptoTransactionOpen}
          onClose={() => setIsCryptoTransactionOpen(false)}
          balanceUsdt={balanceUsdt}
          balanceRial={balanceRial}
          onExecute={handleCryptoTransaction}
        />

        <StoreDetailModal
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
          onSimulatePurchase={(_, __, tx) => handleAddTransaction(tx)}
          onCopySuccess={triggerToast}
        />

        <ForeignDetailModal
          service={selectedForeignService}
          onClose={() => setSelectedForeignService(null)}
          onSubmitApplication={(title) => {
            triggerToast(`درخواست ثبت‌نام خدمت "${title}" با موفقیت ارسال شد`);
          }}
        />

        <InvestmentModal
          fund={selectedFund}
          onClose={() => setSelectedFund(null)}
          onExecuteInvestment={(_, __, tx) => handleAddTransaction(tx)}
        />

        <TransactionReceiptModal
          tx={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          onCopySuccess={triggerToast}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
        />

        <BillPaymentModal
          isOpen={isBillsOpen}
          onClose={() => setIsBillsOpen(false)}
          onPayBill={handleAddTransaction}
        />

        <MobileRechargeModal
          isOpen={isRechargeOpen}
          onClose={() => setIsRechargeOpen(false)}
          onExecuteRecharge={handleAddTransaction}
        />
      </div>
    </div>
  );
}