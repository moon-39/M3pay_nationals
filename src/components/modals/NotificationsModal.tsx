import React from 'react';
import { X, Bell, Sparkles, ShieldAlert, Info, Check } from 'lucide-react';
import { AppNotification } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'reward':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'system':
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'reward':
        return 'bg-emerald-100';
      case 'security':
        return 'bg-amber-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp max-h-[85vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">اعلان‌ها و پیام‌ها</h3>
              <span className="text-[10px] text-slate-400">پیام‌های امنیتی و کش‌بک‌های واریزی</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold px-2 py-1 rounded-lg hover:bg-emerald-50 transition"
              title="علامت‌گذاری همه به عنوان خوانده شده"
            >
              خوانده شد
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-2xl border transition ${
                notif.isRead ? 'bg-slate-50/70 border-slate-200' : 'bg-white border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-xl ${getIconBg(notif.type)} flex items-center justify-center shrink-0`}>
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
