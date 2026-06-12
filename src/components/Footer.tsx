import React from 'react';
import { HeartPulse } from 'lucide-react';
import { SPECIALTIES } from '../data/doctors';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine') => void;
  setSelectedDoctor: (doctor: null) => void;
  setSelectedArticle: (article: null) => void;
  setSelectedSpecialty: (specialty: string) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  setSelectedDoctor,
  setSelectedArticle,
  setSelectedSpecialty,
  addToast
}) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-right pt-16 pb-8 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-900">
          
          <div className="space-y-4 md:col-span-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                <HeartPulse className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="block text-base font-extrabold text-white">دکترینو VIP</span>
                <span className="block text-[9px] text-stone-500 font-light -mt-0.5">پلتفرم مدرن نوبت‌دهی آنلاین کشور</span>
              </div>
            </div>
            <p className="text-xs font-light text-stone-400 leading-relaxed">
              سامانه هوشمند و لوکس دکترینو با هدف تسهیل ارتباط مراجعین با بهترین فوق‌تخصصان و جراحان برتر کشور طراحی گردیده است. ما کیفیت درمان و احترام به زمان گران‌بهای شما را تضمین می‌کنیم.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button 
                  onClick={() => { setCurrentPage('home'); setSelectedDoctor(null); setSelectedArticle(null); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  صفحه اصلی سامانه
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('doctors'); setSelectedSpecialty('all'); setSelectedDoctor(null); setSelectedArticle(null); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  لیست پزشکان متخصص
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('appointments'); setSelectedDoctor(null); setSelectedArticle(null); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  نوبت‌های رزرو شده من
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { addToast('دکترینو VIP', 'این بخش به زودی فعال می‌شود.', 'info'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  عضویت در باشگاه مراجعین VIP
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">تخصص‌های پرطرفدار</h4>
            <ul className="space-y-2 text-xs font-light">
              {SPECIALTIES.slice(0, 4).map((spec) => (
                <li key={spec.id}>
                  <button
                    onClick={() => {
                      setSelectedSpecialty(spec.id);
                      setCurrentPage('doctors');
                      setSelectedDoctor(null);
                      setSelectedArticle(null);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    متخصصین {spec.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">پشتیبانی و اعتماد</h4>
            <p className="text-xs font-light text-stone-400">
              پشتیبانی مراجعین خاص به صورت ۲۴ ساعته در تمام روزهای هفته فعال می‌باشد.
            </p>
            <div className="space-y-1.5 text-xs text-white font-sans">
              <p className="font-mono">تلفن: ۰۲۱-۹۱۰۰۸۸۸۸</p>
              <p className="font-mono">ایمیل: support@doctorino.ir</p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500">
          <p className="text-center sm:text-right">
            © ۱۴۰۴ دکترینو. تمامی حقوق برای پلتفرم نوبت‌دهی هوشمند مراجعین محفوظ است. طراحی الهام‌گرفته از Dribbble.
          </p>
          
          <div className="flex gap-4">
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-emerald-500">SSL SECURE</span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] font-mono text-emerald-500">وزارت بهداشت</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
