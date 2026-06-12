import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Star, ChevronLeft, Clock, Award, ShieldCheck, 
  HeartHandshake, HelpCircle, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Doctor, Specialty } from '../data/doctors';
import { DoctorCard } from '../components/DoctorCard';

interface HomeProps {
  doctorsList: Doctor[];
  specialties: Specialty[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  setCurrentPage: (page: 'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine') => void;
  setSelectedDoctor: (doctor: Doctor) => void;
  setProfileTab: (tab: 'about' | 'reviews' | 'services') => void;
  openBookingForDoctor: (doctor: Doctor) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
  getSpecialtyIcon: (iconName: string) => React.ReactNode;
  openFaqIndex: number | null;
  setOpenFaqIndex: (index: number | null) => void;
  faqs: Array<{ question: string; answer: string }>;
  testimonials: Array<{ id: string; name: string; job: string; text: string; rating: number }>;
}

export const Home: React.FC<HomeProps> = ({
  doctorsList,
  specialties,
  searchQuery,
  setSearchQuery,
  setSelectedSpecialty,
  setCurrentPage,
  setSelectedDoctor,
  setProfileTab,
  openBookingForDoctor,
  addToast,
  getSpecialtyIcon,
  openFaqIndex,
  setOpenFaqIndex,
  faqs,
  testimonials
}) => {
  return (
    <div className="space-y-20 pb-24">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-emerald-50/40 via-transparent to-transparent">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right Column: Text & Search */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-8 text-right"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-premium">
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold">جدید</span>
                <span className="text-[10px] font-semibold text-stone-700">سامانه رزرو آنی بدون نیاز به تماس تلفنی</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 leading-[1.2] tracking-tight">
                تجربه <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-600 to-teal-500">ملاقات لوکس</span> و هوشمند با پزشکان برتر کشور
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light max-w-2xl">
                دکترینو پلتفرم نوبت‌دهی آنلاین اختصاصی برای مراجعین خاص است. ما برترین و مجرب‌ترین کادر درمانی و جراحان کشور را در محیطی مدرن و بدون معطلی گرد هم آورده‌ایم تا سلامت شما با شایسته‌ترین کیفیت حفظ شود.
              </p>

              {/* Modern Search Card */}
              <div className="p-3 bg-white rounded-3xl border border-stone-100 shadow-luxury max-w-xl flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="نام پزشک، تخصص، کلینیک یا بیماری..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-stone-50/50 border-0 rounded-2xl text-xs text-stone-800 placeholder-stone-400 focus:bg-stone-50 transition-all"
                  />
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPage('doctors');
                    addToast('جستجو فعال شد', `در حال نمایش پزشکان مرتبط با "${searchQuery || 'همه'}"`, 'info');
                  }}
                  className="py-3 px-6 rounded-2xl bg-stone-950 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>یافتن پزشک</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Specialty Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[10px] font-bold text-stone-400">جستجوی سریع:</span>
                {specialties.slice(0, 4).map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpecialty(spec.id);
                      setCurrentPage('doctors');
                      addToast('فیلتر تخصص اعمال شد', `نمایش پزشکان تخصص ${spec.name}`, 'info');
                    }}
                    className="px-3 py-1 rounded-xl bg-white hover:bg-emerald-50 border border-stone-100 text-[10px] font-medium text-stone-600 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    {spec.name}
                  </button>
                ))}
              </div>

              {/* Premium Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100 max-w-md">
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-stone-950 font-mono">۱۵K+</span>
                  <span className="block text-[10px] text-stone-500 font-light mt-0.5">رضایت بیمار</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-stone-950 font-mono">۹۹.۴٪</span>
                  <span className="block text-[10px] text-stone-500 font-light mt-0.5">موفقیت درمان</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-stone-950 font-mono">۲۰۰+</span>
                  <span className="block text-[10px] text-stone-500 font-light mt-0.5">پزشک نخبه</span>
                </div>
              </div>

            </motion.div>

            {/* Left Column: Premium FreePix Style Medical Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-80 sm:w-96 h-[420px] rounded-[48px] overflow-hidden bg-white shadow-luxury flex flex-col justify-between border-8 border-white">
                <img 
                  src="https://img.freepik.com/free-photo/medical-team-working-modern-clinic-office_23-2149329026.jpg" 
                  alt="تیم پزشکی دکترینو" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating general informational card */}
              <div className="absolute -bottom-6 -right-6 sm:-right-10 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-stone-100 shadow-luxury w-64 text-right animate-float">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-stone-900">پاسخگویی سریع پزشکان</span>
                    <span className="block text-[8px] text-stone-400">میانگین زمان پاسخ: ۱۵ دقیقه</span>
                  </div>
                </div>
                <div className="border-t border-stone-100 pt-2 text-[10px] text-stone-600 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-light">مشاوره آنلاین فعال:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>۲۴ پزشک آنلاین</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Rating Badge */}
              <div className="absolute top-12 -left-6 bg-stone-950 text-white p-3.5 rounded-3xl shadow-luxury w-48 text-right">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-[10px] text-stone-300 font-light leading-relaxed">
                  «بیش از ۹۸ درصد از مراجعین، خدمات نوبت‌دهی آنلاین و برخورد پرسنل را عالی ارزیابی کرده‌اند.»
                </p>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-600 tracking-wider">تخصص‌های برتر درمانی</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">جستجو بر اساس تخصص پزشکی</h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            پزشک مورد نیاز خود را بر اساس دسته‌بندی‌های کاملاً تفکیک شده و تخصصی بیابید.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((spec) => (
            <motion.div
              key={spec.id}
              whileHover={{ scale: 1.04, y: -4 }}
              onClick={() => {
                setSelectedSpecialty(spec.id);
                setCurrentPage('doctors');
                addToast('فیلتر تخصص', `پزشکان متخصص در زمینه ${spec.name}`, 'info');
              }}
              className="group p-6 rounded-3xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-between h-48 border-stone-100 bg-white hover:border-stone-300 hover:shadow-premium"
            >
              <div className="w-12 h-12 rounded-2xl bg-stone-50 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                {getSpecialtyIcon(spec.iconName)}
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {spec.name}
                </h4>
                <p className="text-[9px] text-stone-400 font-light">
                  {spec.description}
                </p>
              </div>

              <span className="text-[9px] font-bold text-stone-500 bg-stone-50 px-2.5 py-0.5 rounded-lg group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                {spec.count} پزشک فعال
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFIT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] border border-stone-100 p-8 sm:p-12 shadow-premium grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5.5 h-5.5" />
            </div>
            <h4 className="text-sm font-bold text-stone-950">پزشکان تایید شده و باسابقه</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              تمامی پزشکان عضو پلتفرم دکترینو از فیلترهای ارزیابی تخصصی و بررسی مدارک علمی عبور کرده‌اند تا برترین خدمات درمانی به شما ارائه شود.
            </p>
          </div>

          <div className="space-y-3 md:border-x md:border-stone-100 md:px-8">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <h4 className="text-sm font-bold text-stone-950">امنیت اطلاعات و حریم خصوصی</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              پرونده‌های درمانی، نتایج آزمایشات و سوابق مشاوره‌های آنلاین شما در بستر رمزنگاری شده و کاملاً محرمانه میان شما و پزشکتان باقی می‌ماند.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <HeartHandshake className="w-5.5 h-5.5" />
            </div>
            <h4 className="text-sm font-bold text-stone-950">مشاوره و پشتیبانی هوشمند</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              از لحظه انتخاب زمان نوبت تا ترخیص کامل از کلینیک، تیم پشتیبانی دکترینو در کنار شماست تا دغدغه‌ای جز بازیابی سلامت خود نداشته باشید.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-600 tracking-wider">منتخب بیماران</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">پزشکان برجسته و فوق‌تخصص هفته</h2>
            <p className="text-xs text-stone-500 font-light mt-1">
              پرتقاضاترین پزشکان با بالاترین رتبه رضایتمندی بیماران در یک نگاه
            </p>
          </div>
          
          <button
            onClick={() => {
              setSelectedSpecialty('all');
              setCurrentPage('doctors');
            }}
            className="px-5 py-2.5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 text-stone-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>مشاهده همه پزشکان</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsList.slice(0, 3).map((doctor) => (
            <motion.div 
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <DoctorCard
                doctor={doctor}
                onSelect={(doc) => {
                  setSelectedDoctor(doc);
                  setProfileTab('about');
                }}
                onBookNow={(doc) => openBookingForDoctor(doc)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-stone-950 text-white py-20 overflow-hidden relative rounded-[40px] max-w-7xl mx-auto px-6 sm:px-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 text-right space-y-4">
            <span className="text-xs font-bold text-emerald-400 tracking-wider">ساده و بی‌دغدغه</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">رزرو نوبت در دکترینو چگونه کار می‌کند؟</h2>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              ما فرآیند سنتی و فرساینده رزرو نوبت تلفنی را با پلتفرمی ۳ مرحله‌ای جایگزین کرده‌ایم تا در کوتاه‌ترین زمان، بهترین مراقبت پزشکی را دریافت کنید.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSelectedSpecialty('all');
                  setCurrentPage('doctors');
                }}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer"
              >
                رزرو آنلاین اولین نوبت
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-right">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
                ۱
              </div>
              <h4 className="text-sm font-bold mb-2">جستجو و فیلتر پزشک</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                بر اساس تخصص، محدوده جغرافیایی، نوع بیمه پایه و نام پزشک، متخصص مورد نظر را فیلتر کنید.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
                ۲
              </div>
              <h4 className="text-sm font-bold mb-2">انتخاب ساعت ملاقات</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                جدول زمان‌های خالی پزشک را به طور شفاف در ۷ روز آینده مشاهده کرده و بهترین ساعت را رزرو کنید.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm mb-4">
                ۳
              </div>
              <h4 className="text-sm font-bold mb-2">دریافت کارت نوبت</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                بلافاصله کد رهگیری و کارت حضور دیجیتال را به صورت پیامک و فاکتور چاپی دریافت کنید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-600 tracking-wider">رضایتمندی بالا</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">نظرات و تجربیات کاربران دکترینو</h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            پلتفرم دکترینو مفتخر است که رضایت خاطر مراجعین محترم را در اولویت خود قرار داده است.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-6 rounded-3xl bg-white border border-stone-100 shadow-premium text-right space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">مراجع ویژه</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  « {testimonial.text} »
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-stone-50">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-900">{testimonial.name}</h5>
                  <span className="text-[10px] text-stone-400 font-light">{testimonial.job}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-600 tracking-wider">پاسخ به سوالات شما</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">پرسش‌های متداول مراجعین</h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            پاسخ به متداول‌ترین ابهامات و سوالات در خصوص فرآیند رزرو نوبت و مشاوره
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-stone-100 shadow-premium overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-right flex justify-between items-center gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-stone-850 flex items-center gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed font-light border-t border-stone-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
