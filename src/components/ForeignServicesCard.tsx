import React, { useState } from 'react';
import {
  IdCard,
  Landmark,
  Smartphone,
  Cross,
  GraduationCap,
  ChevronDown,
  ChevronLeft
} from 'lucide-react';
import { FOREIGN_CITIZEN_SERVICES } from '../data/mockData';
import { ForeignCitizenService } from '../types';

interface ForeignServicesCardProps {
  onSelectService: (service: ForeignCitizenService) => void;
}

export const ForeignServicesCard: React.FC<ForeignServicesCardProps> = ({ onSelectService }) => {
  // ⬇️ state باز/بسته بودن لیست - به صورت پیش‌فرض بسته است
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'IdCard':
        return <IdCard className="w-4 h-4" />;
      case 'Landmark':
        return <Landmark className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'Cross':
        return <Cross className="w-4 h-4" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <IdCard className="w-4 h-4" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'emerald':
        return 'bg-teal-100 text-teal-800';
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'amber':
        return 'bg-amber-100 text-amber-800';
      case 'rose':
        return 'bg-rose-100 text-rose-800';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-teal-100 text-teal-800';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
      {/* 🔽 هدر قابل کلیک */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <h2 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          <span>خدمات اتباع و مهاجرین خارجی</span>
        </h2>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-100">
            رسمی و یکپارچه
          </span>
          {/* فلش چرخان */}
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* 🔽 توضیح کوتاه (وقتی بسته است) */}
      {!isOpen && (
        <p className="text-[11px] text-slate-500 leading-relaxed">
          برای مشاهده ۵ خدمت هویتی، بانکی، ارتباطی، درمانی و آموزشی کلیک کنید.
        </p>
      )}

      {/* 🔽 لیست خدمات - فقط وقتی بازه نمایش داده می‌شه */}
      {isOpen && (
        <div className="space-y-2 animate-fadeIn">
          {FOREIGN_CITIZEN_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={(e) => {
                e.stopPropagation(); // جلوگیری از بسته شدن وقتی روی خدمت کلیک می‌شه
                onSelectService(service);
              }}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 active:scale-99 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${getIconBg(service.badgeType)}`}>
                  {getIcon(service.iconName)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    {service.title}
                    <span className="text-[9px] bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                      {service.badge}
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{service.description}</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};