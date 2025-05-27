import apiClient from './apiClient';
import { IBlog, BlogCategory } from '../models/Blog';

// Define the endpoints
const BLOGS_ENDPOINT = '/blogs';

// Define blog without _id for create operations
type BlogCreateData = Omit<IBlog, '_id' | 'createdAt' | 'updatedAt'>;

// Define blog update data
type BlogUpdateData = Partial<BlogCreateData>;

/**
 * Blog API Service
 */
export const blogApi = {
  /**
   * Get all blogs or filter by category
   */
  getAllBlogs: async (category?: BlogCategory): Promise<IBlog[]> => {
    const endpoint = category
      ? `${BLOGS_ENDPOINT}?category=${category}`
      : BLOGS_ENDPOINT;
      
    return apiClient.get<IBlog[]>(endpoint);
  },

  /**
   * Get published blogs
   */
  getPublishedBlogs: async (category?: BlogCategory): Promise<IBlog[]> => {
    const baseEndpoint = `${BLOGS_ENDPOINT}/published`;
    const endpoint = category
      ? `${baseEndpoint}?category=${category}`
      : baseEndpoint;
      
    return apiClient.get<IBlog[]>(endpoint);
  },

  /**
   * Get a blog by ID
   */
  getBlogById: async (id: string): Promise<IBlog> => {
    return apiClient.get<IBlog>(`${BLOGS_ENDPOINT}/${id}`);
  },

  /**
   * Get a blog by slug
   */
  getBlogBySlug: async (slug: string): Promise<IBlog> => {
    return apiClient.get<IBlog>(`${BLOGS_ENDPOINT}/slug/${slug}`);
  },

  /**
   * Create a new blog
   */
  createBlog: async (blogData: BlogCreateData): Promise<IBlog> => {
    return apiClient.post<IBlog>(BLOGS_ENDPOINT, blogData);
  },

  /**
   * Update a blog
   */
  updateBlog: async (id: string, blogData: BlogUpdateData): Promise<IBlog> => {
    return apiClient.put<IBlog>(`${BLOGS_ENDPOINT}/${id}`, blogData);
  },

  /**
   * Delete a blog
   */
  deleteBlog: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`${BLOGS_ENDPOINT}/${id}`);
  },

  /**
   * Upload blog image
   * 
   * Note: For file uploads, we'll need to handle this differently
   * since our apiClient doesn't directly support multipart/form-data.
   * This is a custom implementation using fetch directly.
   */
  uploadImage: async (formData: FormData): Promise<{ imageUrl: string }> => {
    const token = localStorage.getItem('auth_token');
    
    // Ensure proper URL construction with no double slashes
    const baseUrl = process.env.VITE_API_URL || 'https://web-production-40fb0.up.railway.app/api' || 'http://localhost:5001/api';
    const url = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/blogs/upload-image`;
    
    console.log('Uploading to URL:', url);
    
    try {
      // For file uploads, don't set Content-Type as the browser will set it automatically with boundary
      const response = await fetch(url, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
        body: formData,
        // Add these options for better error handling
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorObj;
        try {
          errorObj = JSON.parse(errorText);
        } catch (e) {
          throw new Error(`Server returned ${response.status}: ${errorText}`);
        }
        throw new Error(errorObj.message || `Server error: ${response.status}`);
      }
      
      return response.json();
    } catch (err) {
      console.error('Network or server error during upload:', err);
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error('Network connection error. Please check your internet connection.');
      }
      throw err;
    }
  }
};

export default blogApi; 