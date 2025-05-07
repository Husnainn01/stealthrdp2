import { Document } from 'mongoose';

/**
 * FAQ Category Enum
 */
export enum FaqCategory {
  SERVICES = 'Services & Plans',
  PRICING = 'Pricing & Billing',
  ACCOUNT = 'Account Management',
  TECHNICAL = 'Technical Support & Security'
}

/**
 * Base FAQ interface
 */
export interface IFaqBase {
  question: string;
  answer: string;
  category: FaqCategory;
  displayOrder: number;
  isPublished: boolean;
}

/**
 * FAQ interface with MongoDB document properties
 */
export interface IFaq extends IFaqBase, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Model name for use in MongoDB/Mongoose
 */
export const FAQ_MODEL_NAME = 'Faq'; 