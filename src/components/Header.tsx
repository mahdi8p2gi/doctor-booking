import React, { useState } from 'react';
import { Menu, X, User, LogOut, CalendarCheck, HeartPulse, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine';
  setCurrentPage: (page: 'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine') => void;
  currentUser: { name: string; phone: string } | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  appointmentsCount: number;
}

interface NavItem {
  id: 'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine';
  label: string;
  badge?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  currentUser,
  onLogout,
  onOpenAuth,
  appointmentsCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'doctors', label: 'پزشکان متخصص' },
    { id: 'consultation', label: 'مشاوره آنلاین با پزشک' },
    { id: 'magazine', label: 'مجله سلامت' },
    { id: 'appointments', label: 'نوبت‌های من', badge: appointmentsCount > 0 ? appointmentsCount : undefined },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-100/80 shadow-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Brand */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => {
              setCurrentPage('home');
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-600/10 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse className="w-6 h-6 animate-pulse-soft" />
            </div>
            <div className="text-right">
              <span className="block text-lg font-black tracking-tight text-stone-900">دکترینو</span>
              <span className="block text-[9px] text-stone-400 font-light -mt-1">نوبت‌دهی هوشمند پزشکان</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsUserDropdownOpen(false);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'text-emerald-700 bg-emerald-50/50' 
                      : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white animate-bounce">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User CTA / Profile Section */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-stone-200/80 bg-white hover:border-stone-400 transition-all text-right cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-stone-900">{currentUser.name}</span>
                    <span className="block text-[9px] text-stone-400 font-mono">{currentUser.phone}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown menu */}
                {isUserDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsUserDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white border border-stone-100 shadow-luxury py-2 z-20 text-right animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-stone-100 text-xs">
                        <span className="block text-stone-400">حساب کاربری فعال</span>
                        <span className="font-semibold text-stone-800">{currentUser.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentPage('appointments');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-xs text-stone-600 hover:bg-stone-50 transition-colors flex items-center justify-between"
                      >
                        <span>نوبت‌های من</span>
                        <CalendarCheck className="w-4 h-4 text-stone-400" />
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-xs text-rose-600 hover:bg-rose-50/50 transition-colors flex items-center justify-between border-t border-stone-50"
                      >
                        <span>خروج از حساب</span>
                        <LogOut className="w-4 h-4 text-rose-400" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all hover:shadow-lg hover:shadow-stone-950/5 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>ورود | ثبت‌نام</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={() => setCurrentPage('appointments')}
                className="relative p-2 rounded-xl border border-stone-100 text-stone-600 hover:bg-stone-50"
                title="نوبت‌های من"
              >
                <CalendarCheck className="w-5 h-5" />
                {appointmentsCount > 0 && (
                  <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {appointmentsCount}
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-5">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-right px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    isActive 
                      ? 'text-emerald-700 bg-emerald-50/50' 
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-600 text-white">
                      {item.badge} نوبت
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-100">
            {currentUser ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-stone-50 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-stone-900">{currentUser.name}</span>
                    <span className="block text-[10px] text-stone-400 font-mono">{currentUser.phone}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50/50 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج از حساب کاربری</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>ورود | ثبت‌نام در دکترینو</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
