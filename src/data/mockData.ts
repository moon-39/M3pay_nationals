import { PartnerStore, TransactionItem, ForeignCitizenService, InvestmentFund, AppNotification } from '../types';

export const INITIAL_RIAL_BALANCE = 248750000; // 248,750,000 Rials (24,875,000 Tomans)
export const INITIAL_USDT_BALANCE = 1420.50; // 1,420.50 USDT
export const USDT_RIAL_RATE = 667000; // 1 USDT = 667,000 Rials (66,700 Tomans)

export const VIRTUAL_CARD_NUMBER = '۶۰۳۷ - ۹۹۱۸ - ۴۳۲۱ - ۷۸۰۹';
export const VIRTUAL_CARD_SHEBA = 'IR0901700000001029384756';

export const PARTNER_STORES: PartnerStore[] = [
  {
    id: 1,
    name: '۱. هایپراستار',
    category: 'supermarket',
    categoryLabel: 'هایپرمارکت و خواربار',
    cashback: '۷٪ کش‌بک آنی',
    discountBadge: '۷٪ بازگشت وجه',
    rating: 4.8,
    branches: 'تهران، البرز، شیراز، اصفهان',
    description: 'هایپرمارکت زنجیره‌ای با بیش از ۲۰,۰۰۰ قلم کالای اساسی، مواد غذایی تازه، میوه و سبزیجات روزانه.',
    paymentMethods: ['خرید حضوری با QR', 'خرید آنلاین', 'بارکدخوان صندوق']
  },
  {
    id: 2,
    name: '۲. دیجی‌کالا',
    category: 'digital',
    categoryLabel: 'کالای دیجیتال و لوازم خانگی',
    cashback: '۵٪ تخفیف آنی',
    discountBadge: '۵٪ تخفیف بدون سقف',
    rating: 4.9,
    branches: 'سراسر کشور (ارسال اکسپرس)',
    description: 'بزرگترین فروشگاه اینترنتی ایران؛ لپ‌تاپ، موبایل، هدفون، ساعت هوشمند و لوازم خانه با گارانتی رسمی.',
    paymentMethods: ['درگاه مستقیم مونس', 'پرداخت با کیف پول', 'تحویل فوری']
  },
  {
    id: 3,
    name: '۳. اسنپ‌فود',
    category: 'restaurant',
    categoryLabel: 'سفارش آنلاین غذا و شیرینی',
    cashback: '۱۰٪ کش‌بک',
    discountBadge: '۱۰٪ کش‌بک نقدی',
    rating: 4.7,
    branches: 'تمام کلان‌شهرها و شهرستان‌های ایران',
    description: 'سامانه سفارش آنلاین غذا از بهترین رستوران‌ها، کافه‌ها، سوپرمارکت‌ها، نانوایی و میوه‌فروشی‌ها.',
    paymentMethods: ['پرداخت درون‌برنامه‌ای', 'کیف پول مونس', 'تخفیف وفاداری']
  },
  {
    id: 4,
    name: '۴. فروشگاه‌های زنجیره‌ای رفاه',
    category: 'supermarket',
    categoryLabel: 'مواد غذایی و شوینده',
    cashback: '۸٪ تخفیف',
    discountBadge: '۸٪ تخفیف فاکتور',
    rating: 4.5,
    branches: 'بیش از ۵۰۰ شعبه فعال در سراسر ایران',
    description: 'عرضه‌کننده اقلام مصرفی خانوار، لبنیات، گوشت و مرغ گرم، پروتئین و مواد شوینده با قیمت مصوب.',
    paymentMethods: ['بارکد صندوق مونس', 'کارتخوان شتابی', 'باشگاه مشتریان']
  },
  {
    id: 5,
    name: '۵. کافه قنادی ناتلی',
    category: 'restaurant',
    categoryLabel: 'کیک و شیرینی تازه',
    cashback: '۱۲٪ کش‌بک',
    discountBadge: '۱۲٪ بازگشت وجه',
    rating: 4.9,
    branches: 'شعب سهروردی، پاسداران، نیاوران، سعادت‌آباد',
    description: 'شیرینی‌های اصیل، کیک‌های نامزدی و تولد سفارشی، باقلوا، دسر مدرن فرانسوی و کافه‌شاپ حضوری.',
    paymentMethods: ['کارتخوان شتابی مونس', 'سفارش تلفنی و آنلاین', 'QR اختصاصی میز']
  },
  {
    id: 6,
    name: '۶. نشر چشمه',
    category: 'culture',
    categoryLabel: 'کتاب، مجلات و هدایای فرهنگی',
    cashback: '۱۵٪ بازگشت وجه',
    discountBadge: '۱۵٪ کش‌بک نقدی',
    rating: 4.9,
    branches: 'کریمخان، مجتمع کورش، ارگ تجریش، رایزن',
    description: 'انتشارات و کتابفروشی برجسته با رمان‌های برگزیده، شعر، فلسفه، نوشت‌افزار لوکس و محصولات صنایع دستی.',
    paymentMethods: ['خرید حضوری با کارت مونس', 'سفارش آنلاین با کد تخفیف', 'باشگاه چشمه']
  },
  {
    id: 7,
    name: '۷. داروخانه مرکزی دکتر جمالی',
    category: 'health',
    categoryLabel: 'مکمل‌های دارویی و بهداشتی',
    cashback: '۶٪ کش‌بک',
    discountBadge: '۶٪ واریز آنی',
    rating: 4.6,
    branches: 'تهران، میدان ونک، خیابان ولیعصر',
    description: 'تامین نسخ تخصصی، مکمل‌های تقویتی و بدنسازی وارداتی، محصولات ارگانیک پوست و مو و تجهیزات ارتوپدی.',
    paymentMethods: ['ثبت نسخه آنلاین', 'کارت مونس', 'پرداخت با شناسه']
  },
  {
    id: 8,
    name: '۸. رستوران نایب',
    category: 'restaurant',
    categoryLabel: 'رستوران ایرانی و چلوکباب اصیل',
    cashback: '۱۰٪ تخفیف',
    discountBadge: '۱۰٪ تخفیف کل فاکتور',
    rating: 4.9,
    branches: 'شعب وزرا، سعادت‌آباد، آبان، زعفرانیه',
    description: 'مبدع چلوکباب زعفرانی در ایران، محیطی فاخر و میزبانی خاطره‌انگیز با برنج ۱۰۰٪ ایرانی و گوشت تازه گوسفندی.',
    paymentMethods: ['پرداخت پای میز با QR', 'رزرو تشریفات آنلاین', 'کارت وفاداری مونس']
  },
  {
    id: 9,
    name: '۹. فروشگاه زنجیره‌ای سفیر',
    category: 'fashion',
    categoryLabel: 'عطر، ادکلن و مراقبت پوست',
    cashback: '۹٪ بازگشت وجه',
    discountBadge: '۹٪ کش‌بک آنی',
    rating: 4.8,
    branches: 'پالادیوم، ارگ تجریش، سام سنتر، اپال',
    description: 'نماینده رسمی معتبرترین برندهای عطر نیش، مراقبت و سلامت پوست، آرایشی اصل فرانسه و ایتالیا.',
    paymentMethods: ['فروشگاه آنلاین', 'خرید حضوری شعب', 'ارسال رایگان']
  },
  {
    id: 10,
    name: '۱۰. چرم مشهد',
    category: 'fashion',
    categoryLabel: 'پوشاک و مصنوعات چرم طبیعی',
    cashback: '۱۴٪ بازگشت وجه',
    discountBadge: '۱۴٪ بازگشت به کیف پول',
    rating: 4.9,
    branches: 'بیش از ۶۰ شعبه رسمی در سراسر استان‌های کشور',
    description: 'طراحی فاخر پالتو، کاپشن، کیف اداری و مجلسی، کفش طبی و اکسسوری تولیدشده از مرغوب‌ترین چرم طبیعی.',
    paymentMethods: ['بیش از ۶۰ شعبه رسمی', 'فروشگاه آنلاین کشوری', 'اقساط بدون کارمزد مونس']
  }
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-101',
    title: 'فروشگاه زنجیره‌ای رفاه',
    category: 'store',
    categoryLabel: 'خرید فروشگاهی',
    type: 'outflow',
    amount: 3450000,
    date: 'امروز | سه‌شنبه ۲۴ آبان',
    time: '۱۸:۴۵',
    status: 'successful',
    statusLabel: 'تراکنش موفق شاپرک',
    trackingCode: 'RSH-89472619',
    cashbackEarned: 276000,
    counterparty: 'هایپرمارکت رفاه - شعبه آزادی',
    cardOrAccount: '۶۰۳۷۹۹۱۸۴۳۲۱۷۸۰۹',
    note: 'خرید هفتگی اقلام خوراکی و بهداشتی'
  },
  {
    id: 'tx-102',
    title: 'انتقال به علی کاظمی',
    category: 'transfer',
    categoryLabel: 'انتقال مونس به مونس',
    type: 'outflow',
    amount: 5000000,
    date: 'امروز | سه‌شنبه ۲۴ آبان',
    time: '۱۵:۲۰',
    status: 'successful',
    statusLabel: 'برداشت وجه (۰٪ کارمزد)',
    trackingCode: 'MNS-55210982',
    counterparty: 'علی کاظمی (ali_k@)',
    cardOrAccount: 'کیف پول داخلی مونس',
    note: 'تسویه دنگ خرید گروهی'
  },
  {
    id: 'tx-103',
    title: 'اسنپ‌فود (سفارش غذا)',
    category: 'store',
    categoryLabel: 'سفارش اینترنتی',
    type: 'outflow',
    amount: 1280000,
    date: 'امروز | سه‌شنبه ۲۴ آبان',
    time: '۱۳:۱۰',
    status: 'successful',
    statusLabel: 'تراکنش موفق',
    trackingCode: 'SNF-39012478',
    cashbackEarned: 128000,
    counterparty: 'رستوران ایتالیایی ژیویر',
    note: 'سفارش پیتزا و نوشیدنی'
  },
  {
    id: 'tx-104',
    title: 'واریز دنگ از احمد امینی',
    category: 'transfer',
    categoryLabel: 'واریز فوری کیف پول',
    type: 'inflow',
    amount: 8000000,
    date: 'دیروز | دوشنبه ۲۳ آبان',
    time: '۱۴:۱۲',
    status: 'successful',
    statusLabel: 'واریز فوری',
    trackingCode: 'MNS-11094832',
    counterparty: 'احمد امینی (ahmad_am@)',
    cardOrAccount: 'کیف پول مونس',
    note: 'واریز سهم سفر شمال'
  },
  {
    id: 'tx-105',
    title: 'خرید از دیجی‌کالا',
    category: 'store',
    categoryLabel: 'خرید آنلاین',
    type: 'outflow',
    amount: 14200000,
    date: 'دیروز | دوشنبه ۲۳ آبان',
    time: '۲۱:۱۵',
    status: 'successful',
    statusLabel: 'تراکنش نهایی موفق',
    trackingCode: 'DKP-90238124',
    cashbackEarned: 710000,
    counterparty: 'دیجی‌کالا اینترنتی',
    note: 'خرید هدفون انکر و گلس گوشی'
  },
  {
    id: 'tx-106',
    title: 'پرداخت قبض برق و گاز',
    category: 'bill',
    categoryLabel: 'قبوض خدماتی',
    type: 'outflow',
    amount: 1850000,
    date: 'دیروز | دوشنبه ۲۳ آبان',
    time: '۱۲:۰۵',
    status: 'successful',
    statusLabel: 'تسویه شده با کد رهگیری',
    trackingCode: 'BIL-67890214',
    counterparty: 'شرکت توزیع نیروی برق تهران بزرگ',
    note: 'شناسه قبض: ۹۸۱۲۳۰۹۸ | شناسه پرداخت: ۷۷۴۲'
  }
];

export const FOREIGN_CITIZEN_SERVICES: ForeignCitizenService[] = [
  {
    id: 'fc-1',
    title: 'احراز هویت اختصاصی اتباع',
    badge: 'کد فراگیر / آمایش',
    badgeType: 'emerald',
    description: 'استعلام و ثبت سریع مدارک هویتی و اقامتی معتبر در سامانه یکپارچه مونس',
    iconName: 'IdCard',
    details: [
      'پشتیبانی از انواع کارت آمایش معتبر (آمایش ۱۵ تا ۱۸)',
      'استعلام آنی کد اختصاصی فراگیر ۱۰ رقمی از وزارت کشور',
      'تایید آنلاین پاسپورت‌های دارای روادید معتبر یا اقامت رسمی',
      'فعال‌سازی سطح دسترسی کامل بانکی پس از تطابق چهره و تصویر مدرک'
    ],
    documentsRequired: ['اصل یا تصویر شفاف کارت آمایش یا پاسپورت', 'کد فراگیر اختصاصی', 'شماره تلفن همراه به نام متقاضی']
  },
  {
    id: 'fc-2',
    title: 'افتتاح حساب بانکی رسمی',
    badge: 'سپرده قانونی شتاب',
    badgeType: 'blue',
    description: 'دریافت شماره شبا، کارت بانکی عضو شتاب و سود سپرده روزشمار قانونی',
    iconName: 'Landmark',
    details: [
      'صدور کارت شتابی با سقف تراکنش روزانه مطابق مصوبات بانک مرکزی',
      'تخصیص شناسه شبا (IBAN) اختصاصی متصل به حساب سپرده قرض‌الحسنه',
      'امکان فعال‌سازی رمز دوم پویا (پیامکی) و نرم‌افزار رمزساز مونس',
      'دسترسی نامحدود به شبکه انتقال پایا و ساتنا بین تمامی بانک‌ها'
    ],
    documentsRequired: ['گواهی معتبر اقامت قانونی', 'تاییدیه کد پستی محل سکونت', 'احراز هویت بیومتریک در اپلیکیشن']
  },
  {
    id: 'fc-3',
    title: 'خدمات ارتباطی و سیم‌کارت رسمی',
    badge: 'همراه اول، ایرانسل و رایتل',
    badgeType: 'amber',
    description: 'خرید و فعال‌سازی سیم‌کارت‌های رسمی اپراتورها با مدارک اقامتی اتباع',
    iconName: 'Smartphone',
    details: [
      'ثبت‌نام رسمی سیم‌کارت دائمی و اعتباری بر اساس کد فراگیر',
      'بسته‌های اینترنت پرسرعت ویژه اتباع با تخفیف ۵۰ درصدی',
      'انتقال شارژ بین‌المللی به افغانستان، عراق و ترکیه در چند ثانیه',
      'پشتیبانی ۲۴ ساعته اختصاصی به زبان‌های فارسی، پشتو و عربی'
    ],
    documentsRequired: ['کد فراگیر معتبر', 'حضور حضوری یا احراز ویدیویی']
  },
  {
    id: 'fc-4',
    title: 'خدمات درمانی و بهداشتی',
    badge: 'بیمه سلامت و مراکز منتخب',
    badgeType: 'rose',
    description: 'لیست مراکز درمانی، بیمارستان‌ها و درمانگاه‌های منتخب با پوشش بیمه سلامت',
    iconName: 'Cross',
    details: [
      'ثبت‌نام و تمدید آنلاین دفترچه بیمه سلامت مهاجرین و پناهندگان',
      'دریافت نوبت اینترنتی از بیش از ۱۲۰ بیمارستان و کلینیک تخصصی',
      'پوشش بستری، جراحی، زایمان و داروهای بیماری‌های خاص',
      'تخفیف ۳۰ درصدی ویزیت در مراکز درمانی طرف قرارداد مونس'
    ],
    documentsRequired: ['کارت هوشمند اقامتی', 'دفترچه بیمه یا کد بیمه سلامت']
  },
  {
    id: 'fc-5',
    title: 'خدمات آموزشی و تحصیلی',
    badge: 'مدارس و دانشگاه‌ها',
    badgeType: 'indigo',
    description: 'راهنمای ثبت‌نام مدارس، سنجش دانش‌آموزی و پذیرش در دانشگاه‌های معتبر',
    iconName: 'GraduationCap',
    details: [
      'سامانه جامع ثبت‌نام دانش‌آموزان اتباع در مدارس دولتی (سامانه سهاد)',
      'دریافت برگه حمایت تحصیلی برای نوآموزان بدون مدرک اقامتی رسمی',
      'پرداخت آنلاین شهریه مدارس نمونه و خوابگاه‌های دانشگاهی',
      'مشاوره تخصصی بورسیه تحصیلی و آزمون‌های ورودی بین‌الملل'
    ],
    documentsRequired: ['برگه حمایت تحصیلی یا کد آمایش', 'کارنامه سال قبل یا مدرک سنجش']
  }
];



export const INVESTMENT_FUNDS: InvestmentFund[] = [
  {
    id: 'fund-fixed',
    title: 'صندوق درآمد ثابت مونس',
    badge: '۲۹.۲٪ سود سالانه',
    badgeColor: 'bg-blue-100 text-blue-800',
    yieldRate: '۲۹.۲٪',
    backing: 'اوراق مشارکت دولتی و سپرده بانکی با ضمانت نقدشوندگی',
    description: 'سود روزشمار با واریز ماهانه در روز اول هر ماه، بدون جریمه برداشت زودتر از موعد و معاف از مالیات.',
    minDeposit: 'از ۱۰۰,۰۰۰ ریال',
    buttonLabel: 'صدور واحد',
    buttonColor: 'bg-blue-600 hover:bg-blue-500 text-white'
  },
  {
    id: 'fund-gold',
    title: 'صندوق سرمایه‌گذاری طلا',
    badge: 'پشتوانه شمش ۲۴ عیار',
    badgeColor: 'bg-amber-200 text-amber-900',
    yieldRate: 'رشد همگام با انس جهانی و دلار',
    backing: 'شمش طلای خزانه بانک کارگشایی و سکه امامی',
    description: 'سرمایه‌گذاری در شمش و سکه استاندارد بورسی، خرید خرد از ۱۰,۰۰۰ تومان بدون ریسک سرقت فیزیکی.',
    minDeposit: 'از ۱۰۰,۰۰۰ ریال',
    buttonLabel: 'خرید طلا',
    buttonColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950'
  },
  {
    id: 'fund-silver',
    title: 'صندوق سرمایه‌گذاری نقره',
    badge: 'شمش ۹۹۹ استاندارد',
    badgeColor: 'bg-slate-200 text-slate-800',
    yieldRate: 'بازدهی صنعتی و ارزی',
    backing: 'گواهی سپرده شمش نقره خلوص ۹۹۹ بورس کالا',
    description: 'سپر ضد تورم با نقدشوندگی فوق‌العاده سریع و امکان فروش ۲۴ ساعته در سامانه مونس.',
    minDeposit: 'از ۱۰۰,۰۰۰ ریال',
    buttonLabel: 'خرید نقره',
    buttonColor: 'bg-slate-800 hover:bg-slate-700 text-white'
  }
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'واریز پاداش خرید (کش‌بک)',
    message: 'مبلغ ۲۴۱,۵۰۰ ریال کش‌بک خرید هایپراستار به موجودی شما افزوده شد.',
    time: '۲ ساعت پیش',
    isRead: false,
    type: 'reward'
  },
  {
    id: 'notif-2',
    title: 'ورود موفق به حساب کاربری',
    message: 'ورود جدید از دستگاه Chrome Linux با IP معتبر ثبت گردید.',
    time: '۵ ساعت پیش',
    isRead: false,
    type: 'security'
  },
  {
    id: 'notif-3',
    title: 'بروزرسانی نرخ تتر (USDT)',
    message: 'نرخ تسویه ریالی تتر در جیب ارزی به ۶۶۷,۰۰۰ ریال بروزرسانی شد.',
    time: 'دیروز',
    isRead: true,
    type: 'system'
  }
];
