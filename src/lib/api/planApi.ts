import apiClient from './apiClient';

// Define the endpoints
const PLANS_ENDPOINT = '/plans';

// Define the plain plan data type for API calls
export type PlanApiData = {
  name: string;
  description: string;
  monthlyPrice: number;
  billingOptions?: {
    quarterly?: {
      enabled: boolean;
      discountPercentage: number;
    };
    annual?: {
      enabled: boolean;
      discountPercentage: number;
    };
    biannual?: {
      enabled: boolean;
      discountPercentage: number;
    };
  };
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  location: 'USA' | 'EU';
  popular?: boolean;
  purchaseUrl: string;
};

export interface PlanApiResponse extends PlanApiData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Plan API Service
 */
export const planApi = {
  /**
   * Get all plans or filter by location
   */
  getPlans: async (location?: 'USA' | 'EU'): Promise<PlanApiResponse[]> => {
    const endpoint = location
      ? `${PLANS_ENDPOINT}?location=${location}`
      : PLANS_ENDPOINT;
    
    return apiClient.get<PlanApiResponse[]>(endpoint);
  },

  /**
   * Get a plan by ID
   */
  getPlanById: async (id: string): Promise<PlanApiResponse> => {
    return apiClient.get<PlanApiResponse>(`${PLANS_ENDPOINT}/${id}`);
  },

  /**
   * Create a new plan
   */
  createPlan: async (planData: PlanApiData): Promise<PlanApiResponse> => {
    return apiClient.post<PlanApiResponse>(PLANS_ENDPOINT, planData);
  },

  /**
   * Update a plan
   */
  updatePlan: async (id: string, planData: PlanApiData): Promise<PlanApiResponse> => {
    return apiClient.put<PlanApiResponse>(`${PLANS_ENDPOINT}/${id}`, planData);
  },

  /**
   * Delete a plan
   */
  deletePlan: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${PLANS_ENDPOINT}/${id}`);
  }
};

export default planApi; 