import ExcelJS from 'exceljs';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Novand Persian Invoice Sheet Generator for Excel (.xlsx)
 * 
 * Generates an executive, pristine Persian invoice workbook consistent with
 * Novand's corporate visual identity:
 * - RTL orientation (Right-to-Left sheet view)
 * - Corporate colors (Dark Jet #0F172A, Signal Teal #008F7A, Soft Slate #F8FAFC)
 * - Standard Iranian commercial/tax invoice structure (Seller, Buyer, Items, Financial Totals, Terms, Signatures)
 * - Automatic Excel formulas for multiplication, discounts, VAT 10%, and grand totals
 * - Ready for direct entry in Microsoft Excel / Google Sheets
 * - A4 Portrait print setup with fit-to-1-page width
 */

async function generateInvoiceExcel() {
  const rootDir = process.cwd();
  const templatesDir = path.join(rootDir, 'public', 'templates');
  const downloadsDir = path.join(rootDir, 'public', 'downloads');

  if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir, { recursive: true });
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'شرکت مهندسی نُوَند (Novand)';
  workbook.lastModifiedBy = 'مهندسی نُوَند';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.company = 'Novand Integrated Technology & Infrastructure Solutions';

  // Define corporate styles
  const FONT_FAMILY = 'Vazirmatn';
  const COLOR_JET = '0F172A';
  const COLOR_TEAL = '008F7A';
  const COLOR_TEAL_LIGHT = 'E6F7F5';
  const COLOR_SLATE_BG = 'F8FAFC';
  const COLOR_BORDER = 'CBD5E1';
  const COLOR_TEXT_MUTED = '475569';

  const thinBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: 'FF' + COLOR_BORDER } },
    left: { style: 'thin', color: { argb: 'FF' + COLOR_BORDER } },
    bottom: { style: 'thin', color: { argb: 'FF' + COLOR_BORDER } },
    right: { style: 'thin', color: { argb: 'FF' + COLOR_BORDER } }
  };

  const mediumBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'medium', color: { argb: 'FF' + COLOR_JET } },
    left: { style: 'medium', color: { argb: 'FF' + COLOR_JET } },
    bottom: { style: 'medium', color: { argb: 'FF' + COLOR_JET } },
    right: { style: 'medium', color: { argb: 'FF' + COLOR_JET } }
  };

  // Helper to build a sheet
  function setupSheet(isFilledSample: boolean) {
    const sheetName = isFilledSample ? 'نمونه پرشده (راهنما)' : 'پیش‌فاکتور خام (قالب اصلی)';
    const ws = workbook.addWorksheet(sheetName, {
      views: [{ rightToLeft: true, showGridLines: true }],
      pageSetup: {
        paperSize: 9, // A4
        orientation: 'portrait',
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        horizontalCentered: true,
        margins: {
          left: 0.3,
          right: 0.3,
          top: 0.4,
          bottom: 0.4,
          header: 0.2,
          footer: 0.2
        }
      }
    });

    // Column definitions (A to K) - In RTL, Column A is the rightmost column in Excel!
    ws.columns = [
      { key: 'colA', width: 7 },   // ردیف
      { key: 'colB', width: 14 },  // کد کالا/خدمت
      { key: 'colC', width: 34 },  // شرح کالا یا خدمات
      { key: 'colD', width: 10 },  // تعداد
      { key: 'colE', width: 11 },  // واحد سنجش
      { key: 'colF', width: 18 },  // مبلغ واحد (ریال)
      { key: 'colG', width: 20 },  // مبلغ کل (ریال)
      { key: 'colH', width: 16 },  // تخفیف (ریال)
      { key: 'colI', width: 20 },  // مبلغ پس از تخفیف (ریال)
      { key: 'colJ', width: 18 },  // مالیات و عوارض (۱۰٪)
      { key: 'colK', width: 22 }   // مبلغ نهایی (ریال)
    ];

    // Row 1: Brand Accent Bar
    ws.mergeCells('A1:K1');
    const r1 = ws.getCell('A1');
    r1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_TEAL } };
    ws.getRow(1).height = 5;

    // Row 2 to 4: Header
    ws.getRow(2).height = 24;
    ws.getRow(3).height = 18;
    ws.getRow(4).height = 18;

    // Company branding (Right: A2:C4)
    ws.mergeCells('A2:C2');
    const cLogoTitle = ws.getCell('A2');
    cLogoTitle.value = 'نُـوَنــد | NOVAND';
    cLogoTitle.font = { name: FONT_FAMILY, size: 16, bold: true, color: { argb: 'FF' + COLOR_JET } };
    cLogoTitle.alignment = { horizontal: 'right', vertical: 'middle' };

    ws.mergeCells('A3:C3');
    const cLogoSub = ws.getCell('A3');
    cLogoSub.value = 'راهکارهای جامع فناوری و زیرساخت مهندسی';
    cLogoSub.font = { name: FONT_FAMILY, size: 10, bold: true, color: { argb: 'FF' + COLOR_TEAL } };
    cLogoSub.alignment = { horizontal: 'right', vertical: 'middle' };

    ws.mergeCells('A4:C4');
    const cLogoDesc = ws.getCell('A4');
    cLogoDesc.value = 'شبکه‌های سازمانی · فیبر نوری · مجازی‌سازی · امنیت و هوشمندسازی';
    cLogoDesc.font = { name: FONT_FAMILY, size: 8, color: { argb: 'FF' + COLOR_TEXT_MUTED } };
    cLogoDesc.alignment = { horizontal: 'right', vertical: 'middle' };

    // Center Title (D2:H4)
    ws.mergeCells('D2:H3');
    const cTitle = ws.getCell('D2');
    cTitle.value = 'پـیـش‌فـاکـتـور فـروش کـالا و خـدمـات';
    cTitle.font = { name: FONT_FAMILY, size: 18, bold: true, color: { argb: 'FF' + COLOR_JET } };
    cTitle.alignment = { horizontal: 'center', vertical: 'middle' };

    ws.mergeCells('D4:H4');
    const cSubTitle = ws.getCell('D4');
    cSubTitle.value = '(سامانه رسمی برآورد فنی و مالی مهندسی نُوَند - مبالغ به ریال)';
    cSubTitle.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_TEXT_MUTED } };
    cSubTitle.alignment = { horizontal: 'center', vertical: 'middle' };

    // Left Metadata (I2:K4)
    ws.mergeCells('I2:K2');
    const cInvNum = ws.getCell('I2');
    cInvNum.value = isFilledSample ? 'شماره پیش‌فاکتور: NV-1403-8821' : 'شماره پیش‌فاکتور: NV-1403-_____';
    cInvNum.font = { name: FONT_FAMILY, size: 10, bold: true, color: { argb: 'FF' + COLOR_JET } };
    cInvNum.alignment = { horizontal: 'left', vertical: 'middle' };

    ws.mergeCells('I3:K3');
    const cInvDate = ws.getCell('I3');
    cInvDate.value = isFilledSample ? 'تاریخ صدور: ۱۴۰۳/۰۸/۱۵' : 'تاریخ صدور: ۱۴۰۳/____/____';
    cInvDate.font = { name: FONT_FAMILY, size: 10, color: { argb: 'FF' + COLOR_JET } };
    cInvDate.alignment = { horizontal: 'left', vertical: 'middle' };

    ws.mergeCells('I4:K4');
    const cInvValidity = ws.getCell('I4');
    cInvValidity.value = 'مدت اعتبار: ۷ روز کاری از تاریخ صدور';
    cInvValidity.font = { name: FONT_FAMILY, size: 9, bold: true, color: { argb: 'FF' + COLOR_TEAL } };
    cInvValidity.alignment = { horizontal: 'left', vertical: 'middle' };

    // Row 5: Spacer
    ws.getRow(5).height = 8;

    // Row 6: Section Header for Parties
    ws.mergeCells('A6:F6');
    const cSellerHead = ws.getCell('A6');
    cSellerHead.value = 'مشخصات فروشنده (مجری)';
    cSellerHead.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_JET } };
    cSellerHead.font = { name: FONT_FAMILY, size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cSellerHead.alignment = { horizontal: 'center', vertical: 'middle' };

    ws.mergeCells('G6:K6');
    const cBuyerHead = ws.getCell('G6');
    cBuyerHead.value = 'مشخصات خریدار (کارفرما)';
    cBuyerHead.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_JET } };
    cBuyerHead.font = { name: FONT_FAMILY, size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cBuyerHead.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(6).height = 22;

    // Seller Box (Rows 7 to 10, Cols A-F)
    ws.mergeCells('A7:F7');
    const cS1 = ws.getCell('A7');
    cS1.value = 'نام حقوقی: شرکت مهندسی نُوَند (راهکارهای جامع فناوری و زیرساخت)';
    cS1.font = { name: FONT_FAMILY, size: 9.5, bold: true, color: { argb: 'FF' + COLOR_JET } };

    ws.mergeCells('A8:F8');
    const cS2 = ws.getCell('A8');
    cS2.value = 'شناسه ملی: ۱۰۱۰۳۸۵۲۹۴۱  |  شماره ثبت: ۳۶۵۱۸۰  |  کد اقتصادی: ۴۱۱۳۵۸۹۷۱۴۶۵';
    cS2.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_TEXT_MUTED } };

    ws.mergeCells('A9:F9');
    const cS3 = ws.getCell('A9');
    cS3.value = 'نشانی: تهران، سعادت‌آباد، بلوار مدیریت، خ علامه طباطبایی جنوبی، خ ۲۴ غربی، پلاک ۲۶، واحد ۱۷';
    cS3.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_JET } };

    ws.mergeCells('A10:F10');
    const cS4 = ws.getCell('A10');
    cS4.value = 'تلفن: ۰۹۱۲۹۳۲۱۵۵۰ - ۰۹۱۹۶۹۱۸۷۵۸  |  ایمیل: novand.info@gmail.com  |  وب: novand-tech.com';
    cS4.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_TEAL } };

    // Buyer Box (Rows 7 to 10, Cols G-K)
    ws.mergeCells('G7:K7');
    const cB1 = ws.getCell('G7');
    cB1.value = isFilledSample ? 'نام کارفرما / شرکت: هلدینگ فناوری و سرمایه‌گذاری پارس' : 'نام کارفرما / شخص حقیقی یا حقوقی: ....................................................';
    cB1.font = { name: FONT_FAMILY, size: 9.5, bold: true, color: { argb: 'FF' + COLOR_JET } };

    ws.mergeCells('G8:K8');
    const cB2 = ws.getCell('G8');
    cB2.value = isFilledSample ? 'شناسه ملی / کد اقتصادی: ۱۰۳۲۰۱۵۸۷۴۲  |  کد ملی: ........................' : 'شناسه ملی / کد اقتصادی: ........................  |  کد ملی: ........................';
    cB2.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_TEXT_MUTED } };

    ws.mergeCells('G9:K9');
    const cB3 = ws.getCell('G9');
    cB3.value = isFilledSample ? 'نشانی: تهران، خیابان ولیعصر، نرسیده به میدان ونک، برج نگین، طبقه ۸' : 'نشانی: ........................................................................................................';
    cB3.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_JET } };

    ws.mergeCells('G10:K10');
    const cB4 = ws.getCell('G10');
    cB4.value = isFilledSample ? 'شماره تماس: ۰۲۱۸۸۶۵۲۱۰۰  |  کد پستی: ۱۹۹۱۸۳۴۵۲۱  |  شهر/استان: تهران' : 'شماره تماس: ........................  |  کد پستی: ........................  |  شهر/استان: ........................';
    cB4.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_TEXT_MUTED } };

    // Style party boxes
    for (let r = 7; r <= 10; r++) {
      ws.getRow(r).height = 19;
      for (let c = 1; c <= 11; c++) {
        const cell = ws.getRow(r).getCell(c);
        cell.border = thinBorder;
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
        if (c <= 6) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_SLATE_BG } };
        }
      }
    }

    // Row 11: Spacer
    ws.getRow(11).height = 8;

    // Row 12: Table Header
    const headers = [
      { text: 'ردیف', col: 'A' },
      { text: 'کد کالا / خدمت', col: 'B' },
      { text: 'شرح کالا یا خدمات فنی و مهندسی', col: 'C' },
      { text: 'تعداد / مقدار', col: 'D' },
      { text: 'واحد', col: 'E' },
      { text: 'مبلغ واحد (ریال)', col: 'F' },
      { text: 'مبلغ کل (ریال)', col: 'G' },
      { text: 'تخفیف (ریال)', col: 'H' },
      { text: 'مبلغ پس از تخفیف (ریال)', col: 'I' },
      { text: 'ارزش افزوده (۱۰٪)', col: 'J' },
      { text: 'مبلغ نهایی (ریال)', col: 'K' }
    ];

    ws.getRow(12).height = 26;
    headers.forEach((h, idx) => {
      const cell = ws.getCell(`${h.col}12`);
      cell.value = h.text;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_JET } };
      cell.font = { name: FONT_FAMILY, size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = thinBorder;
    });

    // Sample data rows if filled
    const sampleItems = [
      { code: 'NET-SW-48P', desc: 'سوئیچ شبکه مدیریتی سیسکو ۴۸ پورت گیگابیت لایه ۳', qty: 2, unit: 'دستگاه', price: 650000000, discount: 20000000 },
      { code: 'CAB-CAT6A-1', desc: 'کابل‌کشی ساخت‌یافته تمام مس Cat6A شیلددار لگراند', qty: 450, unit: 'متر', price: 950000, discount: 0 },
      { code: 'RCK-42U-SRV', desc: 'رک سروری ۴۲ یونیت عمق ۱۰۰ با سیستم توزیع برق هوشمند (PDU)', qty: 1, unit: 'دستگاه', price: 340000000, discount: 15000000 },
      { code: 'CCTV-4K-IP', desc: 'دوربین مداربسته تحت شبکه ۴K با دید در شب هوشمند و کدک H.265+', qty: 8, unit: 'عدد', price: 85000000, discount: 20000000 },
      { code: 'NVR-32CH-4K', desc: 'دستگاه ضبط ۳۲ کانال تحت شبکه NVR با ذخیره‌ساز RAID و پورت‌های دوگانه', qty: 1, unit: 'دستگاه', price: 210000000, discount: 0 },
      { code: 'FBR-SPL-SRV', desc: 'اجرا و فیوژن اسپلیس فیبر نوری سینگل‌مود با تست و گواهی OTDR', qty: 24, unit: 'کور', price: 3500000, discount: 4000000 },
      { code: 'SMT-GW-ZIG', desc: 'کنترلر و درگاه مرکزی خانه هوشمند نُوَند با پروتکل Zigbee 3.0 / KNX', qty: 2, unit: 'دستگاه', price: 145000000, discount: 10000000 },
      { code: 'UPS-10KVA-ON', desc: 'یو‌پی‌اس آنلاین ۱۰ کاوا صنعتی سه به تک با باتری بکاپ ۴ ساعت', qty: 1, unit: 'ست', price: 580000000, discount: 30000000 },
      { code: 'SRV-INST-CFG', desc: 'خدمات نصب، پیکربندی مجازی‌سازی VMware ESXi و پشتیبان‌گیری خودکار', qty: 1, unit: 'پروژه', price: 220000000, discount: 0 },
      { code: 'VOIP-IPBX-60', desc: 'راه‌اندازی سانترال ابری VoIP مبتنی بر استریسک با ۶۰ داخلی همزمان', qty: 1, unit: 'سرویس', price: 175000000, discount: 15000000 }
    ];

    const START_ROW = 13;
    const TOTAL_ROWS = 15;
    const END_ROW = START_ROW + TOTAL_ROWS - 1; // 27

    for (let i = 0; i < TOTAL_ROWS; i++) {
      const rowNum = START_ROW + i;
      const row = ws.getRow(rowNum);
      row.height = 21;

      const isEven = i % 2 === 0;
      const rowBg = isEven ? 'FFFFFFFF' : 'FF' + COLOR_SLATE_BG;

      const item = isFilledSample && i < sampleItems.length ? sampleItems[i] : null;

      // Col A: Row index
      const cellA = row.getCell(1);
      cellA.value = i + 1;
      cellA.alignment = { horizontal: 'center', vertical: 'middle' };

      // Col B: Item Code
      const cellB = row.getCell(2);
      cellB.value = item ? item.code : '';
      cellB.alignment = { horizontal: 'center', vertical: 'middle' };

      // Col C: Description
      const cellC = row.getCell(3);
      cellC.value = item ? item.desc : '';
      cellC.alignment = { horizontal: 'right', vertical: 'middle' };

      // Col D: Quantity
      const cellD = row.getCell(4);
      cellD.value = item ? item.qty : '';
      cellD.numFmt = '#,##0';
      cellD.alignment = { horizontal: 'center', vertical: 'middle' };

      // Col E: Unit
      const cellE = row.getCell(5);
      cellE.value = item ? item.unit : '';
      cellE.alignment = { horizontal: 'center', vertical: 'middle' };

      // Col F: Unit Price
      const cellF = row.getCell(6);
      cellF.value = item ? item.price : '';
      cellF.numFmt = '#,##0';
      cellF.alignment = { horizontal: 'right', vertical: 'middle' };

      // Col G: Total Price = Qty * Unit Price
      const cellG = row.getCell(7);
      cellG.value = {
        formula: `IF(OR(D${rowNum}="",F${rowNum}=""),"",D${rowNum}*F${rowNum})`,
        result: item ? item.qty * item.price : undefined
      };
      cellG.numFmt = '#,##0';
      cellG.alignment = { horizontal: 'right', vertical: 'middle' };

      // Col H: Discount
      const cellH = row.getCell(8);
      cellH.value = item ? item.discount : '';
      cellH.numFmt = '#,##0';
      cellH.alignment = { horizontal: 'right', vertical: 'middle' };

      // Col I: Net Amount = Total - Discount
      const cellI = row.getCell(9);
      cellI.value = {
        formula: `IF(G${rowNum}="","",G${rowNum}-IF(H${rowNum}="","",H${rowNum}))`,
        result: item ? (item.qty * item.price) - item.discount : undefined
      };
      cellI.numFmt = '#,##0';
      cellI.alignment = { horizontal: 'right', vertical: 'middle' };

      // Col J: VAT (10%) = Net * 10%
      const cellJ = row.getCell(10);
      cellJ.value = {
        formula: `IF(I${rowNum}="","",ROUND(I${rowNum}*0.1,0))`,
        result: item ? Math.round(((item.qty * item.price) - item.discount) * 0.1) : undefined
      };
      cellJ.numFmt = '#,##0';
      cellJ.alignment = { horizontal: 'right', vertical: 'middle' };

      // Col K: Row Total = Net + VAT
      const cellK = row.getCell(11);
      cellK.value = {
        formula: `IF(I${rowNum}="","",I${rowNum}+J${rowNum})`,
        result: item ? ((item.qty * item.price) - item.discount) + Math.round(((item.qty * item.price) - item.discount) * 0.1) : undefined
      };
      cellK.numFmt = '#,##0';
      cellK.alignment = { horizontal: 'right', vertical: 'middle' };

      // Apply borders, font, and background to all cells in the row
      for (let c = 1; c <= 11; c++) {
        const cell = row.getCell(c);
        cell.border = thinBorder;
        cell.font = { name: FONT_FAMILY, size: 9, color: { argb: 'FF' + COLOR_JET } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      }
    }

    // Row 28 to 33: Summary and Terms Section
    // Terms & Payment on Columns A to F
    ws.mergeCells(`A${END_ROW + 1}:F${END_ROW + 1}`);
    const cTermsHead = ws.getCell(`A${END_ROW + 1}`);
    cTermsHead.value = 'شرایط و ضوابط پیش‌فاکتور و اطلاعات پرداخت';
    cTermsHead.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_JET } };
    cTermsHead.font = { name: FONT_FAMILY, size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
    cTermsHead.alignment = { horizontal: 'center', vertical: 'middle' };

    const termsLines = [
      '۱. مدت اعتبار این پیش‌فاکتور از تاریخ صدور به مدت ۷ روز کاری معتبر می‌باشد.',
      '۲. نحوه پرداخت: ۵۰٪ پیش‌پرداخت هنگام تایید پیش‌فاکتور، ۴۰٪ پس از تحویل اقلام و اتمام نصب، ۱۰٪ پس از تست و تحویل نهایی.',
      '۳. تمامی اقلام دارای گارانتی معتبر شرکتی نُوَند و خدمات فنی دارای استاندارد مهندسی و پشتیبانی می‌باشند.',
      '۴. شماره شبا جهت واریز: IR680120000000001234567890 بنام شرکت مهندسی نُوَند (بانک ملت)',
      '۵. هرگونه تغییر در مشخصات فنی یا حجم پروژه منوط به صدور الحاقیه یا پیش‌فاکتور اصلاحی خواهد بود.'
    ];

    for (let t = 0; t < termsLines.length; t++) {
      const termRow = END_ROW + 2 + t;
      ws.mergeCells(`A${termRow}:F${termRow}`);
      const cTerm = ws.getCell(`A${termRow}`);
      cTerm.value = termsLines[t];
      cTerm.font = { name: FONT_FAMILY, size: 8.5, color: { argb: 'FF' + COLOR_JET } };
      cTerm.alignment = { horizontal: 'right', vertical: 'middle' };
      cTerm.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_SLATE_BG } };
    }

    // Financial Summaries on Columns G to K
    const summaryRows = [
      { label: 'جمع کل مبالغ اقلام (قبل از تخفیف):', formula: `=SUM(G${START_ROW}:G${END_ROW})`, colStart: 'G', colEnd: 'I', valColStart: 'J', valColEnd: 'K' },
      { label: 'جمع کل تخفیف اعطایی:', formula: `=SUM(H${START_ROW}:H${END_ROW})`, colStart: 'G', colEnd: 'I', valColStart: 'J', valColEnd: 'K' },
      { label: 'مبلغ کل پس از کسر تخفیف:', formula: `=SUM(I${START_ROW}:I${END_ROW})`, colStart: 'G', colEnd: 'I', valColStart: 'J', valColEnd: 'K' },
      { label: 'مالیات و عوارض ارزش افزوده (۱۰٪):', formula: `=SUM(J${START_ROW}:J${END_ROW})`, colStart: 'G', colEnd: 'I', valColStart: 'J', valColEnd: 'K' },
      { label: 'مبلغ نهایی قابل پرداخت (ریال):', formula: `=SUM(K${START_ROW}:K${END_ROW})`, colStart: 'G', colEnd: 'I', valColStart: 'J', valColEnd: 'K', isGrandTotal: true },
      { label: 'مبلغ به حروف:', text: isFilledSample ? 'سه میلیارد و شصت و شش میلیون و صد و پنجاه هزار ریال' : '................................................................................................................', colStart: 'G', colEnd: 'H', valColStart: 'I', valColEnd: 'K', isText: true }
    ];

    summaryRows.forEach((sr, sIdx) => {
      const rowNum = END_ROW + 1 + sIdx;
      ws.getRow(rowNum).height = sr.isGrandTotal ? 24 : 20;

      // Label
      ws.mergeCells(`${sr.colStart}${rowNum}:${sr.colEnd}${rowNum}`);
      const cLabel = ws.getCell(`${sr.colStart}${rowNum}`);
      cLabel.value = sr.label;
      cLabel.font = { name: FONT_FAMILY, size: sr.isGrandTotal ? 10.5 : 9, bold: true, color: { argb: sr.isGrandTotal ? 'FF' + COLOR_TEAL : 'FF' + COLOR_JET } };
      cLabel.alignment = { horizontal: 'left', vertical: 'middle' };
      cLabel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sr.isGrandTotal ? 'FF' + COLOR_TEAL_LIGHT : 'FFF1F5F9' } };

      // Value
      ws.mergeCells(`${sr.valColStart}${rowNum}:${sr.valColEnd}${rowNum}`);
      const cVal = ws.getCell(`${sr.valColStart}${rowNum}`);
      if (sr.isText) {
        cVal.value = sr.text;
        cVal.font = { name: FONT_FAMILY, size: 8.5, bold: true, color: { argb: 'FF' + COLOR_JET } };
        cVal.alignment = { horizontal: 'center', vertical: 'middle' };
      } else {
        cVal.value = { formula: sr.formula };
        cVal.numFmt = '#,##0';
        cVal.font = { name: FONT_FAMILY, size: sr.isGrandTotal ? 12 : 9.5, bold: true, color: { argb: sr.isGrandTotal ? 'FF' + COLOR_JET : 'FF' + COLOR_JET } };
        cVal.alignment = { horizontal: 'right', vertical: 'middle' };
      }
      cVal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sr.isGrandTotal ? 'FF' + COLOR_TEAL_LIGHT : 'FFFFFFFF' } };

      // Borders
      for (let c = 1; c <= 11; c++) {
        const cell = ws.getRow(rowNum).getCell(c);
        cell.border = thinBorder;
      }
    });

    // Spacer
    const SIGN_ROW = END_ROW + 8;
    ws.getRow(SIGN_ROW - 1).height = 10;

    // Signatures Box (Rows 35 to 39)
    ws.mergeCells(`A${SIGN_ROW}:E${SIGN_ROW}`);
    const cSignBuyerHead = ws.getCell(`A${SIGN_ROW}`);
    cSignBuyerHead.value = 'مهر و امضای خریدار / کارفرما';
    cSignBuyerHead.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_JET } };
    cSignBuyerHead.font = { name: FONT_FAMILY, size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
    cSignBuyerHead.alignment = { horizontal: 'center', vertical: 'middle' };

    ws.mergeCells(`G${SIGN_ROW}:K${SIGN_ROW}`);
    const cSignSellerHead = ws.getCell(`G${SIGN_ROW}`);
    cSignSellerHead.value = 'مهر و امضای فروشنده (شرکت مهندسی نُوَند)';
    cSignSellerHead.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLOR_JET } };
    cSignSellerHead.font = { name: FONT_FAMILY, size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
    cSignSellerHead.alignment = { horizontal: 'center', vertical: 'middle' };

    ws.getRow(SIGN_ROW).height = 20;

    // Signature bodies
    ws.mergeCells(`A${SIGN_ROW + 1}:E${SIGN_ROW + 4}`);
    const cSignBuyerBody = ws.getCell(`A${SIGN_ROW + 1}`);
    cSignBuyerBody.value = 'صحت کلیه اقلام، مشخصات فنی و مبالغ مندرج در این پیش‌فاکتور مورد تأیید است.\n\nنام و سمت مجاز: ....................................................\n\nتاریخ و امضاء:';
    cSignBuyerBody.font = { name: FONT_FAMILY, size: 8.5, color: { argb: 'FF' + COLOR_TEXT_MUTED } };
    cSignBuyerBody.alignment = { horizontal: 'right', vertical: 'top', wrapText: true };
    cSignBuyerBody.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };

    ws.mergeCells(`G${SIGN_ROW + 1}:K${SIGN_ROW + 4}`);
    const cSignSellerBody = ws.getCell(`G${SIGN_ROW + 1}`);
    cSignSellerBody.value = 'شرکت مهندسی نُوَند — واحد فروش و پروژه‌های یکپارچه\nتضمین استانداردهای صنعتی و اصالت تجهیزات\n\nکارشناس فروش: ....................................................\n\nمهر رسمی شرکت و امضاء:';
    cSignSellerBody.font = { name: FONT_FAMILY, size: 8.5, color: { argb: 'FF' + COLOR_TEXT_MUTED } };
    cSignSellerBody.alignment = { horizontal: 'right', vertical: 'top', wrapText: true };
    cSignSellerBody.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };

    for (let r = SIGN_ROW; r <= SIGN_ROW + 4; r++) {
      if (r > SIGN_ROW) ws.getRow(r).height = 18;
      for (let c = 1; c <= 11; c++) {
        if (c !== 6) {
          const cell = ws.getRow(r).getCell(c);
          cell.border = thinBorder;
        }
      }
    }

    // Bottom brand footer strip
    const FOOTER_ROW = SIGN_ROW + 5;
    ws.getRow(FOOTER_ROW).height = 16;
    ws.mergeCells(`A${FOOTER_ROW}:K${FOOTER_ROW}`);
    const cFoot = ws.getCell(`A${FOOTER_ROW}`);
    cFoot.value = 'شرکت مهندسی نُوَند | تهران، سعادت‌آباد، پلاک ۲۶، واحد ۱۷ | تلفن: ۰۹۱۲۹۳۲۱۵۵۰ - ۰۹۱۹۶۹۱۸۷۵۸ | وب‌سایت: novand-tech.com';
    cFoot.font = { name: FONT_FAMILY, size: 8, color: { argb: 'FF' + COLOR_TEXT_MUTED } };
    cFoot.alignment = { horizontal: 'center', vertical: 'middle' };
    cFoot.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
    cFoot.border = thinBorder;
  }

  // Generate both sheets
  setupSheet(false); // Sheet 1: Raw Template
  setupSheet(true);  // Sheet 2: Filled Sample Reference

  const outFilePath = path.join(templatesDir, 'novand-invoice-template.xlsx');
  const dlFilePath = path.join(downloadsDir, 'novand-invoice-template.xlsx');

  await workbook.xlsx.writeFile(outFilePath);
  fs.copyFileSync(outFilePath, dlFilePath);

  console.log(`[OK] Generated Novand Persian Invoice Excel template:`);
  console.log(` -> ${outFilePath}`);
  console.log(` -> ${dlFilePath}`);
}

generateInvoiceExcel().catch((err) => {
  console.error('Error generating Excel file:', err);
  process.exit(1);
});
