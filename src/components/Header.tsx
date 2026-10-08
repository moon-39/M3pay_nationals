import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications, unreadCount = 2 }) => {
  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 px-5 pt-3.5 pb-3 border-b border-slate-100 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <div>
          <span className="text-[11px] text-slate-400 block">سطح طلایی • امنیت ۲‌مرحله‌ای</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Button */}
        <button
          id="btn-header-notifications"
          onClick={onOpenNotifications}
          aria-label="اعلان‌ها"
          className="w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-slate-200 text-slate-700 flex items-center justify-center relative transition active:scale-95"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
          )}
        </button>

        {/* Brand Logo Icon */}
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-slate-900 border border-slate-800">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1UtQEFig09tE8UiakTCpEh1R5fG8idZtRBW6YCl8K_epo7nEBv2nS7QtVTWav3MnwuXIM_AF0XQPbeEt5GPyoCLBUGL7xIG9ZkBu-57-iE_QCRilbqeZ1dCYomwHTMaWJHmZe58iNKLTrOmhyQBlvcc0YWgsXsPgNhWPVTnEnNMiBeKvbtPLd_9YGIiLMuct1a27dFHlLIevrZ_crVaPYHFSmk1bk0X_uSRyC_vnIT8giUjYCn0PYWM4Hg"
            alt="مونس پرداخت"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain p-1"
          />
        </div>
      </div>
    </header>
  );
};