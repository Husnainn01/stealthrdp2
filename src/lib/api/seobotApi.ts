import { BlogClient } from 'seobot';
import { IBlog, BlogCategory, IBlogBase } from '../models/Blog';

// SEO Bot configuration
const SEOBOT_API_KEY = '8f6aeb7f-d051-4612-acc0-749f90803d41';

// Create the Blog client according to documentation
let blogClient: any;
try {
  blogClient = new BlogClient(SEOBOT_API_KEY);
  console.log('SEO Bot client initialized');
} catch (initError) {
  console.error('Failed to initialize SEO Bot client:', initError);
}

// Debug function to test SEO Bot API directly
export const testSeoBotApi = async () => {
  try {
    console.log('Testing SEO Bot API with key:', SEOBOT_API_KEY);
    
    // Make sure the client is initialized
    if (!blogClient) {
      throw new Error('SEO Bot client is not initialized');
    }
    
    // Test with a minimal call to get a single article
    try {
      // First try with getArticles
      console.log('Testing getArticles...');
      const response = await blogClient.getArticles(0, 1);
      console.log('Articles response:', response);
      
      // Extract articles array from the response
      const articles = Array.isArray(response) ? response : (response?.articles || []);
      const total = response?.total || 0;
      
      console.log(`Found ${total} total articles, with ${articles.length} in current page`);
      
      // If it worked, also try getting categories
      try {
        console.log('Testing getCategories...');
        // Note: This is based on assuming the API might have this method
        const categories = await blogClient.getCategories?.();
        console.log('Categories response:', categories);
      } catch (categoryError) {
        console.log('getCategories is not supported or failed:', categoryError);
      }
      
      return { 
        success: true, 
        message: 'SEO Bot API test successful!',
        data: { articles, total }
      };
    } catch (articlesError) {
      // Try a direct fetch with a simple URL to test connectivity
      console.log('Testing direct fetch to seobot.io...');
      const testResponse = await fetch('https://seobot.io', { 
        mode: 'no-cors',  // Try with no-cors to test basic connectivity
        cache: 'no-cache'
      });
      
      console.log('Direct connectivity test result:', testResponse.type);
      
      return { 
        success: false, 
        error: articlesError,
        message: `SDK Error: ${articlesError.message || JSON.stringify(articlesError)}`
      };
    }
  } catch (error) {
    console.error('SEO Bot API Test Failed:', error);
    return { 
      success: false, 
      error, 
      message: 'API Error: ' + (error.message || JSON.stringify(error)) 
    };
  }
};

// Interface matching the SEO Bot SDK response
interface IArticle {
  id: string;
  slug: string;
  headline: string;
  metaDescription: string;
  metaKeywords: string;
  tags: ITag[];
  category: ICategory;
  readingTime: number;
  html: string;
  markdown: string;
  outline: string;
  deleted: boolean;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  relatedPosts: IRelatedPost[];
  image: string;
}

interface ITag {
  id: string;
  title: string;
  slug: string;
}

interface ICategory {
  id: string;
  title: string;
  slug: string;
}

interface IRelatedPost {
  id: string;
  headline: string;
  slug: string;
}

// Map SEO Bot category to our app's BlogCategory
const mapCategory = (category: ICategory): BlogCategory => {
  const categoryMap: Record<string, BlogCategory> = {
    'technical': BlogCategory.TECHNICAL,
    'security': BlogCategory.SECURITY,
    'announcement': BlogCategory.ANNOUNCEMENT,
    'tutorial': BlogCategory.TUTORIAL,
    'news': BlogCategory.INDUSTRY,
    'guides': BlogCategory.TECHNICAL,
    'remote-desktop': BlogCategory.TECHNICAL,
    'remote': BlogCategory.TECHNICAL
  };

  // Try to match by title (case-insensitive)
  const lowerCaseTitle = category.title.toLowerCase();
  
  // First, try direct matches
  if (categoryMap[lowerCaseTitle]) {
    return categoryMap[lowerCaseTitle];
  }
  
  // Then try to find partial matches
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerCaseTitle.includes(key)) {
      return value;
    }
  }

  // Default to Tutorial if category doesn't match
  return BlogCategory.TUTORIAL;
};

// Convert SEO Bot article format to our app's IBlogBase format
const convertSeoBotArticle = (article: any): IBlogBase => {
  if (!article) {
    throw new Error('Invalid article data');
  }
  
  // Map blog category from SEO Bot format to our application format
  let category = BlogCategory.TUTORIAL; // Default
  if (article.category) {
    const categoryTitle = typeof article.category === 'string' 
      ? article.category 
      : article.category.title || '';
    
    console.log('Mapping SEO Bot category:', {
      original: article.category,
      title: categoryTitle
    });
    
    // Simple mapping based on keywords in the category title
    if (categoryTitle.toLowerCase().includes('security')) {
      category = BlogCategory.SECURITY;
    } else if (categoryTitle.toLowerCase().includes('tech')) {
      category = BlogCategory.TECHNICAL;
    } else if (categoryTitle.toLowerCase().includes('announce')) {
      category = BlogCategory.ANNOUNCEMENT;
    } else if (categoryTitle.toLowerCase().includes('news')) {
      category = BlogCategory.INDUSTRY;
    } else if (categoryTitle.toLowerCase().includes('remote desktop')) {
      category = BlogCategory.TECHNICAL; // Map 'Remote Desktop' to Technical Guides
    } else if (categoryTitle.toLowerCase().includes('remote')) {
      category = BlogCategory.TECHNICAL; // Map any 'Remote' related categories to Technical Guides
    }
    
    console.log(`Mapped category "${categoryTitle}" to "${category}"`);
  }
  
  // Get content and sanitize it
  let content = article.html || article.markdown || article.content || '';
  content = sanitizeContent(content);
  
  return {
    title: article.headline || article.title,
    slug: article.slug,
    content,
    excerpt: article.metaDescription || article.summary || '',
    featuredImage: article.image || '',
    author: article.author?.name || "StealthRDP Team",
    category,
    tags: Array.isArray(article.tags) 
      ? article.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.title || '') 
      : [],
    isPublished: article.published !== undefined ? article.published : true,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    metaTitle: article.headline || article.title,
    metaDescription: article.metaDescription || article.summary || '',
    readingTime: article.readingTime || Math.ceil(content.length / 3000) // Approximate 3000 chars per minute
  };
};

/**
 * Sanitize content to fix SVG issues and other potential HTML problems
 */
const sanitizeContent = (content: string): string => {
  if (!content) return '';
  
  try {
    // Fix SVG path issues
    content = content.replace(/d="[^"]*?\.{3}[^"]*?"/g, 'fill="currentColor"');
    
    // Remove potentially problematic SVG attributes
    content = content.replace(/<svg[^>]*>/g, (match) => {
      return match
        .replace(/viewBox="[^"]*"/g, 'viewBox="0 0 24 24"')
        .replace(/width="[^"]*"/g, 'width="24"')
        .replace(/height="[^"]*"/g, 'height="24"');
    });
    
    // Clean up any script tags (security precaution)
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    return content;
  } catch (err) {
    console.error('Error sanitizing content:', err);
    // If sanitization fails, remove all SVGs as a fallback
    return content.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  }
};

/**
 * SEO Bot API Service with fallbacks for error conditions
 */
export const seoBotApi = {
  /**
   * Fetch blogs from SEO Bot - with fallbacks for errors
   */
  getBlogs: async (limit: number = 10): Promise<IBlogBase[]> => {
    if (!blogClient) {
      console.warn('SEO Bot client is not initialized, cannot fetch blogs');
      return [];
    }
    
    try {
      // page is 0-based in their API, so 0 means first page
      console.log(`Calling blogClient.getArticles(0, ${limit})...`);
      const response = await blogClient.getArticles(0, limit);
      console.log('SEO Bot getArticles response:', response);
      
      // Check if response is in the new format with articles and total properties
      const articles = Array.isArray(response) ? response : (response?.articles || []);
      
      if (!articles || articles.length === 0) {
        console.warn('No articles returned from SEO Bot API');
        return [];
      }
      
      return articles.map((article: any) => convertSeoBotArticle(article));
    } catch (error) {
      console.error('Error fetching blogs from SEO Bot:', error);
      return [];
    }
  },

  /**
   * Fetch a specific blog by slug from SEO Bot
   */
  getBlogBySlug: async (slug: string): Promise<IBlogBase | null> => {
    if (!blogClient) {
      console.warn('SEO Bot client is not initialized, cannot fetch blog by slug');
      return null;
    }
    
    try {
      console.log(`Calling blogClient.getArticle("${slug}")...`);
      const article = await blogClient.getArticle(slug);
      
      if (!article) {
        console.warn(`No article found with slug "${slug}"`);
        return null;
      }
      
      return convertSeoBotArticle(article);
    } catch (error) {
      console.error(`Error fetching blog with slug ${slug} from SEO Bot:`, error);
      return null;
    }
  },

  /**
   * Fetch blogs by category from SEO Bot
   */
  getBlogsByCategory: async (category: string, limit: number = 10): Promise<IBlogBase[]> => {
    if (!blogClient) {
      console.warn('SEO Bot client is not initialized, cannot fetch blogs by category');
      return [];
    }
    
    try {
      // Try to find category slug based on the category string
      // Note: The category might be a BlogCategory enum value or a slug
      // For simplicity, we'll convert to lowercase and use as slug
      const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
      
      console.log(`Calling blogClient.getCategoryArticles("${categorySlug}", 0, ${limit})...`);
      const articles = await blogClient.getCategoryArticles(categorySlug, 0, limit);
      console.log('SEO Bot getCategoryArticles response:', articles);
      
      if (!articles || !Array.isArray(articles) || articles.length === 0) {
        console.warn(`No articles found for category "${category}"`);
        return [];
      }
      
      return articles.map((article: any) => convertSeoBotArticle(article));
    } catch (error) {
      console.error(`Error fetching blogs with category ${category} from SEO Bot:`, error);
      return [];
    }
  }
};

export default seoBotApi; 