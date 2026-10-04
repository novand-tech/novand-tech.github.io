/**
 * Novand Blog & Technical Knowledge Base
 * 
 * Provides type definitions, metadata aggregation, and Markdown loader utilities
 * for Novand's engineering articles, technical whitepapers, and field documentation.
 */

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishDate: string; // Format: YYYY-MM-DD
  modifiedDate?: string;
  author: string;
  authorRole?: string;
  category: string;
  categorySlug: string;
  readingTime: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  tags: string[];
  lang: 'fa' | 'en';
  featured?: boolean;
  relatedServices?: string[];
}

export interface BlogPost extends BlogPostFrontmatter {
  Content?: any;
  rawContent?: () => string;
  compiledContent?: () => string;
}

export interface BlogCategory {
  title: string;
  slug: string;
  count: number;
}

/**
 * Loads all Markdown blog posts for a specified language.
 * Uses Vite's import.meta.glob with eager loading.
 */
export function getBlogPosts(lang: 'fa' | 'en' = 'fa'): BlogPost[] {
  let modules: Record<string, any>;

  if (lang === 'en') {
    modules = import.meta.glob('/src/content/blog/en/*.md', { eager: true });
  } else {
    modules = import.meta.glob('/src/content/blog/fa/*.md', { eager: true });
  }

  const posts: BlogPost[] = Object.values(modules).map((mod: any) => {
    const fm: BlogPostFrontmatter = mod.frontmatter || {};
    return {
      ...fm,
      Content: mod.Content,
      rawContent: mod.rawContent,
      compiledContent: mod.compiledContent,
    };
  });

  // Sort descending by publishDate
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

/**
 * Retrieves a single blog post by slug and language.
 */
export function getBlogPostBySlug(slug: string, lang: 'fa' | 'en' = 'fa'): BlogPost | undefined {
  const posts = getBlogPosts(lang);
  return posts.find((p) => p.slug === slug);
}

/**
 * Extracts distinct categories with article count for filter tabs.
 */
export function getBlogCategories(lang: 'fa' | 'en' = 'fa'): BlogCategory[] {
  const posts = getBlogPosts(lang);
  const categoryMap = new Map<string, { title: string; count: number }>();

  posts.forEach((post) => {
    const existing = categoryMap.get(post.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      categoryMap.set(post.categorySlug, {
        title: post.category,
        count: 1,
      });
    }
  });

  const list: BlogCategory[] = [];
  categoryMap.forEach((val, slug) => {
    list.push({
      slug,
      title: val.title,
      count: val.count,
    });
  });

  return list;
}
