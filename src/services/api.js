import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1';
const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
      console.error('API Error Headers:', error.response.headers);
    } else if (error.request) {
      console.error('API Error Request:', error.request);
    } else {
      console.error('API Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (imageId, size = '843,1000') => {
  if (!imageId) return null;
  return `${IMAGE_BASE_URL}/${imageId}/full/${size}/0/default.jpg`;
};

export const getThumbnailUrl = (imageId) => {
  if (!imageId) return null;
  return getImageUrl(imageId, '200,200');
};

export const getHighResUrl = (imageId) => {
  if (!imageId) return null;
  return getImageUrl(imageId, '1686,2000');
};

export const API_ENDPOINTS = {
  ARTWORKS: '/artworks',
  ARTWORK_DETAIL: (id) => `/artworks/${id}`,
  SEARCH: '/artworks/search',
  DEPARTMENTS: '/departments',
  EXHIBITIONS: '/exhibitions',
  ARTISTS: '/artists',
};

export default api;
