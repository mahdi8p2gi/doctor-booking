import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Calendar, ChevronLeft, Check, Share2, 
  ThumbsUp, CalendarDays, MessageSquare, Map, 
  ArrowLeft, Send, Heart
} from 'lucide-react';
import { Doctor } from '../data/doctors';

interface DoctorProfileProps {
  selectedDoctor: Doctor;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  openBookingForDoctor: (doctor: Doctor) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
  profileTab: 'about' | 'reviews' | 'services';
  setProfileTab: (tab: 'about' | 'reviews' | 'services') => void;
  newReviewName: string;
  setNewReviewName: (name: string) => void;
  newReviewTreatment: string;
  setNewReviewTreatment: (treatment: string) => void;
  newReviewRating: number;
  setNewReviewRating: (rating: number) => void;
  newReviewComment: string;
  setNewReviewComment: (comment: string) => void;
  handleAddReview: (e: React.FormEvent, docId: string) => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({
  selectedDoctor,
  setSelectedDoctor,
  favorites,
  toggleFavorite,
  openBookingForDoctor,
  addToast,
  profileTab,
  setProfileTab,
  newReviewName,
  setNewReviewName,
  newReviewTreatment,
  setNewReviewTreatment,
  newReviewRating,
  setNewReviewRating,
  newReviewComment,
  setNewReviewComment,
  handleAddReview
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <button
        onClick={() => setSelectedDoctor(null)}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-950 font-bold transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-premium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>بازگشت به لیست پزشکان</span>
      </button>

      {/* Doctor Profile Main Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8 shadow-premium mb-8 text-right"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full md:w-auto">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border-4 border-white shadow-md">
              <img 
                src={selectedDoctor.imageUrl} 
                alt={selectedDoctor.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-3 text-center sm:text-right">
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900">{selectedDoctor.name}</h2>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    {selectedDoctor.specialty}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 font-light mt-1">{selectedDoctor.title}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <Star className="w-4.5 h-4.5 text-amber-400 fill-current" />
                  <strong className="text-stone-900 font-mono">{selectedDoctor.rating}</strong> ({selectedDoctor.reviewsCount} نظر ثبت‌شده)
                </span>
                <span className="text-stone-300">|</span>
                <span>عضو رسمی نظام پزشکی با شماره <strong>{selectedDoctor.medicalCode}</strong></span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                <span className="px-2.5 py-1 rounded-xl bg-stone-50 text-[11px] text-stone-600">
                  {selectedDoctor.experienceYears} سال سابقه کار تخصصی
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-[11px] text-amber-800 font-bold flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{selectedDoctor.satisfactionRate}٪ رضایت مراجعین</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5 w-full sm:w-auto justify-center md:justify-end shrink-0 pt-4 md:pt-0">
            <button
              onClick={() => toggleFavorite(selectedDoctor.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                favorites.includes(selectedDoctor.id)
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedDoctor.id) ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: selectedDoctor.name,
                    text: selectedDoctor.title,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  addToast('لینک کپی شد', 'لینک پروفایل پزشک در حافظه موقت کپی شد.', 'info');
                }
              }}
              className="p-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition-all cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => openBookingForDoctor(selectedDoctor)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
            >
              <span>نوبت‌دهی آنلاین</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Booking Widget */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-stone-100 p-6 shadow-premium text-right space-y-5">
            <h3 className="font-bold text-stone-950 text-sm pb-3 border-b border-stone-100 flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-emerald-600" />
              <span>وضعیت پذیرش و رزرو نوبت</span>
            </h3>

            <div className="flex justify-between items-center bg-stone-50 p-3 rounded-2xl">
              <span className="text-xs text-stone-500">مبلغ ویزیت مطب:</span>
              <span className="text-sm font-bold text-stone-900 font-mono">
                {selectedDoctor.fee.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold text-stone-400 block">نزدیک‌ترین نوبت‌های قابل رزرو:</span>
              <div className="space-y-2">
                {selectedDoctor.availableSlots.slice(0, 3).map((slot, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center p-3 rounded-2xl border border-stone-100 text-xs hover:border-emerald-200 hover:bg-emerald-50/10 transition-colors"
                  >
                    <div className="text-right">
                      <span className="font-bold text-stone-800 block">{slot.dayName} {slot.dateStr}</span>
                      <span className="text-[10px] text-stone-400 font-light">مطب اصلی</span>
                    </div>
                    <button
                      onClick={() => openBookingForDoctor(selectedDoctor)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition-all cursor-pointer"
                    >
                      {slot.slots.length} نوبت خالی
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => openBookingForDoctor(selectedDoctor)}
              className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>رزرو هوشمند نوبت آنلاین</span>
              <CalendarDays className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Tabs & Information */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-100 p-6 sm:p-8 shadow-premium text-right">
          
          <div className="flex border-b border-stone-100 pb-px mb-6 overflow-x-auto gap-2">
            {[
              { id: 'about', label: 'درباره پزشک و خدمات' },
              { id: 'reviews', label: `نظرات و دیدگاه‌ها (${selectedDoctor.reviewsCount})` },
              { id: 'services', label: 'بیمه‌ها و اطلاعات کلینیک' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProfileTab(tab.id as any)}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  profileTab === tab.id
                    ? 'bg-emerald-50/60 text-emerald-700 font-extrabold'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT 1: ABOUT & SERVICES */}
          {profileTab === 'about' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">بیوگرافی و سوابق علمی</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {selectedDoctor.bio}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-stone-900 text-sm">خدمات تخصصی قابل ارائه در مطب</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedDoctor.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50/80 border border-stone-100 text-xs text-stone-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinic Location Mock Map */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">موقعیت جغرافیایی کلینیک و مطب</h4>
                <p className="text-xs text-stone-500 font-light">{selectedDoctor.clinicAddress}</p>
                
                <div className="relative h-64 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-45" />
                  
                  <div className="absolute top-1/3 left-1/4 w-32 h-16 bg-emerald-100/60 rounded-full blur-xl" />
                  <div className="absolute bottom-1/4 right-1/3 w-40 h-24 bg-stone-200 rounded-3xl rotate-12" />
                  <div className="absolute inset-x-0 top-1/2 h-4 bg-stone-300 -translate-y-1/2 rotate-3" />
                  <div className="absolute inset-y-0 left-1/2 w-4 bg-stone-300 -translate-x-1/2 -rotate-12" />
                  
                  <div className="relative z-10 text-center space-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-900 text-white shadow-lg border-2 border-white animate-bounce">
                      <MapPin className="w-5 h-5 text-emerald-400 fill-current" />
                    </div>
                    <span className="block px-3 py-1 rounded-xl bg-white text-[10px] font-bold text-stone-900 shadow-md border border-stone-100">
                      مطب {selectedDoctor.name}
                    </span>
                  </div>

                  <a 
                    href="#open-map"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('مسیریاب فعال شد', 'درخواست اتصال به مسیریاب‌های نشان و بلد شبیه‌سازی شد.', 'info');
                    }}
                    className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white text-[10px] font-bold shadow-md transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Map className="w-3.5 h-3.5 text-emerald-400" />
                    <span>مسیریابی با نشان و بلد</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT 2: PATIENT REVIEWS & COMMENTS */}
          {profileTab === 'reviews' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center items-center">
                <div className="space-y-1">
                  <span className="block text-3xl font-black text-stone-900 font-mono">{selectedDoctor.rating}</span>
                  <span className="block text-[11px] text-stone-500 font-light">امتیاز کل از ۵</span>
                  <div className="flex justify-center gap-0.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="space-y-1 sm:border-x sm:border-stone-200 py-2">
                  <span className="block text-2xl font-black text-emerald-700 font-mono">{selectedDoctor.satisfactionRate}٪</span>
                  <span className="block text-[11px] text-stone-500 font-light">رضایت از درمان</span>
                  <span className="block text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">بالاتر از میانگین کشوری</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-stone-900 font-mono">{selectedDoctor.reviewsCount}</span>
                  <span className="block text-[11px] text-stone-500 font-light">تعداد کل نظرات</span>
                </div>
              </div>

              {/* Add Comment form */}
              <div className="p-6 rounded-3xl bg-emerald-50/25 border border-emerald-150/40 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-stone-950 text-sm flex items-center gap-1.5">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                    <span>ثبت تجربه و ثبت کامنت برای پزشک</span>
                  </h4>
                  <span className="text-[10px] text-stone-400 font-light">ثبت کاملاً آنلاین و آنی</span>
                </div>

                <form onSubmit={(e) => handleAddReview(e, selectedDoctor.id)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 text-right">
                      <label className="block text-[11px] text-stone-600 font-semibold">نام نویسنده دیدگاه</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: مهران محمدی"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1 text-right">
                      <label className="block text-[11px] text-stone-600 font-semibold">علت مراجعه یا نوع درمان</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: درمان تپش قلب، زاویه‌سازی پوست..."
                        value={newReviewTreatment}
                        onChange={(e) => setNewReviewTreatment(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-1 border-t border-stone-100/50">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-600">امتیاز شما به پزشک:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 cursor-pointer transition-transform hover:scale-110"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                star <= newReviewRating 
                                  ? 'text-amber-400 fill-current' 
                                  : 'text-stone-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <span className="text-[10px] text-emerald-800 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-md">
                      امتیاز داده شده: {newReviewRating} از ۵
                    </span>
                  </div>

                  <div className="space-y-1 text-right">
                    <label className="block text-[11px] text-stone-600 font-semibold">توضیحات و جزئیات تجربه درمان (کامنت شما)</label>
                    <textarea
                      required
                      placeholder="لطفاً نظر گران‌قدر خود را بنویسید..."
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full p-3 text-xs bg-white border border-stone-200 rounded-xl focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="text-left">
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 justify-center cursor-pointer shadow-md"
                    >
                      <span>ثبت کامنت و بازخورد درمان</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-4">
                {selectedDoctor.reviews.map((review) => (
                  <div key={review.id} className="p-5 rounded-2xl bg-white border border-stone-100 shadow-premium text-right space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-stone-900 text-xs block">{review.userName}</span>
                        <span className="text-[9px] text-stone-400 font-light mt-0.5">تاریخ ثبت: {review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-current text-amber-500" />
                        <span className="font-mono">{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      {review.comment}
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-stone-50 text-[10px] text-stone-500">
                      <span>علت مراجعه: <strong className="text-stone-700">{review.treatment}</strong></span>
                      <span className="text-emerald-600 font-medium bg-emerald-50/40 px-2 py-0.5 rounded">مراجعه حضوری تایید شده</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT 3: INSURANCE & POLICIES */}
          {profileTab === 'services' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">قرارداد با بیمه‌های پایه و تکمیلی</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light font-sans">
                  مطب {selectedDoctor.name} جهت کاهش هزینه‌های درمان بیماران محترم، با اکثر شرکت‌های بیمه‌گر پایه و مکمل همکاری می‌نماید. در جدول زیر لیست بیمه‌های طرف قرارداد را مشاهده می‌فرمایید:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    'تأمین اجتماعی (پذیرش آنلاین)',
                    'بیمه سلامت ایرانیان',
                    'خدمات درمانی نیروهای مسلح',
                    'بیمه ایران (مکمل طلایی)',
                    'بیمه دانا (معرفی‌نامه آنلاین)',
                    'بیمه البرز و آسیا',
                    'بیمه پاسارگاد و کارآفرین',
                    'بیمه دی (ایثارگران و خانواده شهدا)',
                    'بیمه سامان و کوثر'
                  ].map((insurance, index) => (
                    <div key={index} className="p-3 rounded-2xl bg-stone-50/80 border border-stone-100 text-[11px] text-stone-700 text-center font-semibold">
                      {insurance}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-stone-800 text-xs leading-relaxed space-y-1.5">
                <span className="font-bold text-emerald-950 block">راهنمای دریافت نسخه الکترونیک:</span>
                <p className="font-light">
                  با توجه به حذف دفترچه‌های درمانی کاغذی، تمامی نسخه‌های تجویزشده توسط {selectedDoctor.name} به صورت الکترونیکی و متصل به کد ملی بیمار ثبت می‌شود. پیامک حاوی اقلام نسخه بلافاصله پس از اتمام ویزیت به شماره همراه بیمار ارسال شده و در تمامی داروخانه‌ها و آزمایشگاه‌های سراسر کشور معتبر است.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">ساعات کاری و پذیرش مطب</h4>
                <div className="p-4 rounded-2xl border border-stone-100 space-y-2.5 text-xs text-stone-600">
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                    <span>شنبه تا دوشنبه:</span>
                    <span className="font-bold text-stone-800">ساعت ۱۶:۰۰ الی ۲۰:۰۰</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-50 pb-2">
                    <span>سه‌شنبه و چهارشنبه:</span>
                    <span className="font-bold text-stone-800">ساعت ۱۵:۰۰ الی ۱۹:۰۰</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>پنجشنبه و جمعه:</span>
                    <span>تعطیل (فقط جراحی‌های اورژانسی بیمارستانی)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
};
