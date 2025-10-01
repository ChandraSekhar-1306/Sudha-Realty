// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { api } from '../lib/api';
// import { Appointment, Inquiry, Property, User, ApiResponse, Pagination } from '../lib/types';

// interface AdminState {
//   dashboardData: {
//     stats: {
//       totalProperties: number;
//       totalAppointments: number;
//       totalInquiries: number;
//       totalUsers: number;
//       pendingAppointments: number;
//       pendingInquiries: number;
//       availableProperties: number;
//       soldProperties: number;
//     } | null;
//     recentActivities: {
//       appointments: Appointment[];
//       inquiries: Inquiry[];
//       properties: Property[];
//     } | null;
//   };
//   appointments: Appointment[];
//   inquiries: Inquiry[];
//   properties: Property[];
//   users: User[];
//   pagination: Pagination | null;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: AdminState = {
//   dashboardData: {
//     stats: null,
//     recentActivities: null,
//   },
//   appointments: [],
//   inquiries: [],
//   properties: [],
//   users: [],
//   pagination: null,
//   isLoading: false,
//   error: null,
// };

// // Get dashboard data
// export const getDashboard = createAsyncThunk(
//   'admin/getDashboard',
//   async () => {
//     const response = await api.get<ApiResponse<AdminState['dashboardData']>>('/admin/dashboard');
//     return response.data.data;
//   }
// );

// // Get all appointments
// export const getAppointments = createAsyncThunk(
//   'admin/getAppointments',
//   async (params: { status?: string; page?: string; limit?: string } = {}) => {
//     const queryParams = new URLSearchParams();
//     Object.entries(params).forEach(([key, value]) => {
//       if (value) queryParams.append(key, value);
//     });
    
//     const response = await api.get<ApiResponse<{ appointments: Appointment[]; pagination: Pagination }>>(`/admin/appointments?${queryParams}`);
//     return response.data.data;
//   }
// );

// // Update appointment status
// export const updateAppointmentStatus = createAsyncThunk(
//   'admin/updateAppointmentStatus',
//   async (params: {
//     id: string;
//     status: string;
//     scheduledAt?: string;
//     rejectionReason?: string;
//   }) => {
//     const { id, ...data } = params;
//     const response = await api.patch<ApiResponse<Appointment>>(`/admin/appointments/${id}/status`, data);
//     return response.data.data;
//   }
// );

// // Get all inquiries
// export const getInquiries = createAsyncThunk(
//   'admin/getInquiries',
//   async (params: { status?: string; page?: string; limit?: string } = {}) => {
//     const queryParams = new URLSearchParams();
//     Object.entries(params).forEach(([key, value]) => {
//       if (value) queryParams.append(key, value);
//     });
    
//     const response = await api.get<ApiResponse<{ inquiries: Inquiry[]; pagination: Pagination }>>(`/admin/inquiries?${queryParams}`);
//     return response.data.data;
//   }
// );

// // Respond to inquiry
// export const respondToInquiry = createAsyncThunk(
//   'admin/respondToInquiry',
//   async (params: { id: string; response: string; status?: string }) => {
//     const { id, ...data } = params;
//     const response = await api.post<ApiResponse<Inquiry>>(`/admin/inquiries/${id}/respond`, data);
//     return response.data.data;
//   }
// );

// // Create property
// export const createProperty = createAsyncThunk(
//   'admin/createProperty',
//   async (formData: FormData) => {
//     const response = await api.post<ApiResponse<Property>>('/admin/properties', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data.data;
//   }
// );

// // Update property
// export const updateProperty = createAsyncThunk(
//   'admin/updateProperty',
//   async (params: { id: string; formData: FormData }) => {
//     const { id, formData } = params;
//     const response = await api.put<ApiResponse<Property>>(`/admin/properties/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data.data;
//   }
// );

// // Delete property
// export const deleteProperty = createAsyncThunk(
//   'admin/deleteProperty',
//   async (id: string) => {
//     await api.delete(`/admin/properties/${id}`);
//     return id;
//   }
// );

// // Get all users
// export const getUsers = createAsyncThunk(
//   'admin/getUsers',
//   async (params: { page?: string; limit?: string } = {}) => {
//     const queryParams = new URLSearchParams();
//     Object.entries(params).forEach(([key, value]) => {
//       if (value) queryParams.append(key, value);
//     });
    
//     const response = await api.get<ApiResponse<{ users: User[]; pagination: Pagination }>>(`/admin/users?${queryParams}`);
//     return response.data.data;
//   }
// );

// const adminSlice = createSlice({
//   name: 'admin',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Dashboard
//       .addCase(getDashboard.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getDashboard.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.dashboardData = action.payload!;
//       })
//       .addCase(getDashboard.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Failed to fetch dashboard data';
//       })
//       // Appointments
//       .addCase(getAppointments.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getAppointments.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.appointments = action.payload!.appointments;
//         state.pagination = action.payload!.pagination;
//       })
//       .addCase(getAppointments.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Failed to fetch appointments';
//       })
//       // Update appointment status
//       .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
//         const updatedAppointment = action.payload!;
//         state.appointments = state.appointments.map(app =>
//           app.id === updatedAppointment.id ? updatedAppointment : app
//         );
//       })
//       // Inquiries
//       .addCase(getInquiries.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getInquiries.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.inquiries = action.payload!.inquiries;
//         state.pagination = action.payload!.pagination;
//       })
//       .addCase(getInquiries.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Failed to fetch inquiries';
//       })
//       // Respond to inquiry
//       .addCase(respondToInquiry.fulfilled, (state, action) => {
//         const updatedInquiry = action.payload!;
//         state.inquiries = state.inquiries.map(inq =>
//           inq.id === updatedInquiry.id ? updatedInquiry : inq
//         );
//       })
//       // Create property
//       .addCase(createProperty.fulfilled, (state, action) => {
//         state.properties.unshift(action.payload!);
//       })
//       // Update property
//       .addCase(updateProperty.fulfilled, (state, action) => {
//         const updatedProperty = action.payload!;
//         state.properties = state.properties.map(prop =>
//           prop.id === updatedProperty.id ? updatedProperty : prop
//         );
//       })
//       // Delete property
//       .addCase(deleteProperty.fulfilled, (state, action) => {
//         const deletedId = action.payload;
//         state.properties = state.properties.filter(prop => prop.id !== deletedId);
//       })
//       // Users
//       .addCase(getUsers.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getUsers.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.users = action.payload!.users;
//         state.pagination = action.payload!.pagination;
//       })
//       .addCase(getUsers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Failed to fetch users';
//       });
//   },
// });

// export const { clearError } = adminSlice.actions;
// export default adminSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';
import { Appointment, Inquiry, Property, User, ApiResponse, Pagination } from '../lib/types';

interface AdminState {
  dashboardData: {
    stats: {
      totalProperties: number;
      totalAppointments: number;
      totalInquiries: number;
      totalUsers: number;
      pendingAppointments: number;
      pendingInquiries: number;
      availableProperties: number;
      soldProperties: number;
    } | null;
    recentActivities: {
      appointments: Appointment[];
      inquiries: Inquiry[];
      properties: Property[];
    } | null;
  };
  appointments: Appointment[];
  inquiries: Inquiry[];
  properties: Property[];
  users: User[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  dashboardData: {
    stats: null,
    recentActivities: null,
  },
  appointments: [],
  inquiries: [],
  properties: [],
  users: [],
  pagination: null,
  isLoading: false,
  error: null,
};

// Get dashboard data
export const getDashboard = createAsyncThunk(
  'admin/getDashboard',
  async () => {
    const response = await api.get<ApiResponse<AdminState['dashboardData']>>('/admin/dashboard');
    return response.data.data;
  }
);

// Get all properties (for admin management)
export const getProperties = createAsyncThunk(
  'admin/getProperties',
  async (params: {
    category?: string;
    type?: string;
    status?: string;
    minPrice?: string;
    maxPrice?: string;
    location?: string;
    bedrooms?: string;
    bathrooms?: string;
    page?: string;
    limit?: string;
  } = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add all filter parameters to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    // Default to showing more properties per page for admin
    if (!params.limit) {
      queryParams.append('limit', '50');
    }
    
    const response = await api.get<ApiResponse<{
      properties: Property[];
      pagination: Pagination;
      filters: any;
    }>>(`/properties?${queryParams}`);
    
    return response.data.data;
  }
);

// Get all appointments
export const getAppointments = createAsyncThunk(
  'admin/getAppointments',
  async (params: { status?: string; page?: string; limit?: string } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ appointments: Appointment[]; pagination: Pagination }>>(`/admin/appointments?${queryParams}`);
    return response.data.data;
  }
);

// Update appointment status
export const updateAppointmentStatus = createAsyncThunk(
  'admin/updateAppointmentStatus',
  async (params: {
    id: string;
    status: string;
    scheduledAt?: string;
    rejectionReason?: string;
  }) => {
    const { id, ...data } = params;
    const response = await api.patch<ApiResponse<Appointment>>(`/admin/appointments/${id}/status`, data);
    return response.data.data;
  }
);

// Get all inquiries
export const getInquiries = createAsyncThunk(
  'admin/getInquiries',
  async (params: { status?: string; page?: string; limit?: string } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ inquiries: Inquiry[]; pagination: Pagination }>>(`/admin/inquiries?${queryParams}`);
    return response.data.data;
  }
);

// Respond to inquiry
export const respondToInquiry = createAsyncThunk(
  'admin/respondToInquiry',
  async (params: { id: string; response: string; status?: string }) => {
    const { id, ...data } = params;
    const response = await api.post<ApiResponse<Inquiry>>(`/admin/inquiries/${id}/respond`, data);
    return response.data.data;
  }
);

// Create property
export const createProperty = createAsyncThunk(
  'admin/createProperty',
  async (formData: FormData) => {
    
    const response = await api.post<ApiResponse<Property>>('/admin/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }
);

// Update property
export const updateProperty = createAsyncThunk(
  'admin/updateProperty',
  async (params: { id: string; formData: FormData }) => {
    const { id, formData } = params;
    const response = await api.put<ApiResponse<Property>>(`/admin/properties/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }
);

// Delete property
export const deleteProperty = createAsyncThunk(
  'admin/deleteProperty',
  async (id: string) => {
    await api.delete(`/admin/properties/${id}`);
    return id;
  }
);

// Get all users
export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (params: { page?: string; limit?: string } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await api.get<ApiResponse<{ users: User[]; pagination: Pagination }>>(`/admin/users?${queryParams}`);
    return response.data.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload!;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch dashboard data';
      })
      // Properties
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
      // Appointments
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload!.appointments;
        state.pagination = action.payload!.pagination;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch appointments';
      })
      // Update appointment status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const updatedAppointment = action.payload!;
        state.appointments = state.appointments.map(app =>
          app.id === updatedAppointment.id ? updatedAppointment : app
        );
      })
      // Inquiries
      .addCase(getInquiries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inquiries = action.payload!.inquiries;
        state.pagination = action.payload!.pagination;
      })
      .addCase(getInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch inquiries';
      })
      // Respond to inquiry
      .addCase(respondToInquiry.fulfilled, (state, action) => {
        const updatedInquiry = action.payload!;
        state.inquiries = state.inquiries.map(inq =>
          inq.id === updatedInquiry.id ? updatedInquiry : inq
        );
      })
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties.unshift(action.payload!);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create property";
      })
      // Update property
      .addCase(updateProperty.fulfilled, (state, action) => {
        const updatedProperty = action.payload!;
        state.properties = state.properties.map(prop =>
          prop.id === updatedProperty.id ? updatedProperty : prop
        );
      })
      // Delete property
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.properties = state.properties.filter(prop => prop.id !== deletedId);
      })
      // Users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload!.users;
        state.pagination = action.payload!.pagination;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;