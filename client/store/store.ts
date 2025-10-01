import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import propertySlice from './propertySlice';
import appointmentSlice from './appointmentSlice';
import inquirySlice from './inquirySlice';
import adminSlice from './adminSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    properties: propertySlice,
    appointments: appointmentSlice,
    inquiries: inquirySlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;