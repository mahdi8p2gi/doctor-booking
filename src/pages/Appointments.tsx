import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarDays } from 'lucide-react';

interface Appointment {
  id: string;
  doctor: {
    name: string;
    imageUrl: string;
    specialty: string;
    clinicName: string;
    clinicAddress: string;
    phone: string;
  };
  dayName: string;
  dateStr: string;
  timeSlot: string;
  patientName: string;
  patientNationalId: string;
  code: string;
}

interface AppointmentsProps {
  appointments: Appointment[];
  setSelectedSpecialty: (specialty: string) => void;
  setCurrentPage: (page: 'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine') => void;
  handleCancelAppointment: (id: string) => void;
}

export const Appointments: React.FC<AppointmentsProps> = ({
  appointments,
  setSelectedSpecialty,
  setCurrentPage,
  handleCancelAppointment
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      <div className="text-right mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-stone-950">نوبت‌های رزرو شده من</h2>
        <p className="text-xs text-stone-500 font-light mt-1.5">
          لیست نوبت‌های فعال، کدهای رهگیری، فاکتورهای چاپی و سوابق مراجعات قبلی شما.
        </p>
      </div>

      {appointments.length > 0 ? (
        <div className="space-y-8">
          {appointments.map((app) => {
            return (
              <motion.div 
                key={app.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-stone-100 shadow-premium overflow-hidden text-right flex flex-col justify-between transition-all duration-300 hover:shadow-luxury"
              >
                
                {/* Ticket Top Header */}
                <div className="bg-stone-900 text-white p-5 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={app.doctor.imageUrl} 
                      alt={app.doctor.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-white">{app.doctor.name}</h4>
                      <span className="text-[10px] text-emerald-400">{app.doctor.specialty}</span>
                    </div>
                  </div>

                  <div className="text-left font-mono">
                    <span className="block text-[9px] text-stone-400">کد رهگیری نوبت</span>
                    <span className="text-xs font-bold text-white tracking-wide">{app.code}</span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
                  
                  {/* Time & Day */}
                  <div className="space-y-2 md:border-l md:border-stone-100 md:pl-6">
                    <span className="text-[10px] text-stone-400 font-semibold block">زمان ملاقات حضوری:</span>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-stone-900">{app.dayName} {app.dateStr}</span>
                        <span className="block text-[11px] font-mono text-emerald-700 font-bold">ساعت {app.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-2 md:border-l md:border-stone-100 md:pl-6">
                    <span className="text-[10px] text-stone-400 font-semibold block">مشخصات بیمار:</span>
                    <div className="space-y-1 text-stone-700">
                      <p>نام بیمار: <strong className="text-stone-900 font-bold">{app.patientName}</strong></p>
                      <p>کد ملی: <span className="font-mono">{app.patientNationalId}</span></p>
                    </div>
                  </div>

                  {/* Clinic Info */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-stone-400 font-semibold block">مکان و آدرس مطب:</span>
                    <div className="space-y-1 text-stone-700">
                      <p className="font-bold text-stone-900">{app.doctor.clinicName}</p>
                      <p className="font-light text-[11px] leading-relaxed line-clamp-2">{app.doctor.clinicAddress}</p>
                      <p>تلفن هماهنگی: <span className="font-mono text-stone-900">{app.doctor.phone}</span></p>
                    </div>
                  </div>

                </div>

                {/* Ticket Footer */}
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-between items-center flex-wrap gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>چاپ نسخه</span>
                    </button>

                    <button
                      onClick={() => handleCancelAppointment(app.id)}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold transition-all cursor-pointer"
                    >
                      <span>لغو این نوبت</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-stone-700 text-xs text-right font-light leading-relaxed">
            <strong>نکته مهم قبل از حضور: </strong>
            لطفاً حداقل ۱۵ دقیقه قبل از زمان تعیین شده در مطب حضور داشته و کد رهگیری نوبت خود را به منشی ارائه دهید. همراه داشتن کارت ملی الزامی است.
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white border border-stone-100 rounded-3xl shadow-premium max-w-md mx-auto space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CalendarDays className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-stone-900">هیچ نوبت فعالی ثبت نشده است</h4>
          <button
            onClick={() => {
              setSelectedSpecialty('all');
              setCurrentPage('doctors');
            }}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
          >
            رزرو اولین نوبت درمان
          </button>
        </div>
      )}

    </div>
  );
};
