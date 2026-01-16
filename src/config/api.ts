// Environment configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// Alternative URLs to try if main one fails
export const FALLBACK_URLS = [
  'http://localhost:8000/api',
  'http://127.0.0.1:8000/api',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];

export const getApiUrl = (): string => {
  return API_CONFIG.BASE_URL;
};
