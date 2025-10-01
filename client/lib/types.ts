export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  _count: {
    appointments: number;
    inquiries: number;
    favorites: number;
  };
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  area?: string;
  bedrooms?: string;
  bathrooms?: string;
  category: 'FRESH_SALES' | 'RESALE';
  type: 'OPEN_PLOTS' | 'APARTMENTS' | 'VILLAS' | 'FARMLAND';
  images: string[];
  features: string[];
  coordinates?: {
    lat: string;
    lng: string;
  };
  isFavorite?:boolean;

  
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  meetingLink?: string;
  scheduledAt?: string;
  createdAt: string;
  user?: User;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'PENDING' | 'RESPONDED' | 'CLOSED';
  createdAt: string;
  property?: Property;
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PropertyFilters {
  category?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  bedrooms?: string;
  bathrooms?: string;
  page?: string;
  limit?: string;
}