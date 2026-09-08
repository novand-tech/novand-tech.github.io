export interface SolutionDetail extends Solution { corePillars?: any[]; typicalComponents?: any[]; keyChallengesSolved?: any[]; }
export interface Solution {
  slug: string;
  heroImage?: string;
  title: string;
  summary: string;
  description: string;
  targetAudience: string;
  challenges: string[];
  approach: string[];
  technologies: string[];
}

export const solutionsDataFa: Solution[] = [
  {
    slug: "residential",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    title: "مجتمع‌های مسکونی و خانه‌های شخصی",
    summary: "زیرساخت‌های یکپارچه اتوماسیون، شبکه‌های وای‌فای بدون نقطه کور، و سیستم‌های امنیتی پنهان برای خانه‌های مدرن.",
    description: "خانه‌های مدرن نیازمند زیرساختی بیش از یک روتر ساده اینترنت هستند. راهکارهای مسکونی ما بر پایه پنهان‌سازی فناوری در عین دسترسی پایدار به آن بنا شده است. ما شبکه‌های وای‌فای در سطح سازمانی (Enterprise) با پایداری صددرصد طراحی می‌کنیم، سیستم‌های روشنایی و تهویه هوشمند را پیاده‌سازی کرده و زیرساخت‌های نظارتی و دوربین مداربسته ظریف و مقاوم نصب می‌کنیم که بدون آسیب به معماری داخلی، بالاترین سطح امنیت را فراهم می‌کنند.",
    targetAudience: "سازندگان املاک لوکس، صاحبان خانه‌ها و شرکت‌های مدیریت ساختمان",
    challenges: [
      "پوشش ضعیف شبکه‌های بی‌سیم (Dead Zones) و کندی اینترنت در طبقات مختلف",
      "سیستم‌های اتوماسیون جزیره‌ای که با یکدیگر ارتباط برقرار نمی‌کنند (جزایر فناوری)",
      "تجهیزات زمخت که زیبایی و طراحی داخلی ساختمان را به هم می‌زنند"
    ],
    approach: [
      "کابل‌کشی فیبر نوری پنهان و استقرار اکسس‌پوینت‌های سقفی مخفی برای پوشش سراسری شبکه",
      "پیاده‌سازی یک هاب کنترل مرکزی و یکپارچه برای مدیریت سیستم‌های سرمایش/گرمایش، روشنایی و رسانه",
      "نصب دوربین‌های مداربسته کم‌مشخصه با قابلیت دید در شب پیشرفته و ذخیره‌سازی ابری/محلی امن"
    ],
    technologies: ["Wi-Fi 6 مِش", "روشنایی بر بستر شبکه (PoE)", "یکپارچه‌سازی هوشمند تهویه (HVAC)", "تجهیزات صوتی‌تصویری مخفی", "فیبر نوری تا اتاق (FTTR)"],
    corePillars: ["امنیت", "کارایی", "مقیاس‌پذیری"],
    typicalComponents: ["سخت‌افزار", "نرم‌افزار", "پشتیبانی"],
    keyChallengesSolved: ["قطعی‌ها", "هزینه‌ها", "پیچیدگی‌ها"]
  },
  {
    slug: "business",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    title: "محیط‌های کاری و اداری شرکتی",
    summary: "شبکه‌های با پایداری بالا، ارتباطات صوتی مبتنی بر VoIP، و زیرساخت‌های امنیتی برای عملیات‌های تجاری بی‌وقفه.",
    description: "زمان قطعی شبکه مستقیماً به معنای از دست دادن درآمد است. راهکارهای شرکتی ما بر پایه‌گذاری زیرساخت‌های شبکه ایمن و ایزوله‌شده تمرکز دارد تا ترافیک مهمانان، ترافیک سرورها و سیستم‌های تلفنی را از هم مجزا سازد. ما اتاق‌های کنفرانس را با سیستم‌های صوتی‌تصویری بدون دردسر تجهیز می‌کنیم، سرورهای داخلی پایدار برای فایل‌ها نصب کرده و اطمینان می‌دهیم که امنیت سایبری و کنترل تردد فیزیکی کاملاً هماهنگ و یکپارچه عمل کنند.",
    targetAudience: "شرکت‌های تجاری کوچک تا متوسط، دفاتر حقوقی، سازمان‌های مالی و آژانس‌های خلاق",
    challenges: [
      "کند شدن شبکه در زمان‌های پیک مصرف یا جلسات مهم ویدئویی",
      "مدیریت پراکنده و ناامن کابل‌ها و اتاق‌های سرور به‌هم‌ریخته (Spaghetti Cabling)",
      "هزینه‌های بالا و مدیریت پیچیده سیستم‌های تلفنی سنتی آنالوگ"
    ],
    approach: [
      "بازطراحی معماری شبکه با کابل‌کشی ساخت‌یافته و سوئیچینگ سازمانی",
      "مهاجرت از تلفن‌های قدیمی به سیستم‌های VoIP تحت شبکه با امکانات پاسخگویی هوشمند",
      "پیاده‌سازی سیستم‌های کنترل تردد با کارت‌خوان یا بیومتریک برای تامین امنیت دفاتر"
    ],
    technologies: ["بخش‌بندی شبکه (VLAN)", "خطوط تلفن سازمانی (SIP Trunk)", "فایروال‌های سازمانی", "کنترل تردد", "کابل‌کشی ساخت‌یافته"],
    corePillars: ["امنیت", "کارایی", "مقیاس‌پذیری"],
    typicalComponents: ["سخت‌افزار", "نرم‌افزار", "پشتیبانی"],
    keyChallengesSolved: ["قطعی‌ها", "هزینه‌ها", "پیچیدگی‌ها"]
  },
  {
    slug: "education",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    title: "آموزشگاه‌ها و پردیس‌های دانشگاهی",
    summary: "زیرساخت‌های مقیاس‌پذیر اینترنت اشیا (IoT)، اتوماسیون کلاس‌های درس و سیستم‌های پیجینگ برای محیط‌های یادگیری.",
    description: "محیط‌های آموزشی به ارتباطات پایدار برای یادگیری دیجیتال و سیستم‌های هماهنگ برای حفظ امنیت فیزیکی نیازمندند. ما شبکه‌های وای‌فای با ظرفیت بالا و فیلترینگ محتوای مناسب دانش‌آموزان پیاده‌سازی می‌کنیم. کلاس‌ها به سیستم‌های صوتی‌تصویری تعاملی مجهز می‌شوند و مدیریت مدرسه با در اختیار داشتن سیستم‌های پیجینگ اضطراری یکپارچه با زنگ‌ها و اعلان‌ها، کنترل کامل محیط را در دست خواهد داشت.",
    targetAudience: "مدارس خصوصی، پردیس‌های دانشگاهی، و مراکز آموزش فنی و حرفه‌ای",
    challenges: [
      "نیاز به مدیریت صدها یا هزاران دستگاه موبایل متصل همزمان به شبکه",
      "ارتباطات اورژانسی پراکنده و سیستم‌های پیجینگ قدیمی با کیفیت صدای نامناسب",
      "مصرف بالای انرژی و روشن ماندن تجهیزات پس از ساعات آموزشی"
    ],
    approach: [
      "استقرار کنترلرهای بی‌سیم با ظرفیت بالا برای مدیریت اتصال همزمان صدها کاربر",
      "نصب سیستم‌های پیجینگ و پخش اعلان مبتنی بر شبکه (IP Audio) به تفکیک مناطق و زون‌ها",
      "اجرای اتوماسیون هوشمند روشنایی و تهویه برای صرفه‌جویی محسوس در هزینه‌های انرژی"
    ],
    technologies: ["وای‌فای با تراکم بالا", "سیستم‌های پیجینگ تحت شبکه (IP)", "نمایشگرهای تعاملی", "مدیریت هوشمند انرژی", "فیلترینگ محتوا"],
    corePillars: ["امنیت", "کارایی", "مقیاس‌پذیری"],
    typicalComponents: ["سخت‌افزار", "نرم‌افزار", "پشتیبانی"],
    keyChallengesSolved: ["قطعی‌ها", "هزینه‌ها", "پیچیدگی‌ها"]
  },
  {
    slug: "healthcare-hospitality",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    title: "مراکز درمانی و مهمان‌نوازی (هتل‌ها)",
    summary: "ایجاد شبکه‌های ایمن برای مدیریت داده‌های بیماران/مهمانان، شبکه‌های تلویزیونی (LAN-TV) و سیستم‌های ارتباطی پایدار.",
    description: "مراکز درمانی و هتل‌ها به دلیل خدمات‌رسانی شبانه‌روزی، نیازمند بالاترین سطح پایداری و امنیت هستند. ما در هتل‌ها و بیمارستان‌ها شبکه‌های ایزوله برای اطمینان از حفظ حریم خصوصی بیماران یا مهمانان پیاده‌سازی می‌کنیم. خدمات ما شامل استقرار سیستم‌های تلویزیون تحت شبکه (IPTV) در اتاق‌ها، سیستم‌های فراخوان پرستار/مهماندار، و زیرساخت‌های یکپارچه کنترل دمای اتاق‌هاست که همگی به سرورهای پایداری متصل‌اند که هیچ‌گاه متوقف نمی‌شوند.",
    targetAudience: "کلینیک‌ها، هتل‌های بوتیک، مراکز درمانی سرپایی و مجتمع‌های اقامتی",
    challenges: [
      "الزامات قانونی سخت‌گیرانه برای حفظ حریم خصوصی داده‌های بیماران",
      "نارضایتی مهمانان از قطعی‌های اینترنت یا سیستم‌های پیچیده درون اتاق",
      "نیاز حیاتی به سیستم‌های پشتیبان (Failover) در صورت قطعی برق یا شبکه"
    ],
    approach: [
      "پیاده‌سازی شبکه‌های ایمن و دارای افزونگی (Redundancy) با قابلیت Failover خودکار",
      "استقرار سرورهای LAN-TV و پخش رسانه محلی جهت ارائه سرگرمی در اتاق‌ها",
      "تجهیز تمامی تجهیزات شبکه و سرورهای حیاتی به سیستم‌های پیشرفته برق اضطراری (UPS)"
    ],
    technologies: ["شبکه‌های منطبق با استاندارد", "تلویزیون تعاملی (IPTV / LAN-TV)", "پورتال کاربری وای‌فای", "زیرساخت‌های برق اضطراری UPS", "یکپارچه‌سازی سیستم احضار پرستار"],
    corePillars: ["امنیت", "کارایی", "مقیاس‌پذیری"],
    typicalComponents: ["سخت‌افزار", "نرم‌افزار", "پشتیبانی"],
    keyChallengesSolved: ["قطعی‌ها", "هزینه‌ها", "پیچیدگی‌ها"]
  },
  {
    slug: "specialized-facilities",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    title: "تأسیسات خاص، صنعتی و انبارها",
    summary: "شبکه‌های صنعتی مقاوم، نظارت گسترده و اتوماسیون محیطی برای گلخانه‌ها و انبارهای بزرگ.",
    description: "محیط‌های صنعتی دارای چالش‌های منحصر‌به‌فردی مانند تداخل الکترومغناطیسی شدید، مساحت‌های بسیار وسیع و شرایط دمایی سخت هستند. ما شبکه‌های فیبر نوری را در کف کارخانه‌ها طراحی کرده، سیستم‌های نظارتی دیده‌بانی و پلاک‌خوان راه‌اندازی می‌کنیم، و سنسورهای پایش محیطی (Environmental Monitoring) را برای حفظ شرایط بهینه در انبارها و گلخانه‌های هوشمند به کار می‌گیریم.",
    targetAudience: "مراکز لجستیک، کارخانه‌های تولیدی، گلخانه‌های صنعتی تجاری و انبارها",
    challenges: [
      "پوشش شبکه‌های بی‌سیم در فضاهایی با موانع فلزی، قفسه‌های بلند و تداخلات صنعتی",
      "جلوگیری از سرقت تجهیزات، ردیابی کالاها و مدیریت دسترسی پرسنل به بخش‌های مختلف",
      "نیاز به کنترل دقیق و پایش لحظه‌ای دما، رطوبت و کیفیت هوا"
    ],
    approach: [
      "کابل‌کشی فیبر نوری زمخت (Rugged) و نصب آنتن‌های شبکه‌های بی‌سیم جهت‌دار برای پوشش کامل راهروها",
      "طراحی و نصب دوربین‌های مداربسته پیشرفته با سیستم‌های تشخیص حرکت و عبور از خطوط فرضی (Line Crossing)",
      "نصب کنترلرهای صنعتی اینترنت اشیا (Industrial IoT) جهت پایش لحظه‌ای و ارسال هشدارهای تغییرات محیطی"
    ],
    technologies: ["اینترنت اشیای صنعتی (IIoT)", "کابل‌های فیبر نوری مقاوم (Armored)", "شبکه‌های بی‌سیم متمرکز جهت‌دار", "دوربین‌های مداربسته حرارتی", "کنترل خودکار شرایط محیطی"],
    corePillars: ["امنیت", "کارایی", "مقیاس‌پذیری"],
    typicalComponents: ["سخت‌افزار", "نرم‌افزار", "پشتیبانی"],
    keyChallengesSolved: ["قطعی‌ها", "هزینه‌ها", "پیچیدگی‌ها"]
  }
];

export const solutionsDataEn: Solution[] = [
  {
    slug: "residential",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    title: "Residential Complexes & Private Homes",
    summary: "Integrated automation infrastructure, blind-spot-free Wi-Fi, and invisible security systems for modern homes.",
    description: "Modern homes require infrastructure beyond a simple internet router. Our residential solutions are built on concealing technology while providing stable access to it. We design enterprise-grade Wi-Fi networks with 100% stability, implement smart lighting and HVAC, and install discreet, durable surveillance infrastructure that provides top-tier security without compromising interior aesthetics.",
    targetAudience: "Luxury Real Estate Developers, Homeowners, and Property Management Firms",
    challenges: [
      "Poor wireless coverage (Dead Zones) and slow internet across different floors",
      "Isolated automation systems that fail to communicate with each other (Tech Islands)",
      "Bulky equipment that disrupts the aesthetic and interior design of the building"
    ],
    approach: [
      "Concealed fiber optic cabling and discreet ceiling access points for comprehensive network coverage",
      "Implementation of a unified central control hub for HVAC, lighting, and media management",
      "Installation of low-profile CCTV cameras with advanced night vision and secure local/cloud storage"
    ],
    technologies: ["Wi-Fi 6 Mesh", "PoE Lighting", "Smart HVAC Integration", "Invisible AV", "Fiber to the Room (FTTR)"],
    corePillars: ["Security", "Efficiency", "Scale"],
    typicalComponents: ["Hardware", "Software", "Support"],
    keyChallengesSolved: ["Downtime", "Costs", "Complexity"]
  },
  {
    slug: "business",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    title: "Corporate & Office Environments",
    summary: "High-availability networks, VoIP-based voice communications, and security infrastructure for uninterrupted business operations.",
    description: "Network downtime translates directly to lost revenue. Our corporate solutions focus on establishing secure, isolated network infrastructures to separate guest traffic, server traffic, and telephony systems. We equip conference rooms with frictionless A/V systems, install stable internal file servers, and ensure cybersecurity and physical access control work in perfect harmony.",
    targetAudience: "Small to Medium Businesses (SMBs), Law Firms, Financial Institutions, and Creative Agencies",
    challenges: [
      "Network slowdowns during peak usage or critical video meetings",
      "Disorganized, insecure cabling and messy server rooms (Spaghetti Cabling)",
      "High costs and complex management of traditional analog phone systems"
    ],
    approach: [
      "Network architecture redesign with structured cabling and enterprise switching",
      "Migration from legacy telephony to IP-based VoIP systems with smart attendant capabilities",
      "Implementation of access control systems utilizing card readers or biometrics to secure offices"
    ],
    technologies: ["VLAN Segmentation", "SIP Trunking", "Enterprise Firewalls", "Access Control", "Structured Cabling"],
    corePillars: ["Security", "Efficiency", "Scale"],
    typicalComponents: ["Hardware", "Software", "Support"],
    keyChallengesSolved: ["Downtime", "Costs", "Complexity"]
  },
  {
    slug: "education",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    title: "Schools & University Campuses",
    summary: "Scalable IoT infrastructure, classroom automation, and paging systems for learning environments.",
    description: "Educational environments require stable connectivity for digital learning and coordinated systems for physical security. We deploy high-capacity Wi-Fi networks with student-appropriate content filtering. Classrooms are equipped with interactive A/V systems, and school administration gains full environmental control through integrated emergency paging systems linked with bells and notifications.",
    targetAudience: "Private Schools, University Campuses, and Vocational Training Centers",
    challenges: [
      "The need to manage hundreds or thousands of mobile devices connected simultaneously",
      "Fragmented emergency communications and legacy paging systems with poor audio quality",
      "High energy consumption and equipment left running after instructional hours"
    ],
    approach: [
      "Deployment of high-capacity wireless controllers to manage hundreds of simultaneous users",
      "Installation of IP-based audio and paging systems segmented by zones",
      "Execution of smart lighting and HVAC automation to significantly reduce energy costs"
    ],
    technologies: ["High-Density Wi-Fi", "IP Paging Systems", "Interactive Displays", "Automated Energy Management", "Content Filtering"],
    corePillars: ["Security", "Efficiency", "Scale"],
    typicalComponents: ["Hardware", "Software", "Support"],
    keyChallengesSolved: ["Downtime", "Costs", "Complexity"]
  },
  {
    slug: "healthcare-hospitality",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    title: "Healthcare & Hospitality (Hotels)",
    summary: "Creating secure networks for patient/guest data management, LAN-TV, and stable communication systems.",
    description: "Due to round-the-clock operations, healthcare facilities and hotels require the highest level of stability and security. We implement isolated networks in hotels and hospitals to ensure guest and patient privacy is maintained. Our services include the deployment of in-room IPTV systems, nurse/attendant call systems, and integrated room climate control infrastructure, all connected to highly available servers.",
    targetAudience: "Clinics, Boutique Hotels, Outpatient Facilities, and Accommodation Complexes",
    challenges: [
      "Strict regulatory requirements for maintaining patient data privacy",
      "Guest dissatisfaction due to internet outages or complex in-room systems",
      "Critical need for failover systems in the event of power or network loss"
    ],
    approach: [
      "Implementation of secure, redundant networks with automatic failover capabilities",
      "Deployment of LAN-TV and local media servers to provide in-room entertainment",
      "Equipping all critical network and server hardware with advanced UPS systems"
    ],
    technologies: ["HIPAA Compliant Networking", "LAN-TV/IPTV", "Guest Portal Wi-Fi", "Critical UPS Infrastructure", "Nurse Call Integration"],
    corePillars: ["Security", "Efficiency", "Scale"],
    typicalComponents: ["Hardware", "Software", "Support"],
    keyChallengesSolved: ["Downtime", "Costs", "Complexity"]
  },
  {
    slug: "specialized-facilities",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    title: "Specialized Facilities, Industrial & Warehouses",
    summary: "Rugged industrial networks, extensive surveillance, and environmental automation for greenhouses and large warehouses.",
    description: "Industrial environments present unique challenges such as severe electromagnetic interference, massive square footage, and harsh temperature conditions. We design fiber optic networks for factory floors, deploy specialized surveillance and LPR (License Plate Recognition) systems, and utilize Environmental Monitoring sensors to maintain optimal conditions in warehouses and smart greenhouses.",
    targetAudience: "Logistics Centers, Manufacturing Plants, Commercial Greenhouses, and Warehouses",
    challenges: [
      "Wireless network coverage in spaces with metal obstacles, high shelving, and industrial interference",
      "Preventing equipment theft, tracking inventory, and managing personnel access to different zones",
      "The need for precise, real-time monitoring of temperature, humidity, and air quality"
    ],
    approach: [
      "Rugged fiber optic cabling and installation of directional Wi-Fi antennas for complete aisle coverage",
      "Design and installation of advanced CCTV cameras with motion detection and line-crossing analytics",
      "Installation of Industrial IoT controllers for real-time monitoring and environmental alert transmission"
    ],
    technologies: ["Industrial IoT", "Rugged Fiber Optics", "Directional RF/Wi-Fi", "Thermal CCTV", "Automated Climate Control"],
    corePillars: ["Security", "Efficiency", "Scale"],
    typicalComponents: ["Hardware", "Software", "Support"],
    keyChallengesSolved: ["Downtime", "Costs", "Complexity"]
  }
];
export const getSolutionsData = (url: string) => url.startsWith('/en') ? solutionsDataEn : solutionsDataFa;
export const solutionsData = solutionsDataFa;
