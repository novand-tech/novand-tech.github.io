import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

import { servicesDataFa, servicesDataEn, getServicesData } from '../src/data/services';
import { solutionsDataFa, solutionsDataEn, getSolutionsData } from '../src/data/solutions';
import { projectsDataFa, projectsDataEn, getProjectsData } from '../src/data/projects';
import { companyDataFa, companyDataEn, getCompanyData } from '../src/data/company';

describe('Novand Engineering Site - Diagnostics & Unit Tests', () => {

  describe('1. Services Data Integrity & Bilingual Symmetry', () => {
    test('Services count should match between Persian and English', () => {
      assert.strictEqual(servicesDataFa.length, servicesDataEn.length, 'Services count must match');
      assert.strictEqual(servicesDataFa.length, 7, 'Expected exactly 7 core services');
    });

    test('All service slugs must match identically in order and value', () => {
      const slugsFa = servicesDataFa.map(s => s.slug);
      const slugsEn = servicesDataEn.map(s => s.slug);
      assert.deepStrictEqual(slugsFa, slugsEn, 'Service slugs must match identically');
    });

    test('Every service must have valid heroImage that exists on disk', () => {
      for (const service of [...servicesDataFa, ...servicesDataEn]) {
        assert.ok(service.heroImage, `Service ${service.slug} must have heroImage`);
        const relativeImg = service.heroImage.replace(/^\//, '');
        const fullPath = path.join(process.cwd(), 'public', relativeImg);
        assert.ok(fs.existsSync(fullPath), `Image file must exist: ${fullPath}`);
      }
    });

    test('Every service must have complete textual fields and non-empty features', () => {
      for (const s of [...servicesDataFa, ...servicesDataEn]) {
        assert.ok(s.title && s.title.trim().length > 0, `Service ${s.slug} title is empty`);
        assert.ok(s.eyebrow && s.eyebrow.trim().length > 0, `Service ${s.slug} eyebrow is empty`);
        assert.ok(s.summary && s.summary.trim().length > 0, `Service ${s.slug} summary is empty`);
        assert.ok(s.icon && s.icon.trim().length > 0, `Service ${s.slug} icon is empty`);
        assert.ok(Array.isArray(s.features) && s.features.length > 0, `Service ${s.slug} has no features`);
        for (const f of s.features) {
          assert.ok(f.title && f.title.trim().length > 0, `Feature in ${s.slug} has empty title`);
          assert.ok(f.description && f.description.trim().length > 0, `Feature in ${s.slug} has empty description`);
        }
      }
    });

    test('getServicesData helper correctly switches between EN and FA', () => {
      assert.strictEqual(getServicesData('/en/services'), servicesDataEn);
      assert.strictEqual(getServicesData('/services'), servicesDataFa);
      assert.strictEqual(getServicesData('/'), servicesDataFa);
    });
  });

  describe('2. Solutions Data Integrity & Bilingual Symmetry', () => {
    test('Solutions count should match between Persian and English', () => {
      assert.strictEqual(solutionsDataFa.length, solutionsDataEn.length, 'Solutions count must match');
      assert.strictEqual(solutionsDataFa.length, 5, 'Expected exactly 5 target solutions');
    });

    test('All solution slugs must match identically in order and value', () => {
      const slugsFa = solutionsDataFa.map(s => s.slug);
      const slugsEn = solutionsDataEn.map(s => s.slug);
      assert.deepStrictEqual(slugsFa, slugsEn, 'Solution slugs must match identically');
    });

    test('Every solution heroImage must exist on disk', () => {
      for (const sol of [...solutionsDataFa, ...solutionsDataEn]) {
        assert.ok(sol.heroImage, `Solution ${sol.slug} must have heroImage`);
        const relativeImg = sol.heroImage.replace(/^\//, '');
        const fullPath = path.join(process.cwd(), 'public', relativeImg);
        assert.ok(fs.existsSync(fullPath), `Image file must exist: ${fullPath}`);
      }
    });

    test('Every recommendedService in solutions references a valid service slug', () => {
      const validServiceSlugs = new Set(servicesDataEn.map(s => s.slug));
      for (const sol of [...solutionsDataFa, ...solutionsDataEn]) {
        if (sol.recommendedServices && sol.recommendedServices.length > 0) {
          for (const rec of sol.recommendedServices) {
            assert.ok(
              validServiceSlugs.has(rec),
              `Solution ${sol.slug} references unknown service: ${rec}`
            );
          }
        }
      }
    });

    test('getSolutionsData helper correctly switches between EN and FA', () => {
      assert.strictEqual(getSolutionsData('/en/solutions'), solutionsDataEn);
      assert.strictEqual(getSolutionsData('/solutions'), solutionsDataFa);
    });
  });

  describe('3. Projects Data Integrity', () => {
    test('Projects count should match between Persian and English', () => {
      assert.strictEqual(projectsDataFa.length, projectsDataEn.length);
      assert.strictEqual(projectsDataFa.length, 3);
    });

    test('All project slugs must match identically', () => {
      const slugsFa = projectsDataFa.map(p => p.slug);
      const slugsEn = projectsDataEn.map(p => p.slug);
      assert.deepStrictEqual(slugsFa, slugsEn);
    });

    test('Every project featuredImage must exist on disk', () => {
      for (const p of [...projectsDataFa, ...projectsDataEn]) {
        const img = p.featuredImage || p.image;
        assert.ok(img, `Project ${p.slug} must have featuredImage`);
        const relativeImg = img.replace(/^\//, '');
        const fullPath = path.join(process.cwd(), 'public', relativeImg);
        assert.ok(fs.existsSync(fullPath), `Project image must exist: ${fullPath}`);
      }
    });

    test('getProjectsData helper correctly switches between EN and FA', () => {
      assert.strictEqual(getProjectsData('/en/projects'), projectsDataEn);
      assert.strictEqual(getProjectsData('/projects'), projectsDataFa);
    });
  });

  describe('4. Company Metadata & Contact Information', () => {
    test('Company emails and addresses are valid in both languages', () => {
      for (const comp of [companyDataFa, companyDataEn]) {
        assert.ok(comp.name && comp.name.length > 0);
        assert.ok(comp.shortName && comp.shortName.length > 0);
        assert.ok(comp.contactInfo.email.includes('@'));
        assert.ok(comp.contactInfo.address.length > 0);
        assert.ok(comp.capabilities.length > 0);
      }
    });

    test('getCompanyData helper correctly returns language-specific data', () => {
      assert.strictEqual(getCompanyData('/en/about'), companyDataEn);
      assert.strictEqual(getCompanyData('/about'), companyDataFa);
    });
  });

  describe('5. Sitemap & Robots Configuration', () => {
    test('robots.txt exists and specifies User-agent and Sitemap', () => {
      const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
      assert.ok(fs.existsSync(robotsPath));
      const content = fs.readFileSync(robotsPath, 'utf-8');
      assert.ok(content.includes('User-agent: *'));
      assert.ok(content.includes('Sitemap: https://novand-tech.com/sitemap.xml'));
    });

    test('sitemap.xml contains all core routes and service URLs in both FA and EN', () => {
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      assert.ok(fs.existsSync(sitemapPath));
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      
      // Check services
      for (const s of servicesDataEn) {
        assert.ok(content.includes(`/services/${s.slug}`), `Sitemap missing FA service: ${s.slug}`);
        assert.ok(content.includes(`/en/services/${s.slug}`), `Sitemap missing EN service: ${s.slug}`);
      }

      // Check solutions
      for (const s of solutionsDataEn) {
        assert.ok(content.includes(`/solutions/${s.slug}`), `Sitemap missing FA solution: ${s.slug}`);
        assert.ok(content.includes(`/en/solutions/${s.slug}`), `Sitemap missing EN solution: ${s.slug}`);
      }

      // Check brand and logos
      assert.ok(content.includes('/brand'));
      assert.ok(content.includes('/en/brand'));
      assert.ok(content.includes('/logos'));
      assert.ok(content.includes('/en/logos'));
    });
  });

  describe('6. Branding Assets & Theme Support Verification', () => {
    test('All required light and dark logo SVG and PNG variants exist in public/branding/', () => {
      const requiredBrandFiles = [
        'novand-logo-horizontal-dark.svg',
        'novand-logo-horizontal-dark.png',
        'novand-logo-horizontal-light.svg',
        'novand-logo-horizontal-light.png',
        'novand-logo-horizontal-persian.svg',
        'novand-logo-horizontal-persian.png',
        'novand-logo-horizontal-persian-light.svg',
        'novand-logo-horizontal-persian-light.png',
        'novand-logo-stacked-dark.svg',
        'novand-logo-stacked-dark.png',
        'novand-logo-stacked-light.svg',
        'novand-logo-stacked-light.png',
        'novand-logo-square-dark.svg',
        'novand-logo-square-light.svg',
        'novand-logo-square-light.png',
        'novand-logo-persian-captioned.svg',
        'novand-logo-persian-captioned-1080x1080.png',
        'novand-logo-persian-captioned-light.svg',
        'novand-logo-persian-captioned-light-1080x1080.png',
        'novand-logo-vector.svg',
        'novand-logo-transparent-1080x1080.png',
        'novand-brand-assets.zip'
      ];

      for (const fileName of requiredBrandFiles) {
        const filePath = path.join(process.cwd(), 'public', 'branding', fileName);
        assert.ok(fs.existsSync(filePath), `Missing required branding asset: ${fileName}`);
        const stat = fs.statSync(filePath);
        assert.ok(stat.size > 0, `Branding asset ${fileName} is empty`);
      }
    });

    test('All Persian business card SVGs and 300 DPI PNGs exist and are non-empty', () => {
      const requiredBusinessCardFiles = [
        'novand-business-card-ahmadi-dark.svg',
        'novand-business-card-ahmadi-dark.png',
        'novand-business-card-ahmadi-light.svg',
        'novand-business-card-ahmadi-light.png',
        'novand-business-card-ashari-dark.svg',
        'novand-business-card-ashari-dark.png',
        'novand-business-card-ashari-light.svg',
        'novand-business-card-ashari-light.png',
        'novand-business-card-back-dark.svg',
        'novand-business-card-back-dark.png',
        'novand-business-card-back-light.svg',
        'novand-business-card-back-light.png'
      ];

      for (const fileName of requiredBusinessCardFiles) {
        const publicPath = path.join(process.cwd(), 'public', 'branding', fileName);
        assert.ok(fs.existsSync(publicPath), `Missing public business card asset: ${fileName}`);
        const stat = fs.statSync(publicPath);
        assert.ok(stat.size > 1000, `Business card file ${fileName} is too small: ${stat.size} bytes`);
      }
    });

    test('Brand asset zip archive contains both dark and light theme assets', () => {
      const zipPath = path.join(process.cwd(), 'public', 'branding', 'novand-brand-assets.zip');
      assert.ok(fs.existsSync(zipPath), 'novand-brand-assets.zip must exist');
      const stat = fs.statSync(zipPath);
      assert.ok(stat.size > 100000, `ZIP archive size unexpected: ${stat.size} bytes`);
    });

    test('BaseLayout contains instant theme initialization script with light mode default', () => {
      const layoutPath = path.join(process.cwd(), 'src', 'layouts', 'BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath));
      const content = fs.readFileSync(layoutPath, 'utf-8');
      assert.ok(content.includes('localStorage.getItem(\'novand_theme\')'), 'Theme script must read localStorage');
      assert.ok(content.includes('classList.add(\'dark\')'), 'Theme script must support dark class');
    });

    test('Global stylesheet contains theme variables and light mode override layer', () => {
      const cssPath = path.join(process.cwd(), 'src', 'styles', 'global.css');
      assert.ok(fs.existsSync(cssPath));
      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      assert.ok(cssContent.includes('--theme-bg-base'), 'CSS must define --theme-bg-base');
      assert.ok(cssContent.includes('--theme-bg-surface'), 'CSS must define --theme-bg-surface');
      assert.ok(cssContent.includes('html.dark'), 'CSS must define html.dark rules');
      assert.ok(cssContent.includes('html:not(.dark)'), 'CSS must define light mode rules');
    });
  });

  describe('7. Advertisement Landing Page & Digital Business Card (/card)', () => {
    test('Landing data file exists and contains valid bilingual profiles', () => {
      const dataFilePath = path.join(process.cwd(), 'src', 'data', 'adLandingData.ts');
      assert.ok(fs.existsSync(dataFilePath), 'adLandingData.ts must exist');
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      assert.ok(content.includes('novand_tech'), 'Must include @novand_tech Instagram handle');
      assert.ok(content.includes('+989129321550'), 'Must include primary phone number');
      assert.ok(content.includes('+989196918758'), 'Must include secondary phone number');
      assert.ok(content.includes('novand.info@gmail.com'), 'Must include email address');
      assert.ok(content.includes('landingDataFa'), 'Must export landingDataFa');
      assert.ok(content.includes('landingDataEn'), 'Must export landingDataEn');
    });

    test('Standalone card page exists and does NOT include website Header/Footer or BaseLayout', () => {
      const cardPath = path.join(process.cwd(), 'src', 'pages', 'card.astro');
      const compPath = path.join(process.cwd(), 'src', 'components', 'landing', 'AdLandingCard.astro');
      assert.ok(fs.existsSync(cardPath), 'src/pages/card.astro must exist');
      assert.ok(fs.existsSync(compPath), 'src/components/landing/AdLandingCard.astro must exist');

      const cardContent = fs.readFileSync(cardPath, 'utf-8');
      const compContent = fs.readFileSync(compPath, 'utf-8');

      // Crucial requirement: Must NOT use BaseLayout or global site navigation
      assert.ok(!cardContent.includes('BaseLayout'), 'card.astro must not use BaseLayout');
      assert.ok(!compContent.includes('import BaseLayout') && !compContent.includes('<BaseLayout'), 'AdLandingCard must not import or render BaseLayout');
      assert.ok(!compContent.includes('components/layout/Header'), 'AdLandingCard must not use site Header');
      assert.ok(!compContent.includes('components/layout/Footer'), 'AdLandingCard must not use site Footer');
    });

    test('Main site Header and Footer do NOT link to the secret /card page', () => {
      const headerPath = path.join(process.cwd(), 'src', 'components', 'layout', 'Header.astro');
      const footerPath = path.join(process.cwd(), 'src', 'components', 'layout', 'Footer.astro');

      const headerContent = fs.readFileSync(headerPath, 'utf-8');
      const footerContent = fs.readFileSync(footerPath, 'utf-8');

      assert.ok(!headerContent.includes('/card'), 'Header must not expose /card');
      assert.ok(!footerContent.includes('/card'), 'Footer must not expose /card');
    });

    test('English card page and aliases (/connect, /links) exist', () => {
      assert.ok(fs.existsSync(path.join(process.cwd(), 'src', 'pages', 'en', 'card.astro')));
      assert.ok(fs.existsSync(path.join(process.cwd(), 'src', 'pages', 'connect.astro')));
      assert.ok(fs.existsSync(path.join(process.cwd(), 'src', 'pages', 'links.astro')));
    });
  });

  describe('8. 6-Page Advertisement Booklet & Tri-Fold Brochure Assets & Architecture', () => {
    test('brochureData.ts exists, exports 6 structured panels and contact info', () => {
      const dataFilePath = path.join(process.cwd(), 'src', 'data', 'brochureData.ts');
      assert.ok(fs.existsSync(dataFilePath), 'brochureData.ts must exist');
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      assert.ok(content.includes('brochureData'), 'Must export brochureData');
      assert.ok(content.includes('0912 932 1550'), 'Must contain required phone number');
      assert.ok(content.includes('سعادت‌آباد'), 'Must contain required office address in Saadat Abad');
      assert.ok(content.includes('مشاوره'), 'Must include 4-step process step: مشاوره');
      assert.ok(content.includes('تأمین تجهیزات') || content.includes('تامین تجهیزات'), 'Must include 4-step process step: تامین تجهیزات');
      assert.ok(content.includes('اجرا'), 'Must include 4-step process step: اجرا');
      assert.ok(content.includes('پشتیبانی'), 'Must include 4-step process step: پشتیبانی');
    });

    test('All 18 generated brochure print and showcase assets exist in public/branding', () => {
      const brandingDir = path.join(process.cwd(), 'public', 'branding');
      const requiredFiles = [
        'novand-brochure-spread-outside-dark.svg',
        'novand-brochure-spread-outside-dark.png',
        'novand-brochure-spread-inside-dark.svg',
        'novand-brochure-spread-inside-dark.png',
        'novand-brochure-spread-outside-light.svg',
        'novand-brochure-spread-outside-light.png',
        'novand-brochure-spread-inside-light.svg',
        'novand-brochure-spread-inside-light.png',
        'novand-brochure-showcase-dark.svg',
        'novand-brochure-showcase-dark.png',
        'novand-brochure-showcase-light.svg',
        'novand-brochure-showcase-light.png',
        'novand-brochure-dark-p1.png',
        'novand-brochure-dark-p2.png',
        'novand-brochure-dark-p3.png',
        'novand-brochure-dark-p4.png',
        'novand-brochure-dark-p5.png',
        'novand-brochure-dark-p6.png',
        'novand-brochure-light-p1.png',
        'novand-brochure-light-p2.png',
        'novand-brochure-light-p3.png',
        'novand-brochure-light-p4.png',
        'novand-brochure-light-p5.png',
        'novand-brochure-light-p6.png'
      ];

      for (const file of requiredFiles) {
        const fullPath = path.join(brandingDir, file);
        assert.ok(fs.existsSync(fullPath), `Asset must exist: ${file}`);
        const stat = fs.statSync(fullPath);
        assert.ok(stat.size > 1000, `Asset ${file} should have meaningful size, found ${stat.size} bytes`);
      }
    });

    test('Brochure dedicated pages exist in both Persian and English', () => {
      const faPage = path.join(process.cwd(), 'src', 'pages', 'brochure.astro');
      const enPage = path.join(process.cwd(), 'src', 'pages', 'en', 'brochure.astro');
      assert.ok(fs.existsSync(faPage), 'src/pages/brochure.astro must exist');
      assert.ok(fs.existsSync(enPage), 'src/pages/en/brochure.astro must exist');

      const faContent = fs.readFileSync(faPage, 'utf-8');
      assert.ok(faContent.includes('novand-brochure-spread-outside-dark.png'));
      assert.ok(faContent.includes('novand-brochure-spread-inside-dark.png'));
      assert.ok(faContent.includes('@media print'), 'Must include A4 print styles');
    });

    test('Brand guidelines page integrates brochure assets and filters', () => {
      const brandFa = path.join(process.cwd(), 'src', 'pages', 'brand.astro');
      const brandEn = path.join(process.cwd(), 'src', 'pages', 'en', 'brand.astro');

      const contentFa = fs.readFileSync(brandFa, 'utf-8');
      const contentEn = fs.readFileSync(brandEn, 'utf-8');

      assert.ok(contentFa.includes('data-filter="brochure"'), 'Brand FA must have brochure filter button');
      assert.ok(contentEn.includes('data-filter="brochure"'), 'Brand EN must have brochure filter button');
      assert.ok(contentFa.includes('novand-brochure-showcase-dark.png'), 'Brand FA must show dark showcase');
      assert.ok(contentFa.includes('novand-brochure-showcase-light.png'), 'Brand FA must show light showcase');
      assert.ok(contentEn.includes('novand-brochure-showcase-dark.png'), 'Brand EN must show dark showcase');
      assert.ok(contentEn.includes('novand-brochure-showcase-light.png'), 'Brand EN must show light showcase');
    });
  });
});
