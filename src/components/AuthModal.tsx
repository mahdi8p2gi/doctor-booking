import React, { useState } from 'react';
import { X, Lock, Phone, User, Sparkles, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { name: string; phone: string }) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  addToast,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  // Form States
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [forgotPhone, setForgotPhone] = useState('');
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Handle Form Submissions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login') {
        if (!phone || !password) {
          addToast('خطا در ورود', 'لطفاً شماره موبایل و رمز عبور را وارد کنید.', 'error');
          return;
        }
        // Simulated successful login
        const userName = phone === '09123456789' ? 'سهراب سپهری' : 'کاربر گرامی';
        onAuthSuccess({ name: userName, phone });
        addToast('ورود موفقیت‌آمیز', `${userName} عزیز، به دکترینو خوش آمدید.`, 'success');
        onClose();
      } else if (mode === 'signup') {
        if (!name || !phone || !password) {
          addToast('خطا در ثبت‌نام', 'تکمیل تمامی فیلدها الزامی است.', 'error');
          return;
        }
        if (!agreeTerms) {
          addToast('پذیرش قوانین', 'لطفاً قوانین و مقررات را تایید کنید.', 'warning');
          return;
        }
        onAuthSuccess({ name, phone });
        addToast('حساب کاربری ایجاد شد', `${name} عزیز، ثبت‌نام شما با موفقیت انجام شد.`, 'success');
        onClose();
      } else {
        // Forgot password flow
        if (!forgotPhone) {
          addToast('خطا', 'لطفاً شماره موبایل خود را وارد کنید.', 'error');
          return;
        }
        addToast('کد بازیابی ارسال شد', 'کد فعال‌سازی جدید به شماره موبایل شما پیامک شد.', 'success');
        setMode('login');
      }
    }, 1200);
  };

  // Quick autofill helper
  const handleQuickLogin = () => {
    setPhone('09123456789');
    setPassword('123456');
    addToast('اطلاعات نمونه درج شد', 'اکنون روی دکمه ورود کلیک کنید.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark luxury backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white/95 shadow-2xl border border-stone-100/80 transition-all duration-300 transform scale-100 flex flex-col glass-effect">
        
        {/* Top Accent Gradient */}
        <div className="h-2 w-full bg-gradient-to-l from-emerald-600 via-teal-500 to-amber-500" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors p-2 rounded-full hover:bg-stone-100/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          
          {/* Logo & Subtitle */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mb-3 animate-pulse-soft">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              {mode === 'login' && 'ورود به حساب کاربری'}
              {mode === 'signup' && 'عضویت در دکترینو'}
              {mode === 'forgot' && 'بازیابی رمز عبور'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-light">
              {mode === 'login' && 'به پلتفرم لوکس نوبت‌دهی هوشمند خوش آمدید'}
              {mode === 'signup' && 'با عضویت سریع، به بهترین پزشکان کشور دسترسی یابید'}
              {mode === 'forgot' && 'شماره همراه خود را جهت بازیابی رمز وارد کنید'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NAME FIELD (Only in Signup) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">نام و نام خانوادگی</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سهراب سپهری"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800"
                  />
                </div>
              </div>
            )}

            {/* PHONE FIELD (For Login & Signup) */}
            {mode !== 'forgot' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">شماره موبایل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 tracking-wider text-left dir-ltr"
                  />
                </div>
              </div>
            )}

            {/* PHONE FIELD (For Forgot Password only) */}
            {mode === 'forgot' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">شماره موبایل ثبت‌شده</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 tracking-wider text-left dir-ltr"
                  />
                </div>
              </div>
            )}

            {/* PASSWORD FIELD (For Login & Signup) */}
            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-stone-700">رمز عبور</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-emerald-600 hover:underline"
                    >
                      فراموشی رمز؟
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10 pl-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 tracking-widest text-left dir-ltr"
                  />
                </div>
              </div>
            )}

            {/* TERMS & CONDITIONS (Only in Signup) */}
            {mode === 'signup' && (
              <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-[11px] text-stone-500 leading-tight">
                  تمامی قوانین و مقررات نوبت‌دهی آنلاین را مطالعه کرده و می‌پذیرم.
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-emerald-900/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'ورود به حساب کاربری'}
                    {mode === 'signup' && 'ثبت نام و ایجاد حساب'}
                    {mode === 'forgot' && 'ارسال کد بازیابی'}
                  </span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Mock Login (Only on Login Mode) */}
          {mode === 'login' && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200/50 text-right">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  تست و بررسی سریع
                </span>
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="text-[11px] text-amber-700 underline font-medium hover:text-amber-900"
                >
                  درج اطلاعات پیش‌فرض
                </button>
              </div>
              <p className="text-[11px] text-stone-600 font-light">
                شماره موبایل: <code className="font-mono font-bold text-stone-900">09123456789</code> | رمز عبور: <code className="font-mono font-bold text-stone-900">123456</code>
              </p>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
            {mode === 'login' ? (
              <p>
                هنوز عضو دکترینو نشده‌اید؟{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-emerald-600 hover:underline font-semibold"
                >
                  ایجاد حساب کاربری جدید
                </button>
              </p>
            ) : (
              <p>
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-emerald-600 hover:underline font-semibold"
                >
                  ورود به حساب
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
