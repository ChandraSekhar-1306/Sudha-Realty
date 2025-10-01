import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';
import { Appointment, ApiResponse } from '../lib/types';

interface AppointmentState {
  appointments: Appointment[];
  currentAppointment: Appointment | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  currentAppointment: null,
  isLoading: false,
  error: null,
};

// Create appointment
export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData: { name: string; email: string; phone: string; message?: string }) => {
    const response = await api.post<ApiResponse<{ id: string; status: string; message: string }>>('/appointments', appointmentData);
    return response.data.data;
  }
);

// Get user appointments
export const getUserAppointments = createAsyncThunk(
  'appointments/getUserAppointments',
  async () => {
    const response = await api.get<ApiResponse<Appointment[]>>('/appointments');
    return response.data.data;
  }
);

// Get specific appointment
export const getAppointment = createAsyncThunk(
  'appointments/getAppointment',
  async (id: string) => {
    const response = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
    return response.data.data;
  }
);

// Cancel appointment
export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (id: string) => {
    const response = await api.patch<ApiResponse<Appointment>>(`/appointments/${id}/cancel`);
    return response.data.data;
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create appointment';
      })
      // Get user appointments
      .addCase(getUserAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload!;
      })
      .addCase(getUserAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch appointments';
      })
      // Get specific appointment
      .addCase(getAppointment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentAppointment = action.payload!;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch appointment';
      })
      // Cancel appointment
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const updatedAppointment = action.payload!;
        state.appointments = state.appointments.map(app => 
          app.id === updatedAppointment.id ? updatedAppointment : app
        );
        if (state.currentAppointment?.id === updatedAppointment.id) {
          state.currentAppointment = updatedAppointment;
        }
      });
  },
});

export const { clearCurrentAppointment, clearError } = appointmentSlice.actions;
export default appointmentSlice.reducer;