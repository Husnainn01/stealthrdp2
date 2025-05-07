import apiClient from './apiClient';
import { IFaq, FaqCategory } from '../models/Faq';

// Define the endpoints
const FAQS_ENDPOINT = '/faqs';

// Define FAQ without _id for create operations
type FaqCreateData = Omit<IFaq, '_id' | 'createdAt' | 'updatedAt'>;

// Define FAQ update data
type FaqUpdateData = Partial<FaqCreateData>;

/**
 * FAQ API Service
 */
export const faqApi = {
  /**
   * Get all FAQs
   */
  getAllFaqs: async (): Promise<IFaq[]> => {
    return apiClient.get<IFaq[]>(FAQS_ENDPOINT);
  },

  /**
   * Get published FAQs
   */
  getPublishedFaqs: async (): Promise<IFaq[]> => {
    return apiClient.get<IFaq[]>(`${FAQS_ENDPOINT}/published`);
  },

  /**
   * Get FAQs by category
   */
  getFaqsByCategory: async (category: FaqCategory): Promise<IFaq[]> => {
    return apiClient.get<IFaq[]>(`${FAQS_ENDPOINT}/category/${category}`);
  },

  /**
   * Get a FAQ by ID
   */
  getFaqById: async (id: string): Promise<IFaq> => {
    return apiClient.get<IFaq>(`${FAQS_ENDPOINT}/${id}`);
  },

  /**
   * Create a new FAQ
   */
  createFaq: async (faqData: FaqCreateData): Promise<IFaq> => {
    return apiClient.post<IFaq>(FAQS_ENDPOINT, faqData);
  },

  /**
   * Update a FAQ
   */
  updateFaq: async (id: string, faqData: FaqUpdateData): Promise<IFaq> => {
    return apiClient.put<IFaq>(`${FAQS_ENDPOINT}/${id}`, faqData);
  },

  /**
   * Delete a FAQ
   */
  deleteFaq: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${FAQS_ENDPOINT}/${id}`);
  }
};

export default faqApi; 