export type TabType = 'home' | 'pockets' | 'stores' | 'transfer' | 'transactions' | 'qr';

export interface PartnerStore {
  id: number;
  name: string;
  category: 'supermarket' | 'digital' | 'restaurant' | 'culture' | 'fashion' | 'health';
  categoryLabel: string;
  cashback: string;
  discountBadge?: string;
  rating: number;
  branches: string;
  description: string;
  paymentMethods: string[];
  bannerColor?: string;
  image?: string;
}

export interface TransactionItem {
  id: string;
  title: string;
  category: 'store' | 'transfer' | 'bill' | 'topup' | 'crypto';
  categoryLabel: string;
  type: 'inflow' | 'outflow';
  amount: number;
  currency?: 'rial' | 'usdt';
  date: string;
  time: string;
  status: 'successful' | 'pending' | 'failed';
  statusLabel: string;
  trackingCode: string;
  cashbackEarned?: number;
  counterparty?: string;
  cardOrAccount?: string;
  note?: string;
}

export interface ForeignCitizenService {
  id: string;
  title: string;
  badge: string;
  badgeType: 'emerald' | 'blue' | 'amber' | 'rose' | 'indigo';
  description: string;
  iconName: string;
  details: string[];
  documentsRequired: string[];
}

export interface InvestmentFund {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  yieldRate: string;
  backing: string;
  description: string;
  minDeposit: string;
  buttonLabel: string;
  buttonColor: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'security' | 'transaction' | 'system' | 'reward';
}