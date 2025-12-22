import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

// Types for the API instance
interface ApiConfig {
  baseURL: string;
  timeout?: number;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

// Create axios instance with default configuration
const createApiInstance = (config: ApiConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    timeout: config.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for adding auth token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get token from localStorage (in a real app, consider using httpOnly cookies)
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      // Add request timestamp for debugging
      if (process.env.NODE_ENV === 'development') {
        (config as any).metadata = { startTime: new Date() };
      }
      
      return config;
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling auth and errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response time in development
      if (process.env.NODE_ENV === 'development' && (response.config as any).metadata) {
        const endTime = new Date();
        const duration = endTime.getTime() - (response.config as any).metadata.startTime.getTime();
        console.log(`API Call: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
      }
      
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized - token refresh
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const response = await axios.post(`${instance.defaults.baseURL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            
            // Update tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            // Retry the original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          
          return Promise.reject(refreshError);
        }
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error:', error.message);
        return Promise.reject(new Error('Network error. Please check your connection.'));
      }

      // Handle other HTTP errors
      const errorMessage = (error.response?.data as any)?.message || error.message || 'An unexpected error occurred';
      console.error('API Error:', {
        status: error.response?.status,
        message: errorMessage,
        url: error.config?.url,
      });

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create the main API instance
export const apiClient = createApiInstance({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

// Helper function to set auth tokens
export const setAuthTokens = (tokens: AuthToken) => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Helper function to clear auth tokens
export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Helper function to get current access token
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Export configured instance as default
export default apiClient;