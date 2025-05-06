import apiClient from './apiClient';
import { IPlan } from '../models/Plan';

// Define the endpoints
const PLANS_ENDPOINT = '/plans';

// Define plan without _id for create operations
type PlanCreateData = Omit<IPlan, '_id' | 'createdAt' | 'updatedAt'>;

// Define plan update data
type PlanUpdateData = Partial<PlanCreateData>;

/**
 * Plan API Service
 */
export const planApi = {
  /**
   * Get all plans or filter by location
   */
  getPlans: async (location?: 'USA' | 'EU'): Promise<IPlan[]> => {
    const endpoint = location
      ? `${PLANS_ENDPOINT}?location=${location}`
      : PLANS_ENDPOINT;
      
    return apiClient.get<IPlan[]>(endpoint);
  },

  /**
   * Get a plan by ID
   */
  getPlanById: async (id: string): Promise<IPlan> => {
    return apiClient.get<IPlan>(`${PLANS_ENDPOINT}/${id}`);
  },

  /**
   * Create a new plan
   */
  createPlan: async (planData: PlanCreateData): Promise<IPlan> => {
    return apiClient.post<IPlan>(PLANS_ENDPOINT, planData);
  },

  /**
   * Update a plan
   */
  updatePlan: async (id: string, planData: PlanUpdateData): Promise<IPlan> => {
    return apiClient.put<IPlan>(`${PLANS_ENDPOINT}/${id}`, planData);
  },

  /**
   * Delete a plan
   */
  deletePlan: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${PLANS_ENDPOINT}/${id}`);
  }
};

export default planApi; 