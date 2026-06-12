import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, FileText, CheckCircle2, 
  MapPin, Receipt, ChevronLeft, 
  ChevronRight, Printer, Heart 
} from 'lucide-react';
import { Doctor } from '../data/doctors';

interface BookingModalProps {
  isOpen: boolean;
  doctor: Doctor | null;
  currentUser: { name: string; phone: string } | null;
  onClose: () => void;
  onBookingComplete: (booking: {
    id: string;
    doctor: Doctor;
    dateIso: string;
    dateStr: string;
    dayName: string;
    timeSlot: string;
    patientName: string;
    patientNationalId: string;
    patientPhone: string;
    insuranceType: string;
    code: string;
    status: 'confirmed' | 'pending';
  }) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
  openAuthModal: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  doctor,
  currentUser,
  onClose,
  onBookingComplete,
  addToast,
  openAuthModal
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Selection States
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Patient Form States
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '');
  const [patientNationalId, setPatientNationalId] = useState('');
  const [insuranceType, setInsuranceType] = useState('تأمین اجتماعی');
  const [symptoms, setSymptoms] = useState('');

  // Generated Booking Code
  const [bookingCode, setBookingCode] = useState('');

  if (!isOpen || !doctor) return null;

  const selectedDay = doctor.availableSlots[selectedDayIndex] || doctor.availableSlots[0];

  // Format price helper
  const formatPrice = (amount: number) => {
    return amount.toLocaleString('fa-IR') + ' تومان';
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedTimeSlot) {
        addToast('انتخاب ساعت', 'لطفاً یکی از ساعت‌های خالی را برای نوبت خود انتخاب کنید.', 'warning');
        return;
      }
      
      // Pre-populate name if logged in
      if (currentUser) {
        if (!patientName) setPatientName(currentUser.name);
        if (!patientPhone) setPatientPhone(currentUser.phone);
      }
      
      setStep(2);
    } else if (step === 2) {
      if (!patientName.trim()) {
        addToast('خطا در مشخصات', 'لطفاً نام و نام خانوادگی بیمار را وارد کنید.', 'error');
        return;
      }
      if (!patientPhone.trim()) {
        addToast('خطا در مشخصات', 'لطفاً شماره موبایل بیمار را وارد کنید.', 'error');
        return;
      }
      if (!patientNationalId.trim() || patientNationalId.length < 10) {
        addToast('خطا در مشخصات', 'لطفاً کد ملی ۱۰ رقمی بیمار را به درستی وارد کنید.', 'error');
        return;
      }

      // Proceed to Step 3 (Confirmation & Save)
      const randomCode = 'DK-' + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(randomCode);

      const newBooking = {
        id: 'book-' + Date.now(),
        doctor,
        dateIso: selectedDay.dateIso,
        dateStr: selectedDay.dateStr,
        dayName: selectedDay.dayName,
        timeSlot: selectedTimeSlot,
        patientName,
        patientNationalId,
        patientPhone,
        insuranceType,
        code: randomCode,
        status: 'confirmed' as const
      };

      onBookingComplete(newBooking);
      addToast('نوبت با موفقیت رزرو شد', `کد رهگیری شما: ${randomCode}`, 'success');
      setStep(3);
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedTimeSlot('');
    setPatientNationalId('');
    setSymptoms('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/75 backdrop-blur-md transition-opacity duration-300"
        onClick={resetAndClose}
      />

      {/* Booking Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-stone-100 transition-all duration-300 transform scale-100 flex flex-col glass-effect max-h-[92vh]">
        
        {/* Top Accent line */}
        <div className="h-2 w-full bg-gradient-to-l from-emerald-600 to-teal-500" />

        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <div className="flex items-center gap-3">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div className="text-right">
              <h3 className="font-bold text-stone-900 text-base">{doctor.name}</h3>
              <p className="text-xs text-emerald-600 font-medium">{doctor.title}</p>
            </div>
          </div>
          
          <button 
            onClick={resetAndClose}
            className="text-stone-400 hover:text-stone-700 transition-colors p-2 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-8 py-4 bg-stone-50/30 border-b border-stone-100 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
            }`}>
              ۱
            </span>
            <span className={`font-semibold ${step >= 1 ? 'text-emerald-900' : 'text-stone-400'}`}>
              انتخاب زمان نوبت
            </span>
          </div>
          <div className="flex-1 mx-4 h-0.5 bg-stone-200 relative">
            <div className={`absolute top-0 right-0 h-full bg-emerald-600 transition-all duration-500 ${
              step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'
            }`} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
            }`}>
              ۲
            </span>
            <span className={`font-semibold ${step >= 2 ? 'text-emerald-900' : 'text-stone-400'}`}>
              مشخصات بیمار
            </span>
          </div>
          <div className="flex-1 mx-4 h-0.5 bg-stone-200 relative">
            <div className={`absolute top-0 right-0 h-full bg-emerald-600 transition-all duration-500 ${
              step === 3 ? 'w-full' : 'w-0'
            }`} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
              step === 3 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
            }`}>
              ۳
            </span>
            <span className={`font-semibold ${step === 3 ? 'text-emerald-900' : 'text-stone-400'}`}>
              کارت نوبت و تأیید
            </span>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: SELECT DAY AND TIME */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Info alert */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-stone-700 text-xs leading-relaxed flex items-start gap-3">
                <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900">پیشنهاد دکترینو: </span>
                  نوبت‌های این پزشک بسیار سریع رزرو می‌شوند. لطفاً روز و ساعت مورد نظر خود را از جدول زیر انتخاب نموده و نوبت خود را قطعی کنید.
                </div>
              </div>

              {/* Day Selector */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>۱. انتخاب روز نوبت</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {doctor.availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedDayIndex(idx);
                        setSelectedTimeSlot(''); // Reset time selection when day changes
                      }}
                      className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        selectedDayIndex === idx
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500'
                          : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50 bg-white'
                      }`}
                    >
                      <span className={`text-xs font-semibold ${selectedDayIndex === idx ? 'text-emerald-900' : 'text-stone-800'}`}>
                        {slot.dayName}
                      </span>
                      <span className="text-xs text-stone-500 font-light mt-1">
                        {slot.dateStr}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 mt-1">
                        {slot.slots.length} نوبت خالی
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Selector */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>۲. انتخاب ساعت ملاقات</span>
                </h4>
                
                {selectedDay?.slots && selectedDay.slots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                    {selectedDay.slots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`py-2.5 px-3 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer ${
                          selectedTimeSlot === time
                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                            : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50 bg-white text-stone-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-stone-50 rounded-2xl text-stone-400 text-xs">
                    نوبت خالی در این روز یافت نشد. لطفاً روز دیگری را انتخاب کنید.
                  </div>
                )}
              </div>

              {/* Price & Location Preview */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <Receipt className="w-4.5 h-4.5 text-stone-500 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-stone-400">حق ویزیت در مطب (علی‌الحساب)</span>
                    <span className="text-xs font-bold text-stone-800">{formatPrice(doctor.fee)}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4.5 h-4.5 text-stone-500 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-stone-400">آدرس مطب پزشک</span>
                    <span className="text-xs text-stone-700 line-clamp-1 font-light" title={doctor.clinicAddress}>
                      {doctor.clinicName} - {doctor.clinicAddress}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: PATIENT DETAILS FORM */}
          {step === 2 && (
            <div className="space-y-6">
              
              {!currentUser && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/50 text-stone-700 text-xs flex justify-between items-center gap-3">
                  <div className="text-right">
                    <span className="font-bold text-amber-900 block mb-0.5">شما وارد حساب خود نشده‌اید</span>
                    <p className="font-light text-stone-500">برای پیگیری راحت‌تر نوبت‌ها، توصیه می‌شود ابتدا وارد سیستم شوید.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      openAuthModal();
                    }}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors shrink-0"
                  >
                    ورود سریع
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">نام و نام خانوادگی بیمار</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="نام و نام خانوادگی بیمار"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800"
                    />
                  </div>
                </div>

                {/* Patient Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">شماره موبایل برای ارسال پیامک</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400">
                      <Clock className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 text-left dir-ltr"
                    />
                  </div>
                </div>

                {/* Patient National ID */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">کد ملی بیمار (جهت بیمه و نسخه الکترونیک)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400">
                      <FileText className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      placeholder="مثال: ۰۰۱۲۳۴۵۶۷۸"
                      value={patientNationalId}
                      onChange={(e) => setPatientNationalId(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 text-left dir-ltr"
                    />
                  </div>
                </div>

                {/* Insurance Type */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700">نوع بیمه پایه</label>
                  <select
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 cursor-pointer"
                  >
                    <option value="تأمین اجتماعی">تأمین اجتماعی</option>
                    <option value="سلامت همگانی / ایرانیان">سلامت همگانی / ایرانیان</option>
                    <option value="بیمه دی">بیمه دی</option>
                    <option value="بیمه ایران">بیمه ایران (مکمل)</option>
                    <option value="نیروهای مسلح">نیروهای مسلح</option>
                    <option value="آزاد (بدون بیمه)">آزاد (بدون بیمه)</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Note */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-stone-700">توضیح کوتاه علت مراجعه (اختیاری)</label>
                <textarea
                  placeholder="مثال: چکاپ دوره‌ای قلب، درد قفسه سینه، تنگی نفس هنگام راه رفتن..."
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all text-stone-800 resize-none"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span className="font-light text-stone-500">پزشک معالج:</span>
                  <span className="font-bold text-stone-900">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-light text-stone-500">زمان انتخاب‌شده:</span>
                  <span className="font-bold text-stone-900">
                    {selectedDay.dayName} {selectedDay.dateStr} ساعت {selectedTimeSlot}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-emerald-100">
                  <span className="font-light text-stone-500">مبلغ نهایی ویزیت:</span>
                  <span className="font-bold text-emerald-700 text-sm">{formatPrice(doctor.fee)}</span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION AND TICKET */}
          {step === 3 && (
            <div className="space-y-6 py-4">
              
              {/* Success animation state */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">نوبت شما با موفقیت قطعی شد!</h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  پیامک تایید نوبت حاوی کد رهگیری به شماره موبایل {patientPhone} ارسال گردید. لطفاً ۱۵ دقیقه قبل از ساعت ملاقات در مطب حضور داشته باشید.
                </p>
              </div>

              {/* VIP Booking Ticket Card */}
              <div className="relative mx-auto max-w-md rounded-3xl border border-dashed border-emerald-600/30 bg-stone-50/50 p-6 overflow-hidden shadow-sm">
                
                {/* Decorative circle cuts on the sides */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white border-r border-dashed border-emerald-600/30 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border-l border-dashed border-emerald-600/30 -translate-y-1/2" />

                {/* Ticket Header */}
                <div className="flex justify-between items-start pb-4 border-b border-dashed border-stone-200">
                  <div className="text-right">
                    <span className="block text-[10px] text-stone-400">کارت نوبت دیجیتال</span>
                    <span className="text-base font-extrabold text-stone-800">دکترینو VIP</span>
                  </div>
                  <div className="text-left font-mono">
                    <span className="block text-[10px] text-stone-400 text-right">کد رهگیری نوبت</span>
                    <span className="text-sm font-bold text-emerald-600">{bookingCode}</span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="py-4 space-y-3 text-xs border-b border-dashed border-stone-200">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-[10px] text-stone-400">پزشک متخصص:</span>
                      <span className="font-bold text-stone-800">{doctor.name}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-400">تخصص:</span>
                      <span className="font-semibold text-stone-700">{doctor.specialty}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-[10px] text-stone-400">تاریخ ملاقات:</span>
                      <span className="font-bold text-stone-800">{selectedDay.dayName} {selectedDay.dateStr}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-400">ساعت حضور:</span>
                      <span className="font-bold text-emerald-700 font-mono">{selectedTimeSlot}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-[10px] text-stone-400">بیمار:</span>
                      <span className="font-semibold text-stone-800">{patientName}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-stone-400">کد ملی بیمار:</span>
                      <span className="font-mono text-stone-700">{patientNationalId}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] text-stone-400">محل مراجعه:</span>
                    <span className="font-medium text-stone-700 text-[11px] leading-relaxed">
                      {doctor.clinicName} - {doctor.clinicAddress}
                    </span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="pt-4 text-center">
                  <div className="h-10 bg-stone-900 flex items-center justify-between px-6 rounded-lg opacity-85 select-none font-mono text-[9px] text-stone-400 tracking-widest">
                    <span>||||| | || |||| | | |||| ||| | ||| |||| | | ||| |||| | | ||| |||</span>
                    <span>{bookingCode}</span>
                  </div>
                  <p className="text-[9px] text-stone-400 mt-2">
                    اسکن بارکد در مطب جهت اعلام حضور در کیوسک هوشمند
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ نسخه چاپی نوبت</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer (Action buttons) */}
        {step !== 3 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/60 flex justify-between items-center">
            {step === 2 ? (
              <button
                type="button"
                onClick={handleBackStep}
                className="px-5 py-2.5 rounded-xl border border-stone-200 hover:border-stone-400 text-stone-600 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>
            ) : (
              <div className="text-right">
                <span className="block text-[10px] text-stone-400">کل هزینه درمان</span>
                <span className="text-base font-black text-emerald-700">{formatPrice(doctor.fee)}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md hover:shadow-emerald-900/10 active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
            >
              <span>{step === 1 ? 'مرحله بعد: ورود اطلاعات بیمار' : 'ثبت قطعی و دریافت نوبت'}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3 Footer */}
        {step === 3 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/60 text-center">
            <button
              onClick={resetAndClose}
              className="px-8 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all cursor-pointer"
            >
              متوجه شدم و بستن پنجره
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
