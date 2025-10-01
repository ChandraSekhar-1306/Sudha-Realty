import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';
import { User, Admin, ApiResponse } from '../lib/types';

interface AuthState {
  user: User | null;
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  admin: null,
  token: null,
  isLoading: false,
  error: null,
};

// User authentication
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (userData: { name?: string; email: string; password: string }) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/users/auth', userData);
    return response.data.data;
  }
);

// Admin login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<{ admin: Admin; token: string }>>('/admin/login', credentials);
    return response.data.data;
  }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async () => {
    const response = await api.get<ApiResponse<User>>('/users/profile');
    return response.data.data;
  }
);

// Get admin profile
export const getAdminProfile = createAsyncThunk(
  'auth/getAdminProfile',
  async () => {
    const response = await api.get<ApiResponse<Admin>>('/admin/profile');
    return response.data.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.admin = null;
      state.token = null;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    loadFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const admin = localStorage.getItem('admin');
        
        if (token) {
          state.token = token;
        }
        if (user) {
          state.user = JSON.parse(user);
        }
        if (admin) {
          state.admin = JSON.parse(admin);
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // User authentication
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload!.user;
        state.token = action.payload!.token;
        state.admin = null;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload!.token);
          localStorage.setItem('user', JSON.stringify(action.payload!.user));
          localStorage.removeItem('admin');
        }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Authentication failed';
      })
      // Admin login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload!.admin;
        state.token = action.payload!.token;
        state.user = null;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload!.token);
          localStorage.setItem('admin', JSON.stringify(action.payload!.admin));
          localStorage.removeItem('user');
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Get user profile
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload!;
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload!));
        }
      })
      // Get admin profile
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.admin = action.payload!;
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin', JSON.stringify(action.payload!));
        }
      });
  },
});

export const { logout, clearError, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;