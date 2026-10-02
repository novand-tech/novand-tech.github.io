/**
 * Novand Official Persian Invoice & Pre-Invoice Data Definition
 * 
 * Defines standard Iranian commercial and technical invoice parameters,
 * company legal identifiers, banking coordinates, and sample BOM rows
 * consistent with Novand's engineering service matrix.
 */

export interface InvoiceParty {
  legalName: string;
  nationalId: string;
  registrationNumber: string;
  economicCode: string;
  postalCode: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  provinceCity: string;
  address: string;
}

export interface InvoiceItem {
  id: number;
  code: string;
  description: string;
  quantity: number | '';
  unit: string;
  unitPrice: number | '';
  discount: number | '';
}

export interface InvoiceData {
  invoiceType: 'proforma' | 'official';
  titleFa: string;
  subtitleFa: string;
  invoiceNumber: string;
  invoiceDate: string;
  validityPeriod: string;
  hasAttachment: boolean;
  currency: 'rial' | 'toman';
  vatRate: number; // 0.10 for 10%
  seller: InvoiceParty;
  buyer: InvoiceParty;
  terms: string[];
  bankInfo: {
    bankName: string;
    accountNumber: string;
    cardNumber: string;
    iban: string;
    beneficiary: string;
  };
  sampleItems: InvoiceItem[];
  emptyItemRowCount: number;
}

export const novandInvoiceData: InvoiceData = {
  invoiceType: 'proforma',
  titleFa: 'پیش‌فاکتور فروش کالا و خدمات',
  subtitleFa: 'راهکارهای جامع فناوری، زیرساخت شبکه و هوشمندسازی مهندسی نُوَند',
  invoiceNumber: 'NV-1403-8821',
  invoiceDate: '۱۴۰۳/۰۸/۱۵',
  validityPeriod: '۷ روز کاری از تاریخ صدور',
  hasAttachment: false,
  currency: 'rial',
  vatRate: 0.10,

  seller: {
    legalName: 'شرکت مهندسی نُوَند (راهکارهای جامع فناوری و زیرساخت)',
    nationalId: '۱۰۱۰۳۸۵۲۹۴۱',
    registrationNumber: '۳۶۵۱۸۰',
    economicCode: '۴۱۱۳۵۸۹۷۱۴۶۵',
    postalCode: '۱۹۹۷۹۷۵۱۶۳',
    phone: '۰۲۱-۲۲۱۴۵۶۷۸',
    mobile: '۰۹۱۲۹۳۲۱۵۵۰ / ۰۹۱۹۶۹۱۸۷۵۸',
    email: 'novand.info@gmail.com',
    website: 'novand-tech.com',
    provinceCity: 'تهران - سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی، بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷'
  },

  buyer: {
    legalName: 'هلدینگ فناوری و توسعه زیرساخت پارس',
    nationalId: '۱۰۳۲۰۱۵۸۷۴۲',
    registrationNumber: '۴۵۲۱۹۰',
    economicCode: '۴۱۱۶۸۷۳۲۱۹۵۴',
    postalCode: '۱۹۹۱۸۳۴۵۲۱',
    phone: '۰۲۱-۸۸۶۵۲۱۰۰',
    mobile: '۰۹۱۲۰۰۰۰۰۰۰',
    email: 'info@pars-holding.ir',
    website: 'pars-holding.ir',
    provinceCity: 'تهران - ونک',
    address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، خیابان خلیل‌زاده، برج فناوری نگین، طبقه ۸، واحد ۳۲'
  },

  terms: [
    '۱. اعتبار پیش‌فاکتور: مدت اعتبار قیمت‌ها و شرایط مندرج در این پیش‌فاکتور حداکثر ۷ روز کاری از تاریخ صدور می‌باشد.',
    '۲. شرایط پرداخت: ۵۰٪ پیش‌پرداخت همزمان با تایید پیش‌فاکتور و آغاز سفارش‌گذاری، ۴۰٪ پس از تحویل اقلام و اتمام عملیات نصب، ۱۰٪ پس از راه‌اندازی نهایی، تست و تاییدیه تحویل (Commissioning).',
    '۳. گارانتی و اصالت: تمامی تجهیزات ارائه‌شده دارای ضمانت اصالت فیزیکی و گارانتی رسمی تعویض شرکتی بوده و خدمات فنی دارای پشتیبانی استاندارد مهندسی نُوَند می‌باشند.',
    '۴. تغییرات فنی: هرگونه تغییر در مشخصات فنی، متراژ کابل‌کشی یا حجم پروژه بر اساس صورت‌جلسه کارگاهی محاسبه و در قالب الحاقیه اعمال خواهد گردید.',
    '۵. تحویل و انبارداری: هزینه حمل و تحویل تجهیزات تا محل پروژه بر عهده مجری/کارفرما طبق قرارداد توافق‌شده است.'
  ],

  bankInfo: {
    bankName: 'بانک ملت - شعبه سعادت‌آباد',
    accountNumber: '۴۸۵۲۱۹۴۰۲۳',
    cardNumber: '۶۱۰۴-۳۳۷۸-۹۰۱۲-۳۴۵۶',
    iban: 'IR680120000000001234567890',
    beneficiary: 'شرکت مهندسی نُوَند'
  },

  sampleItems: [
    {
      id: 1,
      code: 'NET-SW-48P',
      description: 'سوئیچ شبکه مدیریتی سیسکو ۴۸ پورت گیگابیت لایه ۳ با ۴ پورت 10G SFP+',
      quantity: 2,
      unit: 'دستگاه',
      unitPrice: 650000000,
      discount: 20000000
    },
    {
      id: 2,
      code: 'CAB-CAT6A-1',
      description: 'کابل‌کشی ساخت‌یافته تمام مس Cat6A شیلددار لگراند همراه با ترانکینگ استاندارد',
      quantity: 450,
      unit: 'متر',
      unitPrice: 950000,
      discount: 0
    },
    {
      id: 3,
      code: 'RCK-42U-SRV',
      description: 'رک سروری ۴۲ یونیت عمق ۱۰۰ سانتیمتر با سیستم توزیع برق هوشمند (PDU) و فن دیجیتال',
      quantity: 1,
      unit: 'دستگاه',
      unitPrice: 340000000,
      discount: 15000000
    },
    {
      id: 4,
      code: 'CCTV-4K-IP',
      description: 'دوربین مداربسته تحت شبکه ۴K با دید در شب هوشمند، بدنه ضدآب IP67 و هوش مصنوعی تشخیص پلاک',
      quantity: 8,
      unit: 'عدد',
      unitPrice: 85000000,
      discount: 20000000
    },
    {
      id: 5,
      code: 'NVR-32CH-4K',
      description: 'دستگاه ضبط ۳۲ کانال تحت شبکه NVR با پشتیبانی از ۴ هارددیسک و پورت‌های شبکه گیگابیتی مجزا',
      quantity: 1,
      unit: 'دستگاه',
      unitPrice: 210000000,
      discount: 0
    },
    {
      id: 6,
      code: 'FBR-SPL-SRV',
      description: 'خدمات فیوژن اسپلیس فیبر نوری سینگل‌مود با دستگاه تمام اتوماتیک ژاپنی و تست افت OTDR',
      quantity: 24,
      unit: 'تار (کور)',
      unitPrice: 3500000,
      discount: 4000000
    },
    {
      id: 7,
      code: 'SMT-GW-ZIG',
      description: 'درگاه مرکزی و کنترلر خانه هوشمند نُوَند با پشتیبانی پروتکل Zigbee 3.0 / KNX و وای‌فای',
      quantity: 2,
      unit: 'دستگاه',
      unitPrice: 145000000,
      discount: 10000000
    },
    {
      id: 8,
      code: 'UPS-10KVA-ON',
      description: 'دستگاه برق اضطراری یو‌پی‌اس آنلاین ۱۰ کاوا صنعتی سه فاز به تک فاز همراه با کابینت باتری ۴ ساعت',
      quantity: 1,
      unit: 'ست',
      unitPrice: 580000000,
      discount: 30000000
    },
    {
      id: 9,
      code: 'SRV-VMW-DEP',
      description: 'پیکربندی کلاستر مجازی‌سازی VMware vSphere ESXi، راه‌اندازی vCenter و معماری بکاپ Veeam',
      quantity: 1,
      unit: 'پروژه',
      unitPrice: 220000000,
      discount: 0
    },
    {
      id: 10,
      code: 'VOIP-IPBX-60',
      description: 'راه‌اندازی سرور تلفنی IP-PBX ایزابل مبتنی بر پروتکل SIP با ۶۰ کاربر همزمان و صف تماس هوشمند',
      quantity: 1,
      unit: 'پروژه',
      unitPrice: 175000000,
      discount: 15000000
    }
  ],

  emptyItemRowCount: 12
};
