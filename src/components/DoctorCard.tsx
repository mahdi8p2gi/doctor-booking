import React, { useState } from 'react';
import { Star, MapPin, Calendar, Heart, Award, ThumbsUp } from 'lucide-react';
import { Doctor } from '../data/doctors';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
  onBookNow: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onSelect,
  onBookNow,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (amount: number) => {
    return amount.toLocaleString('fa-IR') + ' تومان';
  };

  // Get the first available slot day and time for immediate preview
  const firstSlot = doctor.availableSlots[0];
  const firstTime = firstSlot?.slots[0];

  return (
    <div className="group relative bg-white rounded-3xl border border-stone-100 shadow-premium hover:shadow-luxury transition-all duration-500 overflow-hidden flex flex-col justify-between h-full">
      
      {/* Top Banner & Image container - Focused on headshots */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-100">
        <img 
          src={doctor.imageUrl} 
          alt={doctor.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Glass effect gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-80" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-4 left-4 p-2.5 rounded-2xl backdrop-blur-md transition-all cursor-pointer ${
            isFavorite 
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
              : 'bg-white/70 hover:bg-white text-stone-700 hover:text-rose-500'
          }`}
          title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 ${isFavorite ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Specialty Badge */}
        <span className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-stone-900 shadow-sm">
          {doctor.specialty}
        </span>

        {/* Rating Badge on Image */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500 text-white text-[10px] font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="font-mono">{doctor.rating.toFixed(2)}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2.5">
          {/* Doctor Name & Title */}
          <div className="text-right">
            <h4 
              onClick={() => onSelect(doctor)}
              className="text-sm font-black text-stone-900 hover:text-emerald-600 transition-colors cursor-pointer inline-block"
            >
              {doctor.name}
            </h4>
            <p className="text-[11px] text-stone-500 line-clamp-1 font-light mt-0.5">
              {doctor.title}
            </p>
          </div>

          {/* Quick Metrics (Experience & Satisfaction) */}
          <div className="grid grid-cols-2 gap-2 py-2 border-y border-stone-50 text-[10px] text-stone-600">
            <div className="flex items-center gap-1.5 justify-start">
              <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{doctor.experienceYears} سال تجربه</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <ThumbsUp className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-semibold text-stone-800">{doctor.satisfactionRate}٪ رضایت</span>
            </div>
          </div>

          {/* Clinic & Location */}
          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex items-start gap-1.5 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1 font-light" title={doctor.clinicAddress}>
                {doctor.clinicName}
              </span>
            </div>
            {firstSlot && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/30">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="font-light">
                  اولین نوبت خالی: <strong>{firstSlot.dayName} {firstSlot.dateStr} ساعت {firstTime}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2.5">
          <div className="text-right">
            <span className="block text-[9px] text-stone-400 font-light">ویزیت مطب</span>
            <span className="text-xs font-bold text-stone-800 font-mono">{formatPrice(doctor.fee)}</span>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => onSelect(doctor)}
              className="px-3 py-2 rounded-xl border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-950 font-bold text-[10px] transition-all cursor-pointer"
            >
              پروفایل
            </button>
            
            <button
              onClick={() => onBookNow(doctor)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-all shadow-sm shadow-emerald-600/5 active:scale-95 cursor-pointer"
            >
              رزرو نوبت
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
