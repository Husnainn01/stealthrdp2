import apiClient from './apiClient';
import { ITestimonial } from '../models/Testimonial';

// Define the endpoints
const TESTIMONIALS_ENDPOINT = '/testimonials';

// Define testimonial without _id for create operations
type TestimonialCreateData = Omit<ITestimonial, '_id' | 'createdAt' | 'updatedAt'>;

// Define testimonial update data
type TestimonialUpdateData = Partial<TestimonialCreateData>;

/**
 * Testimonial API Service
 */
export const testimonialApi = {
  /**
   * Get all testimonials
   */
  getAllTestimonials: async (): Promise<ITestimonial[]> => {
    return apiClient.get<ITestimonial[]>(TESTIMONIALS_ENDPOINT);
  },

  /**
   * Get a testimonial by ID
   */
  getTestimonialById: async (id: string): Promise<ITestimonial> => {
    return apiClient.get<ITestimonial>(`${TESTIMONIALS_ENDPOINT}/${id}`);
  },

  /**
   * Create a new testimonial
   */
  createTestimonial: async (testimonialData: TestimonialCreateData): Promise<ITestimonial> => {
    return apiClient.post<ITestimonial>(TESTIMONIALS_ENDPOINT, testimonialData);
  },

  /**
   * Update a testimonial
   */
  updateTestimonial: async (id: string, testimonialData: TestimonialUpdateData): Promise<ITestimonial> => {
    return apiClient.put<ITestimonial>(`${TESTIMONIALS_ENDPOINT}/${id}`, testimonialData);
  },

  /**
   * Delete a testimonial
   */
  deleteTestimonial: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${TESTIMONIALS_ENDPOINT}/${id}`);
  }
};

export default testimonialApi; 