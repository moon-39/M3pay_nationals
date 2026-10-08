import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Send, ShieldCheck } from 'lucide-react';
import { ForeignCitizenService } from '../../types';

interface ForeignDetailModalProps {
  service: ForeignCitizenService | null;
  onClose: () => void;
  onSubmitApplication: (serviceName: string) => void;
}

export const ForeignDetailModal: React.FC<ForeignDetailModalProps> = ({
  service,
  onClose,
  onSubmitApplication,
}) => {
  if (!service) return null;

  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idNumber.trim()) {
      alert('لطفاً شماره کد اختصاصی یا مدارک هویتی را وارد نمایید.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSubmitApplication(service.title);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 border border-slate-100 shadow-2xl space-y-4 animate-scaleUp max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-200">
              {service.badge}
            </span>
            <h3 className="text-xs font-bold text-slate-900 mt-1">{service.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">درخواست شما با موفقیت ثبت شد</h4>
            <p className="text-[11px] text-slate-500">
              کارشناسان سامانه مونس در کمتر از ۲ ساعت با شما تماس خواهند گرفت و تاییدیه پیامک می‌شود.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 text-xs">
            {/* Highlights */}
            <div className="bg-teal-50/70 p-3.5 rounded-2xl border border-teal-200 space-y-2">
              <span className="font-bold text-teal-950 block">امکانات و مزایای این خدمت:</span>
              <ul className="space-y-1 text-[11px] text-teal-900">
                {service.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>مدارک لازم:</span>
              </span>
              <div className="flex flex-wrap gap-1 pt-1">
                {service.documentsRequired.map((doc, idx) => (
                  <span key={idx} className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
              <label className="text-xs font-bold text-slate-800 block">ثبت درخواست استعلام و افتتاح:</label>
              <input
                type="text"
                placeholder="کد فراگیر ۱۰ رقمی یا شماره کارت آمایش"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />
              <input
                type="text"
                placeholder="شماره تلفن همراه (جهت دریافت کد پیامکی)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>در حال استعلام از سامانه...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>ثبت درخواست رسمی</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
