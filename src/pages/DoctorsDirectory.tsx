import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ShieldCheck, Filter } from 'lucide-react';
import { Doctor, Specialty } from '../data/doctors';
import { DoctorCard } from '../components/DoctorCard';

interface DoctorsDirectoryProps {
  sortedDoctors: Doctor[];
  specialties: Specialty[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  sortBy: 'popular' | 'price-low' | 'experience';
  setSortBy: (sort: 'popular' | 'price-low' | 'experience') => void;
  experienceFilter: number;
  setExperienceFilter: (exp: number) => void;
  setSelectedDoctor: (doctor: Doctor) => void;
  setProfileTab: (tab: 'about' | 'reviews' | 'services') => void;
  openBookingForDoctor: (doctor: Doctor) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({
  sortedDoctors,
  specialties,
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  sortBy,
  setSortBy,
  experienceFilter,
  setExperienceFilter,
  setSelectedDoctor,
  setProfileTab,
  openBookingForDoctor,
  addToast
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-right mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-stone-950">لیست پزشکان متخصص دکترینو</h2>
        <p className="text-xs text-stone-500 font-light mt-1.5">
          برترین جراحان و متخصصان کشور را با فیلترهای هوشمند و مقایسه دقیق رزرو کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filter Panel (Col 4) - STICKY */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-100 p-6 space-y-6 shadow-premium lg:sticky lg:top-24 z-30">
          
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>فیلترهای جستجو</span>
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('all');
                setSortBy('popular');
                setExperienceFilter(0);
                addToast('فیلترها ریست شدند', 'تمام فیلترها به حالت اولیه بازگشتند.', 'info');
              }}
              className="text-[10px] text-emerald-600 hover:underline font-semibold cursor-pointer"
            >
              پاک کردن همه فیلترها
            </button>
          </div>

          {/* Text Search Input */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-stone-700">جستجوی کلمه کلیدی</label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="نام، تخصص یا کلینیک..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Specialty Dropdown */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-stone-700">تخصص مورد نظر</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => {
                setSelectedSpecialty(e.target.value);
                addToast('فیلتر تخصص تغییر کرد', '', 'info');
              }}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white text-stone-800 cursor-pointer"
            >
              <option value="all">همه تخصص‌ها (کل کشور)</option>
              {specialties.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name} ({spec.count} پزشک)
                </option>
              ))}
            </select>
          </div>

          {/* Experience Range Slider */}
          <div className="space-y-2 text-right">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-700">حداقل سابقه کار (تجربه)</span>
              <span className="font-bold text-emerald-700 font-mono">{experienceFilter} سال</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[9px] text-stone-400">
              <span>بدون محدودیت</span>
              <span>۱۵ سال سابقه به بالا</span>
            </div>
          </div>

          {/* Sort Order */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-semibold text-stone-700">مرتب‌سازی بر اساس</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'popular', label: 'محبوب‌ترین' },
                { id: 'price-low', label: 'ارزان‌ترین' },
                { id: 'experience', label: 'با تجربه‌ترین' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSortBy(btn.id as any)}
                  className={`py-2 rounded-xl text-[10px] font-bold transition-all border cursor-pointer ${
                    sortBy === btn.id
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Safety Seal */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-stone-700 text-[10px] leading-relaxed flex gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-emerald-900">تضمین دکترینو:</span> تمامی پزشکان این لیست دارای پروانه معتبر نظام پزشکی فعال و مورد تایید وزارت بهداشت می‌باشند.
            </div>
          </div>

        </div>

        {/* Doctors Grid (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex justify-between items-center text-xs text-stone-500 px-2">
            <span>
              یافت شد: <strong className="text-stone-900 font-mono">{sortedDoctors.length}</strong> پزشک متخصص با مشخصات انتخابی شما
            </span>
          </div>

          {/* Doctor Cards Grid */}
          {sortedDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sortedDoctors.map((doctor) => (
                <motion.div 
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
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
          ) : (
            <div className="text-center py-16 px-4 bg-white border border-stone-100 rounded-3xl shadow-premium max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center mx-auto">
                <Filter className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-stone-800">پزشکی با این مشخصات یافت نشد</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed max-w-xs mx-auto">
                پزشکی با فیلترهای انتخابی شما در حال حاضر تعریف نشده است. لطفاً کلیدواژه جستجو را تغییر داده یا فیلترها را ریست کنید.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('all');
                  setExperienceFilter(0);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                نمایش مجدد همه پزشکان
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
