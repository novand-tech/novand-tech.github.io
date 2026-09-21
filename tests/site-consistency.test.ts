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
});
