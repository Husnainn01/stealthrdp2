import apiClient from './apiClient';
import { IPrivacyPolicy } from '../models/PrivacyPolicy';

// Define the endpoints
const PRIVACY_POLICY_ENDPOINT = '/privacy-policy';

// Define types for create/update operations
type PrivacyPolicyData = Omit<IPrivacyPolicy, '_id' | 'createdAt' | 'updatedAt'>;

/**
 * Privacy Policy API Service
 */
export const privacyPolicyApi = {
  /**
   * Get the current active privacy policy
   */
  getPrivacyPolicy: async (): Promise<IPrivacyPolicy> => {
    return apiClient.get<IPrivacyPolicy>(PRIVACY_POLICY_ENDPOINT);
  },

  /**
   * Get all privacy policies (for admin)
   */
  getAllPrivacyPolicies: async (): Promise<IPrivacyPolicy[]> => {
    return apiClient.get<IPrivacyPolicy[]>(`${PRIVACY_POLICY_ENDPOINT}/all`);
  },

  /**
   * Create a new privacy policy
   */
  createPrivacyPolicy: async (policyData: PrivacyPolicyData): Promise<IPrivacyPolicy> => {
    return apiClient.post<IPrivacyPolicy>(PRIVACY_POLICY_ENDPOINT, policyData);
  },

  /**
   * Update an existing privacy policy
   */
  updatePrivacyPolicy: async (id: string, policyData: Partial<PrivacyPolicyData>): Promise<IPrivacyPolicy> => {
    return apiClient.put<IPrivacyPolicy>(`${PRIVACY_POLICY_ENDPOINT}/${id}`, policyData);
  },

  /**
   * Delete a privacy policy
   */
  deletePrivacyPolicy: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${PRIVACY_POLICY_ENDPOINT}/${id}`);
  }
};

export default privacyPolicyApi; 