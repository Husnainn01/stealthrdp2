import apiClient from './apiClient';
import { IFeature } from '../models/Feature';

// Define the endpoints
const FEATURES_ENDPOINT = '/features';

// Define feature without _id for create operations
type FeatureCreateData = Omit<IFeature, '_id' | 'createdAt' | 'updatedAt'>;

// Define feature update data
type FeatureUpdateData = Partial<FeatureCreateData>;

/**
 * Feature API Service
 */
export const featureApi = {
  /**
   * Get all features or filter by category
   */
  getFeatures: async (category?: string): Promise<IFeature[]> => {
    const endpoint = category && category !== 'all'
      ? `${FEATURES_ENDPOINT}?category=${category}`
      : FEATURES_ENDPOINT;
      
    return apiClient.get<IFeature[]>(endpoint);
  },

  /**
   * Get a feature by ID
   */
  getFeatureById: async (id: string): Promise<IFeature> => {
    return apiClient.get<IFeature>(`${FEATURES_ENDPOINT}/${id}`);
  },

  /**
   * Create a new feature
   */
  createFeature: async (featureData: FeatureCreateData): Promise<IFeature> => {
    return apiClient.post<IFeature>(FEATURES_ENDPOINT, featureData);
  },

  /**
   * Update a feature
   */
  updateFeature: async (id: string, featureData: FeatureUpdateData): Promise<IFeature> => {
    return apiClient.put<IFeature>(`${FEATURES_ENDPOINT}/${id}`, featureData);
  },

  /**
   * Delete a feature
   */
  deleteFeature: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${FEATURES_ENDPOINT}/${id}`);
  }
};

export default featureApi; 