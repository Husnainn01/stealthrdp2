import apiClient from './apiClient';

// Define the endpoints
const MEDIA_ENDPOINT = '/media';

// Define media item interface
export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
  folder: string;
}

/**
 * Media API Service
 */
export const mediaApi = {
  /**
   * Get all media items
   */
  getAllMedia: async (): Promise<MediaItem[]> => {
    return apiClient.get<MediaItem[]>(MEDIA_ENDPOINT);
  },

  /**
   * Get media by folder
   */
  getMediaByFolder: async (folder: string): Promise<MediaItem[]> => {
    return apiClient.get<MediaItem[]>(`${MEDIA_ENDPOINT}?folder=${folder}`);
  },

  /**
   * Delete media item
   */
  deleteMedia: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${MEDIA_ENDPOINT}/${id}`);
  },

  /**
   * Batch delete multiple media items
   */
  batchDeleteMedia: async (ids: string[]): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>(`${MEDIA_ENDPOINT}/batch-delete`, { ids });
  },

  /**
   * Get media counts by folder
   */
  getMediaCounts: async (): Promise<Record<string, number>> => {
    return apiClient.get<Record<string, number>>(`${MEDIA_ENDPOINT}/counts`);
  }
};

export default mediaApi; 