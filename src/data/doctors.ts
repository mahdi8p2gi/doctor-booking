export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  treatment: string;
}

export interface AppointmentSlot {
  dayName: string; // e.g. "شنبه", "یک‌شنبه"
  dateStr: string; // e.g. "۱۴ اردیبهشت"
  dateIso: string; // e.g. "2026-05-03"
  slots: string[]; // e.g. ["۰۹:۰۰", "۱۰:۳۰", "۱۶:۰۰", "۱۷:۳۰"]
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyEn: string;
  title: string; // e.g. "فوق تخصص بیماری‌های قلب و عروق"
  rating: number;
  experienceYears: number;
  reviewsCount: number;
  imageUrl: string;
  clinicName: string;
  clinicAddress: string;
  fee: number; // in Tomans
  phone: string;
  bio: string;
  medicalCode: string; // نظام پزشکی
  satisfactionRate: number; // percent
  services: string[];
  reviews: Review[];
  availableSlots: AppointmentSlot[];
}

export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
}

export const SPECIALTIES: Specialty[] = [
  { id: 'cardiology', name: 'قلب و عروق', iconName: 'Activity', count: 12, description: 'پیشگیری، تشخیص و درمان بیماری‌های قلبی' },
  { id: 'dermatology', name: 'پوست، مو و زیبایی', iconName: 'Sparkles', count: 18, description: 'زیبایی، جوانسازی، درمان بیماری‌های پوستی' },
  { id: 'neurology', name: 'مغز و اعصاب', iconName: 'Brain', count: 9, description: 'سردرد، ستون فقرات، اختلالات عصبی' },
  { id: 'psychiatry', name: 'روان‌پزشکی و اعصاب', iconName: 'HeartHandshake', count: 14, description: 'مشاوره، روان‌درمانی، درمان افسردگی و اضطراب' },
  { id: 'gynecology', name: 'زنان و زایمان', iconName: 'Baby', count: 16, description: 'مراقبت‌های بارداری، بیماری‌های زنان' },
  { id: 'pediatrics', name: 'کودکان و نوزادان', iconName: 'Smile', count: 11, description: 'رشد و تکامل، واکسیناسیون، بیماری‌های کودکان' }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'دکتر سارا علوی',
    specialty: 'قلب و عروق',
    specialtyEn: 'cardiology',
    title: 'فوق تخصص کاردیولوژی و اینترونشنال کاردیولوژی',
    rating: 4.92,
    experienceYears: 14,
    reviewsCount: 324,
    // Confident, close-up Caucasian female doctor portrait
    imageUrl: 'https://images.pexels.com/photos/7578810/pexels-photo-7578810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'کلینیک تخصصی قلب آریانا',
    clinicAddress: 'تهران، خیابان ولیعصر، بالاتر از ظفر، کوچه بابک، پلاک ۱۲، طبقه ۴',
    fee: 280000,
    phone: '۰۲۱-۸۸۷۶۵۴۳۲',
    bio: 'دکتر سارا علوی از پزشکان برجسته قلب و عروق با بیش از ۱۴ سال سابقه درخشان در زمینه آنژیوگرافی، آنژیوپلاستی و درمان بیماری‌های مادرزادی قلب هستند. ایشان فارغ‌التحصیل ممتاز دانشگاه علوم پزشکی تهران و عضو فعال انجمن قلب اروپا می‌باشند.',
    medicalCode: 'ن-۱۲۳۴۵',
    satisfactionRate: 98,
    services: [
      'اکوکاردیوگرافی رنگی پیشرفته',
      'تست ورزش قلب الکترونیکی',
      'کنترل فشار خون و آریتمی قلبی',
      'آنژیوگرافی و استنت‌گذاری عروق کرونر',
      'مشاوره قلب قبل از جراحی‌های بزرگ'
    ],
    reviews: [
      {
        id: 'rev-1-1',
        userName: 'مریم حسینی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۰',
        comment: 'بسیار پزشک بااخلاق، صبور و متخصصی هستند. مادرم را برای کنترل نارسایی قلب خدمت ایشان بردیم و با تشخیص دقیق ایشان، حال عمومی‌شان بسیار بهتر شده است.',
        treatment: 'کنترل نارسایی قلب'
      },
      {
        id: 'rev-1-2',
        userName: 'علیرضا رضایی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۰۲',
        comment: 'دقت عمل و وقت‌گذاری خانم دکتر بی‌نظیر است. استرس من را کاملاً برطرف کردند و به تمامی سوالات با سعه صدر پاسخ دادند.',
        treatment: 'آنژیوگرافی و استنت'
      }
    ],
    availableSlots: [
      {
        dayName: 'شنبه',
        dateStr: '۱۵ اردیبهشت',
        dateIso: '2026-05-05',
        slots: ['۰۹:۰۰', '۰۹:۴۵', '۱۰:۳۰', '۱۱:۱۵', '۱۶:۰۰', '۱۶:۴۵', '۱۷:۳۰', '۱۸:۱۵']
      },
      {
        dayName: 'یک‌شنبه',
        dateStr: '۱۶ اردیبهشت',
        dateIso: '2026-05-06',
        slots: ['۰۹:۱۵', '۱۰:۰۰', '۱۰:۴۵', '۱۶:۳۰', '۱۷:۱۵', '۱۸:۰۰']
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'دکتر امیرحسین کریمی',
    specialty: 'پوست، مو و زیبایی',
    specialtyEn: 'dermatology',
    title: 'متخصص پوست، مو، زیبایی و لیزر پوست',
    rating: 4.85,
    experienceYears: 11,
    reviewsCount: 198,
    // Smiling young Caucasian male doctor headshot
    imageUrl: 'https://images.pexels.com/photos/15962798/pexels-photo-15962798.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'مرکز زیبایی و جوانسازی رز سفید',
    clinicAddress: 'تهران، الهیه، خیابان فرشته، مجتمع اداری تجاری داریوش، طبقه ۲، واحد ۷',
    fee: 300000,
    phone: '۰۲۱-۲۲۰۰۹۹۸۸',
    bio: 'دکتر امیرحسین کریمی، رتبه برتر آزمون تخصص پوست و مو، متخصص در درمان‌های زیبایی مدرن و جوانسازی پوست با تکنیک‌های پیشرفته روز دنیا هستند. ایشان پیشگام متدهای غیرتهاجمی زیبایی در کشور می‌باشند.',
    medicalCode: 'ن-۴۵۶۷۸',
    satisfactionRate: 96,
    services: [
      'جوانسازی پوست با تزریق فیلر و بوتاکس پرمیوم',
      'لیزر درمانی اسکار، جوش و لک با دستگاه پیشرفته Fotona',
      'درمان تخصصی ریزش مو با متدهای مزوتراپی و PRP'
    ],
    reviews: [
      {
        id: 'rev-2-1',
        userName: 'آنا ناصری',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۴',
        comment: 'تزریق فیلر لب و چانه پیش خانم دکتر/آقای دکتر انجام دادم. کارشون فوق‌العاده طبیعی و عالی هست. قرینه‌سازی بی‌نظیری انجام دادن.',
        treatment: 'تزریق فیلر خط خنده و لب'
      }
    ],
    availableSlots: [
      {
        dayName: 'یک‌شنبه',
        dateStr: '۱۶ اردیبهشت',
        dateIso: '2026-05-06',
        slots: ['۱۴:۰۰', '۱۴:۳۰', '۱۵:۰۰', '۱۵:۳۰', '۱۶:۰۰', '۱۶:۳۰']
      },
      {
        dayName: 'سه‌شنبه',
        dateStr: '۱۸ اردیبهشت',
        dateIso: '2026-05-08',
        slots: ['۱۰:۰۰', '۱۰:۳۰', '۱۱:۰۰', '۱۱:۳۰', '۱۵:۰۰', '۱۵:۳۰']
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'دکتر یاسمن راد',
    specialty: 'مغز و اعصاب',
    specialtyEn: 'neurology',
    title: 'فوق تخصص بیماری‌های مغز، اعصاب و ستون فقرات',
    rating: 4.95,
    experienceYears: 16,
    reviewsCount: 412,
    // Confident Caucasian female doctor with stethoscope
    imageUrl: 'https://images.pexels.com/photos/32254667/pexels-photo-32254667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'ساختمان پزشکان لوکس کاج',
    clinicAddress: 'تهران، سعادت‌آباد، بین میدان کاج و شهرداری، پلاک ۴۵، طبقه همکف، واحد ۲',
    fee: 290000,
    phone: '۰۲۱-۸۸۰۹۰۹۰۹',
    bio: 'دکتر یاسمن راد یکی از سرشناس‌ترین متخصصان مغز و اعصاب در کشور هستند. ایشان پس از گذراندن دوره‌های فوق تخصصی در فرانسه، مطب مدرن خود را در تهران تاسیس کردند.',
    medicalCode: 'ن-۹۸۷۶۵',
    satisfactionRate: 99,
    services: [
      'نوار مغز (EEG) و نوار عصب و عضله (EMG) پیشرفته',
      'درمان نوین سردردهای میگرنی با تزریق بوتاکس دیسپورت',
      'درمان‌های غیرجراحی دیسک کمر، گردن و سیاتیک'
    ],
    reviews: [
      {
        id: 'rev-3-1',
        userName: 'کامران یزدانی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۰۹',
        comment: 'خانم دکتر زندگی دوباره به من بخشیدند. ماه‌ها از میگرن شدید رنج می‌بردم و هیچ مسکنی کارساز نبود. با تزریق بوتاکس میگرن توسط ایشان، حملاتم به صفر رسیده است.',
        treatment: 'درمان میگرن مزمن'
      }
    ],
    availableSlots: [
      {
        dayName: 'شنبه',
        dateStr: '۱۵ اردیبهشت',
        dateIso: '2026-05-05',
        slots: ['۱۶:۰۰', '۱۶:۴۰', '۱۷:۲۰', '۱۸:۰۰', '۱۸:۴۰']
      },
      {
        dayName: 'دوشنبه',
        dateStr: '۱۷ اردیبهشت',
        dateIso: '2026-05-07',
        slots: ['۱۶:۰۰', '۱۶:۴۰', '۱۷:۲۰', '۱۸:۰۰']
      }
    ]
  },
  {
    id: 'doc-4',
    name: 'دکتر رضا مهدوی',
    specialty: 'روان‌پزشکی و اعصاب',
    specialtyEn: 'psychiatry',
    title: 'متخصص اعصاب و روان و فوق تخصص روان‌درمانی فردی',
    rating: 4.78,
    experienceYears: 12,
    reviewsCount: 156,
    // Confident Caucasian male healthcare professional headshot
    imageUrl: 'https://images.pexels.com/photos/32115962/pexels-photo-32115962.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'کلینیک روان‌شناختی و روان‌‌پزشکی آرامش',
    clinicAddress: 'تهران، پاسداران، بوستان پنجم، نبش خیابان پایدارفرد، برج مهر، طبقه ۵',
    fee: 260000,
    phone: '۰۲۱-۲۲۵۵۸۸۴۴',
    bio: 'دکتر رضا مهدوی با رویکردی علمی و همدلانه، به درمان انواع اختلالات اضطرابی، افسردگی، پانیک، و مشکلات زناشویی می‌پردازند.',
    medicalCode: 'ن-۳۴۲۱۱',
    satisfactionRate: 94,
    services: [
      'روان‌درمانی تخصصی اضطراب، افسردگی و وسواس فکری',
      'درمان حملات پانیک و استرس شدید پس از سانحه',
      'زوج‌درمانی و حل تعارضات زناشویی'
    ],
    reviews: [
      {
        id: 'rev-4-1',
        userName: 'پیمان حسینی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۲',
        comment: 'روان‌پزشک بسیار با درک و با حوصله‌ای هستند. هیچ‌وقت سریع دارو تجویز نمی‌کنند، ابتدا کاملاً ریشه مشکل را بررسی می‌کنند.',
        treatment: 'درمان حملات پانیک'
      }
    ],
    availableSlots: [
      {
        dayName: 'شنبه',
        dateStr: '۱۵ اردیبهشت',
        dateIso: '2026-05-05',
        slots: ['۱۱:۰۰', '۱۲:۰۰', '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰']
      },
      {
        dayName: 'یک‌شنبه',
        dateStr: '۱۶ اردیبهشت',
        dateIso: '2026-05-06',
        slots: ['۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۴:۰۰', '۱۵:۰۰']
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'دکتر المیرا حسینی',
    specialty: 'زنان و زایمان',
    specialtyEn: 'gynecology',
    title: 'متخصص جراحی زنان، زایمان و فوق تخصص نازایی و لاپاراسکوپی',
    rating: 4.9,
    experienceYears: 18,
    reviewsCount: 489,
    // Replaced Black female doctor with a gorgeous smiling Caucasian female doctor portrait
    imageUrl: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'بیمارستان و مرکز درمانی فوق تخصصی پارسیان',
    clinicAddress: 'تهران، سعادت‌آباد، خیابان سرو شرقی، پلاک ۳۲، کلینیک بانوان طبقه ۳',
    fee: 270000,
    phone: '۰۲۱-۸۸۴۴۲۲۱۱',
    bio: 'دکتر المیرا حسینی دارای بورد تخصصی زنان و زایمان با سال‌ها تجربه موفق در انجام عمل‌های جراحی میکروسکوپی و لاپاراسکوپی و درمان ناباروری هستند.',
    medicalCode: 'ن-۵۵۶۶۷',
    satisfactionRate: 97,
    services: [
      'مراقبت‌های دوران بارداری و زایمان طبیعی و سزارین لوکس',
      'جراحی‌های لاپاراسکوپی پیشرفته رحم و تخمدان',
      'درمان تخصصی ناباروری و IVF با متدهای نوین جهانی'
    ],
    reviews: [
      {
        id: 'rev-5-1',
        userName: 'شیرین خدادادی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۵',
        comment: 'تحت نظر خانم دکتر زایمان سزارین انجام دادم. کارشون بی‌نظیر بود، بخیه‌ها فوق‌العاده ظریف و بدون درد.',
        treatment: 'مراقبت بارداری و سزارین'
      }
    ],
    availableSlots: [
      {
        dayName: 'شنبه',
        dateStr: '۱۵ اردیبهشت',
        dateIso: '2026-05-05',
        slots: ['۰۸:۳۰', '۰۹:۱۵', '۱۰:۰۰', '۱۰:۴۵']
      },
      {
        dayName: 'دوشنبه',
        dateStr: '۱۷ اردیبهشت',
        dateIso: '2026-05-07',
        slots: ['۰۸:۳۰', '۰۹:۱۵', '۱۰:۰۰', '۱۰:۴۵', '۱۳:۳۰']
      }
    ]
  },
  {
    id: 'doc-6',
    name: 'دکتر آرش پارسا',
    specialty: 'کودکان و نوزادان',
    specialtyEn: 'pediatrics',
    title: 'فوق تخصص بیماری‌های عفونی و رشد نوزادان و کودکان',
    rating: 4.88,
    experienceYears: 15,
    reviewsCount: 275,
    // Smiling Caucasian male doctor in scrubs
    imageUrl: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'مجتمع بین‌المللی سلامت کودکان پارس',
    clinicAddress: 'تهران، شهرک غرب، خیابان دادمان، نبش خیابان درختی، ساختمان پزشکان پردیس، طبقه ۴',
    fee: 250000,
    phone: '۰۲۱-۸۸۵۵۰۰۱۱',
    bio: 'دکتر آرش پارسا، نویسنده کتاب‌های مرجع مراقبت از نوزادان و عضو هیئت علمی دانشگاه، با بیش از ۱۵ سال تجربه بالینی می‌باشند.',
    medicalCode: 'ن-۷۷۸۸۹',
    satisfactionRate: 95,
    services: [
      'پایش رشد فیزیکی، تکامل حرکتی و ذهنی نوزادان و اطفال',
      'درمان بیماری‌های عفونی، آلرژی و آسم کودکان',
      'مشاوره اختصاصی تغذیه و رفع کم‌وزنی اطفال'
    ],
    reviews: [
      {
        id: 'rev-6-1',
        userName: 'بهاره مقیمی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۱',
        comment: 'پسر من شدیداً از دکتر می‌ترسید ولی آقای دکتر پارسا با بازی و خوش‌رویی تمام معاینات را انجام دادند.',
        treatment: 'درمان آسم و آلرژی کودکان'
      }
    ],
    availableSlots: [
      {
        dayName: 'یک‌شنبه',
        dateStr: '۱۶ اردیبهشت',
        dateIso: '2026-05-06',
        slots: ['۱۶:۰۰', '۱۶:۳۰', '۱۷:۰۰', '۱۷:۳۰', '۱۸:۰۰']
      },
      {
        dayName: 'سه‌شنبه',
        dateStr: '۱۸ اردیبهشت',
        dateIso: '2026-05-08',
        slots: ['۱۶:۰۰', '۱۶:۳۰', '۱۷:۰۰', '۱۷:۳0']
      }
    ]
  },
  {
    id: 'doc-7',
    name: 'دکتر نیلوفر بهرامی',
    specialty: 'پوست، مو و زیبایی',
    specialtyEn: 'dermatology',
    title: 'متخصص و جراح پوست، مو و لیزرهای جوانسازی',
    rating: 4.81,
    experienceYears: 9,
    reviewsCount: 142,
    // Confident female doctor in mint scrubs with glasses (Caucasian)
    imageUrl: 'https://images.pexels.com/photos/5207104/pexels-photo-5207104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'کلینیک پوست و مو آوا',
    clinicAddress: 'تهران، خیابان شریعتی، روبروی مترو قلهک، ساختمان پزشکان ۱۲۰، طبقه ۵',
    fee: 280000,
    phone: '۰۲۱-۲۲۶۶۴۴۳۳',
    bio: 'دکتر نیلوفر بهرامی فارغ‌التحصیل ممتاز تخصص پوست و زیبایی، مجری تکنیک‌های نوین زاویه‌سازی صورت و درمان‌های لیزری اسکار با بهترین دستگاه‌های روز اروپا هستند.',
    medicalCode: 'ن-۶۶۵۵۴',
    satisfactionRate: 95,
    services: [
      'زاویه‌سازی و مدلینگ صورت با فیلرهای معتبر',
      'تزریق بوتاکس پیشانی و خط اخم مصپورت و دیسپورت',
      'درمان اسکار و جوانسازی پوست با لیزر CO2 Fractional'
    ],
    reviews: [
      {
        id: 'rev-7-1',
        userName: 'نازنین رضایی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۰۷',
        comment: 'بسیار خوش‌برخورد و با حوصله هستند. کار فیلر شقیقه و لب را برای من انجام دادند که واقعاً قرینه و طبیعی شده است.',
        treatment: 'تزریق فیلر شقیقه'
      }
    ],
    availableSlots: [
      {
        dayName: 'شنبه',
        dateStr: '۱۵ اردیبهشت',
        dateIso: '2026-05-05',
        slots: ['۱۴:۰۰', '۱۴:۴۵', '۱۵:۳۰', '۱۶:۱۵']
      },
      {
        dayName: 'دوشنبه',
        dateStr: '۱۷ اردیبهشت',
        dateIso: '2026-05-07',
        slots: ['۱۴:۰۰', '۱۴:۴۵', '۱۵:۳۰', '۱۶:۱۵', '۱۷:۰۰']
      }
    ]
  },
  {
    id: 'doc-8',
    name: 'دکتر سامان پناهی',
    specialty: 'قلب و عروق',
    specialtyEn: 'cardiology',
    title: 'فوق تخصص جراحی قلب و عروق و پیوند قلب',
    rating: 4.97,
    experienceYears: 20,
    reviewsCount: 512,
    // Confident mature Caucasian male doctor in lab coat
    imageUrl: 'https://images.pexels.com/photos/6129500/pexels-photo-6129500.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'بیمارستان تخصصی جراحی قلب مهر',
    clinicAddress: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک، بن‌بست شمس، پلاک ۵',
    fee: 320000,
    phone: '۰۲۱-۸۸۲۲۰۲۲۰',
    bio: 'دکتر سامان پناهی از جراحان برجسته و نام‌آشنای قلب کشور با بیش از ۲۰ سال تجربه موفق در انجام عمل‌های جراحی قلب باز، تعویض دریچه و پیوند قلب می‌باشند.',
    medicalCode: 'ن-۱۱۲۲۳',
    satisfactionRate: 99,
    services: [
      'جراحی بای‌پس عروق کرونر (قلب باز)',
      'ترمیم و تعویض دریچه‌های قلب با روش‌های نوین مینی‌مال',
      'مشاوره تخصصی جراحی‌های پیچیده قلبی و عروقی'
    ],
    reviews: [
      {
        id: 'rev-8-1',
        userName: 'حسین احمدی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۸',
        comment: 'پدرم را ایشان جراحی قلب باز کردند. عمکلرد و مهارت عالی ایشان ستودنی است.',
        treatment: 'عمل جراحی قلب باز'
      }
    ],
    availableSlots: [
      {
        dayName: 'یک‌شنبه',
        dateStr: '۱۶ اردیبهشت',
        dateIso: '2026-05-06',
        slots: ['۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰']
      },
      {
        dayName: 'چهارشنبه',
        dateStr: '۱۹ اردیبهشت',
        dateIso: '2026-05-09',
        slots: ['۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰']
      }
    ]
  },
  {
    id: 'doc-9',
    name: 'دکتر شقایق رحیمی',
    specialty: 'زنان و زایمان',
    specialtyEn: 'gynecology',
    title: 'متخصص زنان، زایمان و فوق تخصص سرطان‌های شایع زنان',
    rating: 4.86,
    experienceYears: 13,
    reviewsCount: 215,
    // Replaced Black female doctor with a beautiful, professional, smiling Caucasian female doctor headshot (6749778)
    imageUrl: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'کلینیک تخصصی بانوان یاس',
    clinicAddress: 'تهران، فرمانیه، بلوار اندرزگو، ساختمان پزشکان فرمانیه، طبقه ۳، واحد ۱۰',
    fee: 270000,
    phone: '۰۲۱-۲۲۸۸۹۹۰۰',
    bio: 'دکتر شقایق رحیمی متخصص برجسته در غربالگری و جراحی انکولوژی زنان، مراقبت‌های بارداری‌های پرخطر و پیشگیری از سرطان دهانه رحم با واکسن‌های نوین هستند.',
    medicalCode: 'ن-۳۳۴۴۵',
    satisfactionRate: 96,
    services: [
      'غربالگری و درمان تخصصی بیماری‌های سرطان زنان',
      'تزریق واکسن گارداسیل و مشاوره سلامت جنسی بانوان',
      'جراحی‌های ترمیمی و درمانی سیستم تناسلی زنان'
    ],
    reviews: [
      {
        id: 'rev-9-1',
        userName: 'زهره محسنی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۰۵',
        comment: 'بسیار پزشک دلسوز و متخصصی هستند. اطلاعات علمی ایشان در زمینه پیشگیری بی‌نظیر است.',
        treatment: 'غربالگری و پاپ‌اسمیر'
      }
    ],
    availableSlots: [
      {
        dayName: 'دوشنبه',
        dateStr: '۱۷ اردیبهشت',
        dateIso: '2026-05-07',
        slots: ['۱۶:۰۰', '۱۶:۴۵', '۱۷:۳۰', '۱۸:۱۵']
      },
      {
        dayName: 'سه‌شنبه',
        dateStr: '۱۸ اردیبهشت',
        dateIso: '2026-05-08',
        slots: ['۰۹:۳۰', '۱۰:۱۵', '۱۱:۰۰', '۱۱:۴۵']
      }
    ]
  },
  {
    id: 'doc-10',
    name: 'دکتر بهنام صابری',
    specialty: 'مغز و اعصاب',
    specialtyEn: 'neurology',
    title: 'متخصص بیماری‌های مغز و اعصاب و ستون فقرات',
    rating: 4.89,
    experienceYears: 12,
    reviewsCount: 178,
    // Serious, highly focused Caucasian male doctor with glasses
    imageUrl: 'https://images.pexels.com/photos/4989139/pexels-photo-4989139.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    clinicName: 'ساختمان پزشکان تخصصی پایتخت',
    clinicAddress: 'تهران، میرداماد، جنب ایستگاه مترو، ساختمان پزشکان میرداماد، طبقه ۴',
    fee: 290000,
    phone: '۰۲۱-۲۲۹۹۰۰۱۱',
    bio: 'دکتر بهنام صابری متخصص نورولوژی، متخصص در درمان تشنج، صرع، سکته‌های مغزی، اختلالات خواب، سرگیجه، پارکینسون و دردهای عصبی ستون فقرات می‌باشند.',
    medicalCode: 'ن-۷۷۶۶۵',
    satisfactionRate: 96,
    services: [
      'کنترل و درمان تخصصی صرع و حملات تشنج مغزی',
      'پیشگیری و درمان تکمیلی پس از سکته‌های مغزی',
      'درمان‌های نوین اختلالات خواب و بیخوابی‌های مزمن'
    ],
    reviews: [
      {
        id: 'rev-10-1',
        userName: 'پیمان معادی',
        rating: 5,
        date: '۱۴۰۴/۱۲/۱۱',
        comment: 'برای درمان تشنج‌های شبانه پسرم مراجعه کردیم. با قرص‌های جدیدی که تجویز کردند تشنج‌ها کاملا قطع شده است.',
        treatment: 'درمان حملات صرع'
      }
    ],
    availableSlots: [
      {
        dayName: 'شنبه',
        dateStr: '۱۵ اردیبهشت',
        dateIso: '2026-05-05',
        slots: ['۱۰:۰۰', '۱۰:۴۵', '۱۱:۳۰', '۱۶:۰۰', '۱۶:۴۵']
      },
      {
        dayName: 'چهارشنبه',
        dateStr: '۱۹ اردیبهشت',
        dateIso: '2026-05-09',
        slots: ['۱۰:۰۰', '۱۰:۴۵', '۱۱:۳۰', '۱۶:۰۰']
      }
    ]
  }
];
