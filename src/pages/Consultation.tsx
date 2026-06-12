import React from 'react';
import { MessageCircle, PhoneCall, Video, Send, Sparkles } from 'lucide-react';
import { Doctor } from '../data/doctors';

interface ConsultationProps {
  doctorsList: Doctor[];
  selectedConsultationDoctor: Doctor | null;
  setSelectedConsultationDoctor: (doctor: Doctor) => void;
  consultationType: 'chat' | 'voice' | 'video';
  setConsultationType: (type: 'chat' | 'voice' | 'video') => void;
  isConsultationStarted: boolean;
  isConsultationConnecting: boolean;
  startConsultationSession: () => void;
  consultationMessages: Array<{ sender: 'user' | 'doctor'; text: string; time: string }>;
  typedMessage: string;
  setTypedMessage: (text: string) => void;
  handleSendChatMessage: (e: React.FormEvent) => void;
}

export const Consultation: React.FC<ConsultationProps> = ({
  doctorsList,
  selectedConsultationDoctor,
  setSelectedConsultationDoctor,
  consultationType,
  setConsultationType,
  isConsultationStarted,
  isConsultationConnecting,
  startConsultationSession,
  consultationMessages,
  typedMessage,
  setTypedMessage,
  handleSendChatMessage
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="text-right mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-stone-950">مشاوره آنلاین هوشمند با پزشکان برتر</h2>
        <p className="text-xs text-stone-500 font-light mt-1.5">
          بدون نیاز به مراجعه حضوری، بلافاصله مشاوره خود را با پزشکان فوق‌تخصص کشور آغاز کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
        
        {/* Left Column: Doctor list & Consultation setup (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-100 p-6 shadow-premium space-y-6 text-right flex flex-col justify-between">
          
          <div className="space-y-5">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">پزشکان آماده مشاوره</span>
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">۱. انتخاب پزشک معالج:</label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {doctorsList.slice(0, 5).map((doc) => {
                  const isSelected = selectedConsultationDoctor?.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setSelectedConsultationDoctor(doc);
                      }}
                      className={`w-full p-2.5 rounded-2xl border text-right transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500' 
                          : 'border-stone-100 hover:border-stone-200 bg-stone-50/30'
                      }`}
                    >
                      <img 
                        src={doc.imageUrl} 
                        alt={doc.name} 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <span className="block text-xs font-bold text-stone-900">{doc.name}</span>
                        <span className="block text-[9px] text-stone-400 font-light">{doc.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">۲. نوع مشاوره آنلاین:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'chat', label: 'متنی / چت', icon: <MessageCircle className="w-4 h-4" /> },
                  { id: 'voice', label: 'تلفنی / صوتی', icon: <PhoneCall className="w-4 h-4" /> },
                  { id: 'video', label: 'تصویری', icon: <Video className="w-4 h-4" /> }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setConsultationType(type.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      consultationType === type.id
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                        : 'border-stone-100 hover:border-stone-200 bg-stone-50/30 text-stone-600'
                    }`}
                  >
                    {type.icon}
                    <span className="text-[10px] font-bold">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startConsultationSession}
            disabled={isConsultationConnecting}
            className="w-full py-3 rounded-2xl bg-stone-950 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            {isConsultationConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>در حال برقراری اتصال امن...</span>
              </>
            ) : (
              <>
                <span>شروع مشاوره آنلاین فوری</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </>
            )}
          </button>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-100 shadow-premium overflow-hidden flex flex-col justify-between min-h-[500px]">
          <div className="p-5 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center text-right">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={selectedConsultationDoctor?.imageUrl} 
                  alt={selectedConsultationDoctor?.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-stone-900">{selectedConsultationDoctor?.name}</h4>
                <span className="text-[9px] text-emerald-600 font-medium">پزشک تاییدشده آنلاین</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FAF9F6]/30">
            {isConsultationStarted ? (
              <>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-100/40">
                    گفتگوی شما با موفقیت به صورت سرتاسر رمزنگاری آغاز شد.
                  </span>
                </div>

                {consultationMessages.map((msg, index) => {
                  const isDoc = msg.sender === 'doctor';
                  return (
                    <div 
                      key={index}
                      className={`flex ${isDoc ? 'justify-start' : 'justify-end'} text-right`}
                    >
                      <div className={`max-w-[75%] rounded-2xl p-4 text-xs whitespace-pre-line ${
                        isDoc 
                          ? 'bg-white border border-stone-200 text-stone-850 rounded-tr-none shadow-sm font-sans' 
                          : 'bg-stone-900 text-white rounded-tl-none shadow-sm'
                      }`}>
                        <p className="leading-relaxed font-light">{msg.text}</p>
                        <span className={`block text-[8px] mt-2 text-left ${isDoc ? 'text-stone-400' : 'text-stone-300'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 max-w-sm mx-auto my-auto">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">منتظر شروع گفتگو هستیم</h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  پزشک آماده پاسخگویی است. جهت آغاز مشاوره آنلاین و باز کردن پنجره گفتگوی صوتی یا متنی، روی دکمه «شروع مشاوره آنلاین فوری» کلیک کنید.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-stone-100 bg-stone-50/30">
            <form onSubmit={handleSendChatMessage} className="flex gap-2">
              <input
                type="text"
                disabled={!isConsultationStarted}
                placeholder={isConsultationStarted ? "پیام خود یا علائمتان (مثل تپش قلب، لک پوستی، سردرد...) را بنویسید..." : "جهت فعال‌سازی فیلد، ابتدا مشاوره را آغاز کنید"}
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs bg-white border border-stone-200 rounded-2xl focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!isConsultationStarted || !typedMessage.trim()}
                className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                  isConsultationStarted && typedMessage.trim()
                    ? 'bg-stone-900 hover:bg-emerald-600 text-white'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
