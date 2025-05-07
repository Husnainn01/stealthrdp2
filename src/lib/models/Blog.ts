import { Document } from 'mongoose';

/**
 * Blog Category Enum
 */
export enum BlogCategory {
  TECHNICAL = 'Technical Guides',
  SECURITY = 'Security',
  ANNOUNCEMENT = 'Announcements',
  TUTORIAL = 'Tutorials',
  INDUSTRY = 'Industry News'
}

/**
 * Base Blog interface
 */
export interface IBlogBase {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Blog interface with MongoDB document properties
 */
export interface IBlog extends IBlogBase, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Model name for use in MongoDB/Mongoose
 */
export const BLOG_MODEL_NAME = 'Blog'; 