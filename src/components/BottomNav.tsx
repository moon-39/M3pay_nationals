import React from 'react';
import { LayoutGrid, Store, FileText, ArrowLeftRight, Wallet } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 absolute bottom-0 inset-x-0 z-40">
      <div className="flex items-center justify-around">
        {/* تب ۱: خانه */}
        <button
          id="nav-btn-home"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'home'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">خانه</span>
        </button>

        {/* تب ۲: جیب‌ها */}
        <button
          id="nav-btn-pockets"
          onClick={() => onTabChange('pockets')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'pockets'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Wallet className={`w-5 h-5 ${activeTab === 'pockets' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">جیب‌ها</span>
        </button>

        {/* تب ۳: فروشگاه‌ها */}
        <button
          id="nav-btn-stores"
          onClick={() => onTabChange('stores')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'stores'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Store className={`w-5 h-5 ${activeTab === 'stores' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">فروشگاه‌ها</span>
        </button>

        {/* تب ۴: تراکنش‌ها */}
        <button
          id="nav-btn-transactions"
          onClick={() => onTabChange('transactions')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'transactions'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className={`w-5 h-5 ${activeTab === 'transactions' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">تراکنش‌ها</span>
        </button>

        {/* تب ۵: انتقال وجه */}
        <button
          id="nav-btn-transfer"
          onClick={() => onTabChange('transfer')}
          className={`flex flex-col items-center gap-1 transition py-1 px-3 cursor-pointer ${
            activeTab === 'transfer'
              ? 'text-emerald-500 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <ArrowLeftRight className={`w-5 h-5 ${activeTab === 'transfer' ? 'stroke-emerald-500' : ''}`} />
          <span className="text-[10px]">انتقال</span>
        </button>
      </div>
    </nav>
  );
};