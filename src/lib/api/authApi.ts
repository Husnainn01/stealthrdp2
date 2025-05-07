import apiClient from './apiClient';

// Define the endpoints
const AUTH_ENDPOINT = '/auth';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'superadmin';
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  role: string;
  token: string;
}

export interface ProfileResponse {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

/**
 * Auth API Service
 */
export const authApi = {
  /**
   * Login with username/email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(`${AUTH_ENDPOINT}/login`, credentials);
  },

  /**
   * Register a new admin user (superadmin only)
   */
  register: async (userData: RegisterCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(`${AUTH_ENDPOINT}/register`, userData);
  },

  /**
   * Get admin profile
   */
  getProfile: async (): Promise<ProfileResponse> => {
    return apiClient.get<ProfileResponse>(`${AUTH_ENDPOINT}/profile`);
  }
};

export default authApi; 