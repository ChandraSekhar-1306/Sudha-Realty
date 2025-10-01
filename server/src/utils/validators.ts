import Joi from 'joi';

// User registration/creation validation
export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).optional(),
});

// Admin login validation
export const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Appointment creation validation
export const createAppointmentSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).required(),
  message: Joi.string().max(500).optional(),
});

// Property creation validation
export const createPropertySchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.string().required(),
  location: Joi.string().required(),
  area: Joi.string().optional(),
  bedrooms: Joi.string().optional(),
  bathrooms: Joi.string().optional(),
  category: Joi.string().valid('FRESH_SALES', 'RESALE').required(),
  type: Joi.string().valid('OPEN_PLOTS', 'APARTMENTS', 'VILLAS', 'FARMLAND').required(),
  features: Joi.array().items(Joi.string().max(50)).optional(),
  coordinates: Joi.object({
    lat: Joi.string().optional(),
    lng: Joi.string().optional(),
  }).optional(),
});

// Property update validation
export const updatePropertySchema = Joi.object({
  title: Joi.string().min(5).max(100).optional(),
  description: Joi.string().min(10).max(2000).optional(),
  price: Joi.string().optional(),
  location: Joi.string().min(5).max(100).optional(),
  area: Joi.string().optional(),
  bedrooms: Joi.string().optional(),
  bathrooms: Joi.string().optional(),
  category: Joi.string().valid('FRESH_SALES', 'RESALE').optional(),
  type: Joi.string().valid('OPEN_PLOTS', 'APARTMENTS', 'VILLAS', 'FARMLAND').optional(),
  status: Joi.string().valid('AVAILABLE', 'SOLD', 'RESERVED').optional(),
  features: Joi.array().items(Joi.string().max(50)).optional(),
  coordinates: Joi.object({
    lat: Joi.string().required(),
    lng: Joi.string().required(),
  }).optional(),
});

// Inquiry creation validation
export const createInquirySchema = Joi.object({
  propertyId: Joi.string().uuid().required(),
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).required(),
  message: Joi.string().min(10).max(1000).required(),
});

// Property filters validation
export const propertyFiltersSchema = Joi.object({
  category: Joi.string().valid('FRESH_SALES', 'RESALE').optional(),
  type: Joi.string().valid('OPEN_PLOTS', 'APARTMENTS', 'VILLAS', 'FARMLAND').optional(),
  minPrice: Joi.number().positive().optional(),
  maxPrice: Joi.number().positive().optional(),
  location: Joi.string().max(100).optional(),
  bedrooms: Joi.number().integer().min(0).max(20).optional(),
  bathrooms: Joi.number().integer().min(0).max(20).optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
});

// Appointment status update validation
export const updateAppointmentStatusSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED').required(),
  scheduledAt: Joi.date().iso().optional(),
  rejectionReason: Joi.string().max(500).optional(),
});

// Inquiry response validation
export const inquiryResponseSchema = Joi.object({
  response: Joi.string().min(10).max(1000).required(),
  status: Joi.string().valid('RESPONDED', 'CLOSED').optional(),
});

// Pagination validation
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});

// UUID validation
export const uuidSchema = Joi.string().uuid();

// Validation helper function
export const validateSchema = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return { isValid: false, errors, data: null };
  }
  
  return { isValid: true, errors: null, data: value };
};