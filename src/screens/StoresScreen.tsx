import React, { useState } from 'react';
import { Search, ChevronLeft, Star, ShoppingBag, Sparkles, MapPin } from 'lucide-react';
import { PARTNER_STORES } from '../data/mockData';
import { PartnerStore } from '../types';

interface StoresScreenProps {
  onSelectStore: (store: PartnerStore) => void;
  onQuickSimulatePurchase: (store: PartnerStore) => void;
}

export const StoresScreen: React.FC<StoresScreenProps> = ({
  onSelectStore,
  onQuickSimulatePurchase,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStores = PARTNER_STORES.filter((store) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'supermarket' && store.category === 'supermarket') ||
      (selectedCategory === 'digital' && store.category === 'digital') ||
      (selectedCategory === 'restaurant' && store.category === 'restaurant') ||
      (selectedCategory === 'culture_health' && (store.category === 'culture' || store.category === 'health')) ||
      (selectedCategory === 'fashion' && store.category === 'fashion');

    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.branches.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 space-y-3.5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-4.5 rounded-3xl border border-emerald-500/20 space-y-2 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            مونس‌پی همکاران
          </span>
          <span className="text-xs text-slate-300 font-medium">۱۰ فروشگاه فعال</span>
        </div>
        <h2 className="text-sm font-extrabold text-white">
          ۱۰ فروشگاه برگزیده با کش‌بک آنی نقدی
        </h2>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          در هر خرید حضوری با QR یا درگاه آنلاین، درصد کش‌بک بلافاصله به کیف پول مونس واریز می‌گردد.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجوی فروشگاه، دسته یا شهر..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pr-9 pl-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 text-xs">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          همه (۱۰)
        </button>

        <button
          onClick={() => setSelectedCategory('supermarket')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            selectedCategory === 'supermarket'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          سوپرمارکت و هایپر
        </button>

        <button
          onClick={() => setSelectedCategory('digital')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            selectedCategory === 'digital'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          کالای دیجیتال
        </button>

        <button
          onClick={() => setSelectedCategory('restaurant')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            selectedCategory === 'restaurant'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          رستوران و غذا
        </button>

        <button
          onClick={() => setSelectedCategory('culture_health')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            selectedCategory === 'culture_health'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          کتاب و سلامت
        </button>

        <button
          onClick={() => setSelectedCategory('fashion')}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
            selectedCategory === 'fashion'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          مد و پوشاک
        </button>
      </div>

      {/* Stores List */}
      <div className="space-y-2.5">
        {filteredStores.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            هیچ فروشگاهی با مشخصات مورد نظر یافت نشد.
          </div>
        ) : (
          filteredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => onSelectStore(store)}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-emerald-300 active:scale-99 transition cursor-pointer"
            >
              <div className="space-y-1 pr-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900">{store.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    {store.cashback}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{store.rating}</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-500">{store.categoryLabel}</p>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 pt-0.5">
                  {store.paymentMethods.map((method, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {method}
                    </span>
                  ))}
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <MapPin className="w-2.5 h-2.5" />
                    {store.branches}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickSimulatePurchase(store);
                  }}
                  className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold flex items-center gap-1 transition"
                  title="شبیه‌سازی خرید با کش‌بک"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">خرید</span>
                </button>

                <div className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
