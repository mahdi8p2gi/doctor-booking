import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, Brain, Baby, Smile, HeartHandshake } from 'lucide-react';
import { MOCK_DOCTORS, SPECIALTIES, Doctor, Review } from './data/doctors';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { Notification, ToastMessage } from './components/Notification';

// Pages
import { Home } from './pages/Home';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { DoctorProfile } from './pages/DoctorProfile';
import { Consultation } from './pages/Consultation';
import { Magazine } from './pages/Magazine';
import { ArticleReader } from './pages/ArticleReader';
import { Appointments } from './pages/Appointments';
import { getSmartChatbotResponse } from './utils/chatbot';

export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  views: number;
  imageUrl: string;
  summary: string;
  content: string[];
}

export const MOCK_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'محمدرضا صادقی',
    job: 'کارآفرین',
    text: 'دکترینو واقعاً تجربه نوبت‌دهی را متحول کرده است. کارت نوبت دیجیتال و سیستم یادآوری پیامکی فوق‌العاده کاربردی هستند. منشی مطب قبل از رسیدن من پرونده‌ام را آماده کرده بود.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'سیمین حسینی',
    job: 'مدرس دانشگاه',
    text: 'رابط کاربری وب‌سایت در بالاترین سطح استاندارد است. فیلترهای تخصصی بسیار کارآمد عمل می‌کنند و امکان ثبت نظرات واقعی بیماران، تصمیم‌گیری را بسیار آسان می‌کند.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'حامد زارعی',
    job: 'برنامه‌نویس ارشد',
    text: 'برای مادرم نوبت جراحی قلب از دکتر پناهی گرفتم. بدون یک ثانیه معطلی تلفنی، کل فرآیند در کمتر از ۲ دقیقه انجام شد. سیستم استرداد وجه هم امنیت خاطر بی‌نظیری ایجاد می‌کند.',
    rating: 4.9
  }
];

export const MOCK_FAQS = [
  {
    question: 'آیا برای رزرو نوبت نیاز به پرداخت آنلاین هزینه کامل ویزیت است؟',
    answer: 'خیر، پرداخت هزینه به صورت آنلاین کاملاً اختیاری است. شما می‌توانید نوبت خود را به صورت کاملاً رایگان ثبت کرده و حق ویزیت را در مطب پزشک به صورت نقدی یا با کارت‌خوان پرداخت نمایید.'
  },
  {
    question: 'چگونه می‌توانم نوبت رزرو شده خود را لغو یا جابجا کنم؟',
    answer: 'کافیست به بخش «نوبت‌های من» در منوی بالای صفحه مراجعه کنید. در آنجا لیست نوبت‌های فعال شما نمایش داده می‌شود و با کلیک روی دکمه «لغو این نوبت»، نوبت شما بلافاصله آزاد و لغو می‌گردد.'
  },
  {
    question: 'مشاوره آنلاین با پزشک به چه صورت انجام می‌شود؟',
    answer: 'مشاوره آنلاین دکترینو به سه روش متنی (چت زنده)، صوتی و تصویری انجام می‌شود. پزشک در پنل اختصاصی آنلاین آماده پاسخگویی به سوالات، بررسی نتایج آزمایشات و تجویز نسخه الکترونیکی شما خواهد بود.'
  },
  {
    question: 'آیا نسخه‌های تجویزشده در دکترینو تحت پوشش بیمه هستند؟',
    answer: 'بله، تمامی نسخه‌های صادر شده توسط پزشکان دکترینو به صورت الکترونیکی و متصل به کد ملی بیمار ثبت می‌شوند و در تمامی داروخانه‌ها و مراکز درمانی تحت پوشش بیمه‌های پایه و تکمیلی شما قرار دارند.'
  }
];

export default function App() {
  // Preloader States
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloaderProgress, setPreloaderProgress] = useState(0);

  // Navigation & Page States
  const [currentPage, setCurrentPage] = useState<'home' | 'doctors' | 'appointments' | 'consultation' | 'magazine'>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string } | null>(() => {
    const savedUser = localStorage.getItem('doctorino_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Booking & Appointments State - Clean/Empty by default [] as requested!
  const [appointments, setAppointments] = useState<any[]>(() => {
    const saved = localStorage.getItem('doctorino_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  // Doctor List Mutation State
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(MOCK_DOCTORS);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'experience'>('popular');
  const [experienceFilter, setExperienceFilter] = useState<number>(0);

  // Modals & Notifications States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Favorite Doctors State
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('doctorino_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Review Form States (for selected doctor profile)
  const [newReviewName, setNewReviewName] = useState(currentUser?.name || '');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewTreatment, setNewReviewTreatment] = useState('');

  // Back to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Profile Page Tab State
  const [profileTab, setProfileTab] = useState<'about' | 'reviews' | 'services'>('about');

  // Online Consultation States
  const [consultationType, setConsultationType] = useState<'chat' | 'voice' | 'video'>('chat');
  const [selectedConsultationDoctor, setSelectedConsultationDoctor] = useState<Doctor | null>(MOCK_DOCTORS[0]);
  const [consultationMessages, setConsultationMessages] = useState<Array<{ sender: 'user' | 'doctor'; text: string; time: string }>>([
    { sender: 'doctor', text: 'سلام. من دستیار هوشمند تشخیصی و درمانی دکترینو هستم. چطور می‌توانم کمکتان کنم؟ لطفا علائم، نوع درد یا تخصص مورد نظر خود را بنویسید تا راهنمایی‌تان کنم.', time: '۱۰:۳۰' }
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const [isConsultationStarted, setIsConsultationStarted] = useState(false);
  const [isConsultationConnecting, setIsConsultationConnecting] = useState(false);

  // Article Helpfulness State
  const [articleFeedback, setArticleFeedback] = useState<'yes' | 'no' | null>(null);

  // Preloader progress emulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPreloaderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsPreloading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // CRITICAL FIX: Scroll to top instantly on any page/route/doctor/article change!
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [currentPage, selectedDoctor, selectedArticle]);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('doctorino_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('doctorino_user', JSON.stringify(currentUser));
      setNewReviewName(currentUser.name);
    } else {
      localStorage.removeItem('doctorino_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('doctorino_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Back to Top Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Toast trigger helper
  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Auth actions
  const handleLoginSuccess = (user: { name: string; phone: string }) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    addToast('خروج موفقیت‌آمیز', 'شما با موفقیت از حساب کاربری خود خارج شدید.', 'info');
  };

  // Booking actions
  const handleBookingComplete = (newBooking: any) => {
    setAppointments((prev) => [newBooking, ...prev]);
    addToast('رزرو موفقیت‌آمیز نوبت', `نوبت شما با ${newBooking.doctor.name} ثبت گردید.`, 'success');
  };

  const openBookingForDoctor = (doctor: Doctor) => {
    setBookingDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  // Cancel appointment action
  const handleCancelAppointment = (id: string) => {
    if (window.confirm('آیا از لغو این نوبت اطمینان کامل دارید؟ این عمل غیرقابل بازگشت است.')) {
      setAppointments((prev) => prev.filter((app) => app.id !== id));
      addToast('لغو نوبت انجام شد', 'نوبت انتخاب‌شده با موفقیت لغو و هزینه مسترد گردید.', 'warning');
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((fav) => fav !== id));
      addToast('حذف از علاقه‌مندی‌ها', 'پزشک از لیست نشان‌شده‌ها حذف شد.', 'info');
    } else {
      setFavorites((prev) => [...prev, id]);
      addToast('افزودن به علاقه‌مندی‌ها', 'پزشک به لیست نشان‌شده‌های شما اضافه شد.', 'success');
    }
  };

  // Add new patient review/comment in real-time
  const handleAddReview = (e: React.FormEvent, docId: string) => {
    e.preventDefault();
    if (!newReviewComment.trim()) {
      addToast('خطا در ثبت نظر', 'لطفاً متن نظر خود را بنویسید.', 'error');
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      userName: newReviewName || 'کاربر مهمان',
      rating: newReviewRating,
      date: '۱۴۰۴/۱۲/۲۴',
      comment: newReviewComment,
      treatment: newReviewTreatment || 'چکاپ عمومی'
    };

    setDoctorsList((prevDoctors) => {
      return prevDoctors.map((doc) => {
        if (doc.id === docId) {
          const updatedReviews = [newReview, ...doc.reviews];
          const newRating = (doc.rating * doc.reviewsCount + newReviewRating) / (doc.reviewsCount + 1);
          
          return {
            ...doc,
            reviews: updatedReviews,
            reviewsCount: doc.reviewsCount + 1,
            rating: Number(newRating.toFixed(2)),
            satisfactionRate: Math.min(100, Math.round(((doc.satisfactionRate * doc.reviewsCount) + (newReviewRating >= 4 ? 100 : 50)) / (doc.reviewsCount + 1)))
          };
        }
        return doc;
      });
    });

    if (selectedDoctor && selectedDoctor.id === docId) {
      const updatedReviews = [newReview, ...selectedDoctor.reviews];
      const newRating = (selectedDoctor.rating * selectedDoctor.reviewsCount + newReviewRating) / (selectedDoctor.reviewsCount + 1);
      setSelectedDoctor({
        ...selectedDoctor,
        reviews: updatedReviews,
        reviewsCount: selectedDoctor.reviewsCount + 1,
        rating: Number(newRating.toFixed(2)),
        satisfactionRate: Math.min(100, Math.round(((selectedDoctor.satisfactionRate * selectedDoctor.reviewsCount) + (newReviewRating >= 4 ? 100 : 50)) / (selectedDoctor.reviewsCount + 1)))
      });
    }

    setNewReviewComment('');
    setNewReviewTreatment('');
    addToast('سپاس از نظر شما', 'دیدگاه شما ثبت گردید و در صفحه پزشک نمایش داده می‌شود.', 'success');
  };

  // Start Online Consultation Session
  const startConsultationSession = () => {
    setIsConsultationConnecting(true);
    setTimeout(() => {
      setIsConsultationConnecting(false);
      setIsConsultationStarted(true);
      addToast('اتصال برقرار شد', `مشاوره آنلاین با ${selectedConsultationDoctor?.name || 'پزشک'} آغاز گردید.`, 'success');
    }, 1500);
  };

  // Send a message in simulated chat (LIGHTWEIGHT CLINICAL CHATBOT)
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: typedMessage,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setConsultationMessages((prev) => [...prev, userMsg]);
    
    const currentUserText = typedMessage;
    setTypedMessage('');

    setTimeout(() => {
      const chatbotReply = getSmartChatbotResponse(currentUserText);
      
      if (chatbotReply.suggestedDoctorId) {
        const recommendedDoc = MOCK_DOCTORS.find(d => d.id === chatbotReply.suggestedDoctorId);
        if (recommendedDoc && selectedConsultationDoctor?.id !== recommendedDoc.id) {
          setSelectedConsultationDoctor(recommendedDoc);
        }
      }

      setConsultationMessages((prev) => [...prev, {
        sender: 'doctor' as const,
        text: chatbotReply.text,
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      }]);
      addToast('پیام جدید از پزشک', `یک پاسخ درمانی جدید از ${selectedConsultationDoctor?.name} دریافت شد.`, 'info');
    }, 1200);
  };

  // Filter & Sort Logic
  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.clinicName.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialtyEn === selectedSpecialty;
    const matchesExperience = doc.experienceYears >= experienceFilter;
    
    return matchesSearch && matchesSpecialty && matchesExperience;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.fee - b.fee;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    return 0;
  });

  // Icon Helper for Specialties
  const getSpecialtyIcon = (iconName: string) => {
    switch(iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Brain': return <Brain className="w-6 h-6 text-purple-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-indigo-600" />;
      case 'Baby': return <Baby className="w-6 h-6 text-pink-500" />;
      case 'Smile': return <Smile className="w-6 h-6 text-sky-500" />;
      default: return <Activity className="w-6 h-6 text-emerald-600" />;
    }
  };

  // Mock Articles list for Health Magazine
  const MOCK_ARTICLES: Article[] = [
    {
      id: 'art-1',
      title: 'پیشگیری از بیماری‌های قلبی: ۵ عادت طلایی سبک زندگی',
      category: 'سلامت قلب',
      author: 'دکتر سارا علوی',
      readTime: '۶ دقیقه مطالعه',
      views: 1420,
      imageUrl: 'https://img.freepik.com/free-photo/stethoscope-placed-doctor-hand-chest-examination-closeup_1150-26462.jpg',
      summary: 'بیماری‌های قلبی عروقی یکی از شایع‌ترین علل مرگ و میر در جهان هستند. در این مقاله به بررسی رفتارهای خودمراقبتی و رژیم‌های غذایی موثر می‌پردازیم.',
      content: [
        'قلب موتور تپنده بدن ماست و سلامت آن به طور مستقیم تحت تاثیر سبک زندگی و عادات روزمره قرار دارد. متاسفانه به دلیل تغییر رفتارهای تغذیه‌ای و کاهش فعالیت بدنی، آمار ابتلا به نارسایی‌های قلبی روندی صعودی داشته است که می‌توان با چند تغییر ساده اما حیاتی، خطر ابتلا به این بیماری‌ها را تا ۸۰ درصد کاهش داد.',
        '۱. تغذیه سالم و مدیترانه‌ای: مصرف سبزیجات تازه، غلات کامل، مغزها و استفاده از روغن زیتون به جای روغن‌های اشباع‌شده می‌تواند به شکل معجزه‌آسایی کلسترول بد خون (LDL) را کاهش دهد. همچنین، کاهش مصرف سدیم (نمک) نقشی کلیدی در کنترل فشار خون بالا ایفا می‌کند.',
        '۲. ورزش روزانه منظم: حداقل ۳۰ دقیقه پیاده‌روی تند در روز یا انجام ورزش‌های هوازی ملایم در طول هفته، ماهیچه‌های قلب را تقویت کرده، جریان خون را بهبود بخشیده و فشار خون را در محدوده کاملاً نرمال نگه می‌دارد.',
        '۳. مدیریت استرس و خواب کافی: کم‌خوابی مزمن و فشارهای روانی شدید، هورمون کورتیزول را در خون افزایش می‌دهند. این افزایش هورمونی به مرور زمان باعث ایجاد پلاک در دیواره عروق و افزایش خطر حملات قلبی می‌گردد. تلاش کنید هر شب حداقل ۷ الی ۸ ساعت خواب باکیفیت داشته باشید و از تکنیک‌های تنفس عمیق بهره بگیرید.',
        '۴. قطع مصرف دخانیات و الکل: مواد شیمیایی موجود در دود تنباکو به عروق قلبی آسیب رسانده و منجر به آترواسکلروز (تصلب شرایین) می‌شوند. ترک سیگار یکی از بزرگ‌ترین و ارزشمندترین هدیه‌هایی است که می‌توانید به قلب خود تقدیم کنید.',
        'در نهایت، کنترل دوره‌ای قند و چربی خون و مشاوره منظم با پزشک متخصص قلب می‌تواند ضامن سلامت پایدار شما باشد. پایش هوشمند فشار خون در منزل و انجام چکاپ‌های سالانه اکوکاردیوگرافی را هرگز فراموش نکنید.'
      ]
    },
    {
      id: 'art-2',
      title: 'راهنمای جامع مراقبت از پوست در فصل بهار و تابستان',
      category: 'پوست و زیبایی',
      author: 'دکتر امیرحسین کریمی',
      readTime: '۴ دقیقه مطالعه',
      views: 980,
      imageUrl: 'https://img.freepik.com/free-photo/woman-applying-moisturizer-her-face_23-2148281145.jpg',
      summary: 'با تغییر فصل، نیازهای رطوبتی و محافظتی پوست شما تغییر می‌کند. در اینجا اصول انتخاب کرم‌های ضدآفتاب و شوینده‌های مناسب را آموزش می‌دهیم.',
      content: [
        'پوست به عنوان وسیع‌ترین ارگان بدن، اولین سد دفاعی در برابر اشعه‌های مضر خورشید و آلودگی‌های محیطی است. با فرارسیدن روزهای گرم سال، میزان ترشح سبوم (چربی طبیعی پوست) و تعریق افزایش می‌یابد و نیازهای مراقبتی پوست دستخوش تغییرات اساسی می‌شود.',
        'اصلی‌ترین کلید مراقبت پوست در تابستان، استفاده مداوم و اصولی از کرم ضدآفتاب با SPF مناسب (حداقل ۳۰) است. نور خورشید حاوی اشعه‌های UVA (عامل پیری زودرس و چروک) و UVB (عامل سوختگی و سرطان پوست) است. ضدآفتاب باید هر ۲ ساعت یک‌بار تمدید شود تا اثربخشی کافی داشته باشد.',
        'همچنین، آبرسانی پوست را فراموش نکنید. هوای گرم باعث تعریق بیشتر و تبخیر رطوبت پوست می‌شود. برای پیشگیری از انسداد منافذ و ایجاد جوش، استفاده از آبرسان‌های با پایه آب و فاقد چربی (Oil-Free) توصیه می‌گردد.',
        'شستشوی دو مرحله‌ای پوست در پایان روز جهت پاکسازی کامل لایه‌های ضدآفتاب، مواد آرایشی و ذرات معلق آلودگی هوا، گام بسیار موثری در حفظ شفافیت و پیشگیری از ایجاد کدرشدن پوست و جوش‌های سرسیاه است. هفته‌ای یک‌بار لایه‌برداری ملایم با اسیدهای میوه (AHA/BHA) نیز به شادابی پوست کمک شایانی خواهد کرد.'
      ]
    },
    {
      id: 'art-3',
      title: 'سردردهای میگرنی: علل شایع تحریک و روش‌های نوین درمان',
      category: 'مغز و اعصاب',
      author: 'دکتر یاسمن راد',
      readTime: '۸ دقیقه مطالعه',
      views: 2150,
      imageUrl: 'https://img.freepik.com/free-photo/young-man-suffering-from-severe-headache_23-2148301726.jpg',
      summary: 'میگرن فراتر از یک سردرد ساده است. روش‌های دارویی، تزریق بوتاکس و مدیریت استرس چه جایگاهی در کاهش حملات این بیماری دارند؟',
      content: [
        'حملات میگرن می‌توانند کاملاً ناتوان‌کننده باشند و کیفیت زندگی فرد را به شدت تحت تاثیر قرار دهند. میگرن یک بیماری بیولوژیکی و ژنتیکی عصبی است که علائمی مانند سردرد ضربان‌دار در یک سمت سر، حساسیت شدید به نور و صدا، حالت تهوع و گاهی اختلالات بینایی موقت (اورا) را به همراه دارد.',
        'محرک‌های شایع حملات میگرن بسیار متنوع هستند؛ نوسانات هورمونی در بانوان، تغییرات ناگهانی آب و هوایی، بوهای تند و شیمیایی، نورهای چشمک‌زن و شدید، کم‌آبی بدن، و مصرف برخی مواد غذایی حاوی تیرامین (مانند پنیرهای کهنه و شکلات تلخ) از متداول‌ترین آن‌ها می‌باشند.',
        'در سال‌های اخیر، درمان‌های بسیار موثری برای کنترل و کاهش شدت حملات میگرن ابداع شده است. یکی از موفق‌ترین روش‌ها برای افراد مبتلا به میگرن مزمن (بیش از ۱۵ روز سردرد در ماه)، تزریق دوره‌ای بوتاکس تخصصی در نقاط ۳۱گانه سر، پیشانی و گردن است که سیگنال‌های انتقال درد به مغز را مسدود می‌کند.',
        'همچنین نسل جدید داروهای پیشگیرانه (مانند آنتی‌بادی‌های ضد گیرنده CGRP) انقلابی در کنترل این بیماری ایجاد کرده‌اند. شناسایی محرک‌های شخصی از طریق یادداشت روزانه حملات و داشتن رژیم غذایی منظم، پایه‌های اصلی مدیریت میگرن هستند که باید حتماً تحت نظارت فوق‌تخصص مغز و اعصاب قرار بگیرند.'
      ]
    },
    {
      id: 'art-4',
      title: 'چگونه اضطراب روزمره را بدون دارو کنترل کنیم؟',
      category: 'روان‌پزشکی',
      author: 'دکتر رضا مهدوی',
      readTime: '۵ دقیقه مطالعه',
      views: 1840,
      imageUrl: 'https://img.freepik.com/free-photo/anxious-woman-holding-her-head-psychotherapist-office_23-2148301648.jpg',
      summary: 'روش‌های رفتاردرمانی شناختی (CBT)، تمرینات تنفسی عمیق و ذهن‌آگاهی می‌توانند به طرز چشمگیری سطح اضطراب شما را مهار کنند.',
      content: [
        'اضطراب پاسخ طبیعی مغز به موقعیت‌های تنش‌زا و تهدیدآمیز است، اما زمانی که این حالت به صورت مداوم، شدید و بدون دلیل مشخص تکرار شود، به یک اختلال فرساینده تبدیل می‌گردد که تمرکز و عملکرد روزانه ما را فلج می‌کند.',
        'کنترل اضطراب خفیف تا متوسط در بسیاری از موارد بدون نیاز به داروهای شیمیایی آرام‌بخش و تنها با اصلاح الگوهای فکری و رفتاری امکان‌پذیر است. رفتاردرمانی شناختی (CBT) به ما می‌آموزد چگونه افکار منفی و فاجعه‌ساز را شناسایی کرده و آن‌ها را با دیدگاهی واقع‌بینانه جایگزین کنیم.',
        'تمرینات تنفس عمیق (مانند روش مربع یا تکنیک ۴-۷-۸) با فعال کردن سیستم عصبی پاراسمپاتیک، ضربان قلب را کاهش داده، ماهیچه‌ها را شل کرده و بلافاصله سیگنال‌های آرامش و امنیت را به مغز ارسال می‌کند. انجام روزانه ۱۰ دقیقه مراقبه یا ذهن‌آگاهی (Mindfulness) نیز تاثیر شگرفی در آرامش ذهن دارد.',
        'ورزش منظم هورمون‌های استرس (مانند کورتیزول و آدرنالین) را کاهش داده و ترشح اندورفین را افزایش می‌دهد. همچنین، کاهش مصرف کافئین، شکر و محدود کردن حضور در شبکه‌های اجتماعی اخبار استرس‌زا از اقدامات اولیه و ضروری به شمار می‌رو‌ند. در صورت تداوم علائم، مشاوره با روان‌پزشک یا روان‌شناس گام بعدی درمان خواهد بود.'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] relative">
      
      {/* 1. PREMIUM PRELOADER */}
      <Preloader 
        isPreloading={isPreloading}
        preloaderProgress={preloaderProgress}
      />

      {/* Top Banner Message */}
      <div className="bg-stone-900 text-stone-300 text-center py-2 px-4 text-[11px] font-medium flex items-center justify-center gap-1.5 border-b border-stone-800">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>دکترینو VIP: تجربه نوبت‌دهی بدون معطلی با تخفیف‌های ویژه بیمه‌های تکمیلی آغاز شد.</span>
      </div>

      {/* Header Navigation */}
      <Header
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setSelectedDoctor(null);
          setSelectedArticle(null);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        appointmentsCount={appointments.length}
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* 1. HOME SCREEN */}
        {/* ========================================================= */}
        {currentPage === 'home' && !selectedDoctor && !selectedArticle && (
          <Home 
            doctorsList={doctorsList}
            specialties={SPECIALTIES}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            setCurrentPage={setCurrentPage}
            setSelectedDoctor={setSelectedDoctor}
            setProfileTab={setProfileTab}
            openBookingForDoctor={openBookingForDoctor}
            addToast={addToast}
            getSpecialtyIcon={getSpecialtyIcon}
            openFaqIndex={openFaqIndex}
            setOpenFaqIndex={setOpenFaqIndex}
            faqs={MOCK_FAQS}
            testimonials={MOCK_TESTIMONIALS}
          />
        )}

        {/* ========================================================= */}
        {/* 2. DOCTORS DIRECTORY SCREEN */}
        {/* ========================================================= */}
        {currentPage === 'doctors' && !selectedDoctor && !selectedArticle && (
          <DoctorsDirectory 
            sortedDoctors={sortedDoctors}
            specialties={SPECIALTIES}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            experienceFilter={experienceFilter}
            setExperienceFilter={setExperienceFilter}
            setSelectedDoctor={setSelectedDoctor}
            setProfileTab={setProfileTab}
            openBookingForDoctor={openBookingForDoctor}
            addToast={addToast}
          />
        )}

        {/* ========================================================= */}
        {/* 3. DOCTOR PROFILE DETAIL SCREEN */}
        {/* ========================================================= */}
        {selectedDoctor && !selectedArticle && (
          <DoctorProfile 
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            openBookingForDoctor={openBookingForDoctor}
            addToast={addToast}
            profileTab={profileTab}
            setProfileTab={setProfileTab}
            newReviewName={newReviewName}
            setNewReviewName={setNewReviewName}
            newReviewTreatment={newReviewTreatment}
            setNewReviewTreatment={setNewReviewTreatment}
            newReviewRating={newReviewRating}
            setNewReviewRating={setNewReviewRating}
            newReviewComment={newReviewComment}
            setNewReviewComment={setNewReviewComment}
            handleAddReview={handleAddReview}
          />
        )}

        {/* ========================================================= */}
        {/* 4. ONLINE CONSULTATION SECTION */}
        {/* ========================================================= */}
        {currentPage === 'consultation' && !selectedDoctor && !selectedArticle && (
          <Consultation 
            doctorsList={doctorsList}
            selectedConsultationDoctor={selectedConsultationDoctor}
            setSelectedConsultationDoctor={setSelectedConsultationDoctor}
            consultationType={consultationType}
            setConsultationType={setConsultationType}
            isConsultationStarted={isConsultationStarted}
            isConsultationConnecting={isConsultationConnecting}
            startConsultationSession={startConsultationSession}
            consultationMessages={consultationMessages}
            typedMessage={typedMessage}
            setTypedMessage={setTypedMessage}
            handleSendChatMessage={handleSendChatMessage}
          />
        )}

        {/* ========================================================= */}
        {/* 5. HEALTH MAGAZINE / ARTICLES SCREEN */}
        {/* ========================================================= */}
        {currentPage === 'magazine' && !selectedDoctor && !selectedArticle && (
          <Magazine 
            articles={MOCK_ARTICLES}
            setSelectedArticle={setSelectedArticle}
            setArticleFeedback={setArticleFeedback}
            addToast={addToast}
          />
        )}

        {/* ========================================================= */}
        {/* 5.1 DEDICATED ARTICLE READING VIEW */}
        {/* ========================================================= */}
        {selectedArticle && (
          <ArticleReader 
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
            articleFeedback={articleFeedback}
            setArticleFeedback={setArticleFeedback}
            addToast={addToast}
          />
        )}

        {/* ========================================================= */}
        {/* 6. MY APPOINTMENTS SCREEN (MODULARIZED!) */}
        {/* ========================================================= */}
        {currentPage === 'appointments' && !selectedDoctor && !selectedArticle && (
          <Appointments 
            appointments={appointments}
            setSelectedSpecialty={setSelectedSpecialty}
            setCurrentPage={setCurrentPage}
            handleCancelAppointment={handleCancelAppointment}
          />
        )}

      </main>

      {/* FOOTER */}
      <Footer 
        setCurrentPage={setCurrentPage}
        setSelectedDoctor={setSelectedDoctor}
        setSelectedArticle={setSelectedArticle}
        setSelectedSpecialty={setSelectedSpecialty}
        addToast={addToast}
      />

      {/* Floating Back to Top Button */}
      <BackToTop 
        showBackToTop={showBackToTop}
        scrollToTop={scrollToTop}
      />

      {/* DIALOGS AND MODALS */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleLoginSuccess}
        addToast={addToast}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        doctor={bookingDoctor}
        currentUser={currentUser}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingDoctor(null);
        }}
        onBookingComplete={handleBookingComplete}
        addToast={addToast}
        openAuthModal={() => {
          setIsBookingModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      <Notification
        toasts={toasts}
        onClose={removeToast}
      />

    </div>
  );
}
