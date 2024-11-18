import api from './api';

// Constants untuk query parameters
const DEFAULT_FIELDS = [
  'id',
  'title',
  'image_id',
  'artist_display',
  'date_display',
  'medium_display',
  'description',
  'department_title',
  'artist_title',
  'place_of_origin',
  'dimensions',
  'credit_line',
  'publication_history',
  'exhibition_history',
  'provenance_text',
  'thumbnail'
].join(',');

const DEFAULT_LIMIT = 20;

// Fungsi helper untuk error handling
const handleApiError = (error, context) => {
  const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
  const statusCode = error.response?.status || 'N/A';
  const url = error.config?.url || 'N/A';
  console.error(`Error in ${context}: ${errorMessage} (Status: ${statusCode}, URL: ${url})`);
  throw {
    message: errorMessage,
    context,
    statusCode,
    url,
    originalError: error
  };
};

// Get daftar artwork dengan pagination
export const getArtworks = async (page = 1, limit = DEFAULT_LIMIT, fields = DEFAULT_FIELDS) => {
  try {
    const response = await api.get('/artworks', {
      params: {
        page,
        limit,
        fields,
      },
    });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getArtworks');
  }
};

// Get detail artwork berdasarkan ID
export const getArtworkDetail = async (id) => {
  try {
    const response = await api.get(`/artworks/${id}`, {
      params: {
        fields: DEFAULT_FIELDS,
      },
    });
    return {
      data: response.data.data,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getArtworkDetail');
  }
};

// Search artwork berdasarkan query
export const searchArtworks = async (query, page = 1, limit = DEFAULT_LIMIT) => {
  try {
    const response = await api.get('/artworks/search', {
      params: {
        q: query,
        page,
        limit,
        fields: DEFAULT_FIELDS,
      },
    });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'searchArtworks');
  }
};

// Get artwork berdasarkan department/gallery
export const getGalleryArtworks = async (page = 1, limit = DEFAULT_LIMIT, department_id = null) => {
  try {
    const params = {
      page,
      limit,
      fields: DEFAULT_FIELDS,
    };

    if (department_id) {
      params.department_id = department_id;
    }

    const response = await api.get('/artworks', {
      params
    });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getGalleryArtworks');
  }
};

// Get artwork berdasarkan filter tertentu
export const getFilteredArtworks = async ({
  page = 1,
  limit = DEFAULT_LIMIT,
  dateStart,
  dateEnd,
  artistId,
  styleId,
  categoryId,
}) => {
  try {
    const params = {
      page,
      limit,
      fields: DEFAULT_FIELDS,
    };

    if (dateStart) params.date_start = dateStart;
    if (dateEnd) params.date_end = dateEnd;
    if (artistId) params.artist_id = artistId;
    if (styleId) params.style_id = styleId;
    if (categoryId) params.category_id = categoryId;

    const response = await api.get('/artworks', { params });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getFilteredArtworks');
  }
};

// Get artwork yang sedang dipamerkan
export const getFeaturedArtworks = async (limit = DEFAULT_LIMIT) => {
  try {
    const response = await api.get('/artworks', {
      params: {
        limit,
        fields: DEFAULT_FIELDS,
        is_on_view: true,
      },
    });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getFeaturedArtworks');
  }
};

// Get artwork berdasarkan array ID
export const getMultipleArtworks = async (ids = []) => {
  try {
    if (!ids.length) return { data: [] };

    const response = await api.get('/artworks', {
      params: {
        ids: ids.join('|'),
        fields: DEFAULT_FIELDS,
      },
    });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getMultipleArtworks');
  }
};

// Get daftar kategori/department
export const getDepartments = async () => {
  try {
    const response = await api.get('/departments'); // Endpoint yang benar
    return {
      data: response.data.data,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getDepartments');
  }
};

// Get artwork berdasarkan geolocation
export const getArtworksByLocation = async (latitude, longitude, radius = 10) => {
  try {
    const params = {
      fields: DEFAULT_FIELDS,
      lat: latitude,
      lon: longitude,
      radius
    };

    const response = await api.get('/artworks/search', { params });
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      info: response.data.info
    };
  } catch (error) {
    handleApiError(error, 'getArtworksByLocation');
  }
};

export default {
  getArtworks,
  getArtworkDetail,
  searchArtworks,
  getGalleryArtworks,
  getFilteredArtworks,
  getFeaturedArtworks,
  getMultipleArtworks,
  getDepartments,
  getArtworksByLocation
};
