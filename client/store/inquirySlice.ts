import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';
import { Inquiry, ApiResponse, Pagination } from '../lib/types';

interface InquiryState {
  inquiries: Inquiry[];
  currentInquiry: Inquiry | null;
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InquiryState = {
  inquiries: [],
  currentInquiry: null,
  pagination: null,
  isLoading: false,
  error: null,
};

// Create inquiry
export const createInquiry = createAsyncThunk(
  'inquiries/createInquiry',
  async (inquiryData: {
    propertyId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const response = await api.post<ApiResponse<{ id: string; status: string; message: string }>>('/inquiries', inquiryData);
    return response.data.data;
  }
);

// Get user inquiries
export const getUserInquiries = createAsyncThunk(
  'inquiries/getUserInquiries',
  async (params: { page?: string; limit?: string } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ inquiries: Inquiry[]; pagination: Pagination }>>(`/inquiries?${queryParams}`);
    return response.data.data;
  }
);

// Get specific inquiry
export const getInquiry = createAsyncThunk(
  'inquiries/getInquiry',
  async (id: string) => {
    const response = await api.get<ApiResponse<Inquiry>>(`/inquiries/${id}`);
    return response.data.data;
  }
);

const inquirySlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    clearCurrentInquiry: (state) => {
      state.currentInquiry = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearInquiries: (state) => {
      state.inquiries = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create inquiry
      .addCase(createInquiry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create inquiry';
      })
      // Get user inquiries
      .addCase(getUserInquiries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inquiries = action.payload!.inquiries;
        state.pagination = action.payload!.pagination;
      })
      .addCase(getUserInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch inquiries';
      })
      // Get specific inquiry
      .addCase(getInquiry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentInquiry = action.payload!;
      })
      .addCase(getInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch inquiry';
      });
  },
});

export const { clearCurrentInquiry, clearError, clearInquiries } = inquirySlice.actions;
export default inquirySlice.reducer;