import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';
import { Property, ApiResponse, Pagination, PropertyFilters } from '../lib/types';

interface PropertyState {
  properties: Property[];
  currentProperty: Property | null;
  favorites: Property[];
  pagination: Pagination | null;
  filters: PropertyFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  currentProperty: null,
  favorites: [],
  pagination: null,
  filters: {},
  isLoading: false,
  error: null,
};

// Get properties with filters
export const getProperties = createAsyncThunk(
  'properties/getProperties',
  async (filters: PropertyFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ properties: Property[]; pagination: Pagination }>>(`/properties?${params}`);
    return response.data.data;
  }
);

// Get single property
export const getProperty = createAsyncThunk(
  'properties/getProperty',
  async (id: string) => {
    const response = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  }
);

// Search properties
export const searchProperties = createAsyncThunk(
  'properties/searchProperties',
  async (searchData: { q: string; category?: string; type?: string; page?: string; limit?: string }) => {
    const params = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ properties: Property[]; pagination: Pagination }>>(`/properties/search?${params}`);
    return response.data.data;
  }
);

// Toggle favorite
export const toggleFavorite = createAsyncThunk(
  'properties/toggleFavorite',
  async (propertyId: string) => {
    const response = await api.post<ApiResponse<{ isFavorite: boolean }>>(`/properties/${propertyId}/favorite`);
    return { propertyId, isFavorite: response.data.data!.isFavorite };
  }
);

// Get user favorites
export const getUserFavorites = createAsyncThunk(
  'properties/getUserFavorites',
  async (params: { page?: string; limit?: string } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ properties: Property[]; pagination: Pagination }>>(`/properties/user/favorites?${queryParams}`);
    return response.data.data;
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get properties
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload!.properties;
        state.pagination = action.payload!.pagination;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      })
      // Get single property
      .addCase(getProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProperty = action.payload!;
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch property';
      })
      // Search properties
      .addCase(searchProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload!.properties;
        state.pagination = action.payload!.pagination;
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Search failed';
      })
      // Toggle favorite
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { propertyId, isFavorite } = action.payload;
        
        // Update in properties list
        const property = state.properties.find(p => p.id === propertyId);
        if (property) {
          property.isFavorite = isFavorite;
        }
        
        // Update current property
        if (state.currentProperty?.id === propertyId) {
          state.currentProperty.isFavorite = isFavorite;
        }
        
        // Update favorites list
        if (isFavorite) {
          // Add to favorites if not already there
          const existsInFavorites = state.favorites.find(f => f.id === propertyId);
          if (!existsInFavorites && property) {
            state.favorites.push(property);
          }
        } else {
          // Remove from favorites
          state.favorites = state.favorites.filter(f => f.id !== propertyId);
        }
      })
      // Get user favorites
      .addCase(getUserFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload!.properties;
        state.pagination = action.payload!.pagination;
      })
      .addCase(getUserFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      });
  },
});

export const { clearCurrentProperty, setFilters, clearError } = propertySlice.actions;
export default propertySlice.reducer;