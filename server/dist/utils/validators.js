"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.uuidSchema = exports.paginationSchema = exports.inquiryResponseSchema = exports.updateAppointmentStatusSchema = exports.propertyFiltersSchema = exports.createInquirySchema = exports.updatePropertySchema = exports.createPropertySchema = exports.createAppointmentSchema = exports.adminLoginSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// User registration/creation validation
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).optional(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    phone: joi_1.default.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).optional(),
});
// Admin login validation
exports.adminLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
// Appointment creation validation
exports.createAppointmentSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).required(),
    message: joi_1.default.string().max(500).optional(),
});
// Property creation validation
exports.createPropertySchema = joi_1.default.object({
    title: joi_1.default.string().min(5).max(100).required(),
    description: joi_1.default.string().min(10).required(),
    price: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    area: joi_1.default.string().optional(),
    bedrooms: joi_1.default.string().optional(),
    bathrooms: joi_1.default.string().optional(),
    category: joi_1.default.string().valid('FRESH_SALES', 'RESALE').required(),
    type: joi_1.default.string().valid('OPEN_PLOTS', 'APARTMENTS', 'VILLAS', 'FARMLAND').required(),
    features: joi_1.default.array().items(joi_1.default.string().max(50)).optional(),
    coordinates: joi_1.default.object({
        lat: joi_1.default.string().optional(),
        lng: joi_1.default.string().optional(),
    }).optional(),
});
// Property update validation
exports.updatePropertySchema = joi_1.default.object({
    title: joi_1.default.string().min(5).max(100).optional(),
    description: joi_1.default.string().min(10).max(2000).optional(),
    price: joi_1.default.string().optional(),
    location: joi_1.default.string().min(5).max(100).optional(),
    area: joi_1.default.string().optional(),
    bedrooms: joi_1.default.string().optional(),
    bathrooms: joi_1.default.string().optional(),
    category: joi_1.default.string().valid('FRESH_SALES', 'RESALE').optional(),
    type: joi_1.default.string().valid('OPEN_PLOTS', 'APARTMENTS', 'VILLAS', 'FARMLAND').optional(),
    status: joi_1.default.string().valid('AVAILABLE', 'SOLD', 'RESERVED').optional(),
    features: joi_1.default.array().items(joi_1.default.string().max(50)).optional(),
    coordinates: joi_1.default.object({
        lat: joi_1.default.string().required(),
        lng: joi_1.default.string().required(),
    }).optional(),
});
// Inquiry creation validation
exports.createInquirySchema = joi_1.default.object({
    propertyId: joi_1.default.string().uuid().required(),
    name: joi_1.default.string().min(2).max(50).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().pattern(/^[+]?[\d\s\-()]+$/).min(10).max(15).required(),
    message: joi_1.default.string().min(10).max(1000).required(),
});
// Property filters validation
exports.propertyFiltersSchema = joi_1.default.object({
    category: joi_1.default.string().valid('FRESH_SALES', 'RESALE').optional(),
    type: joi_1.default.string().valid('OPEN_PLOTS', 'APARTMENTS', 'VILLAS', 'FARMLAND').optional(),
    minPrice: joi_1.default.number().positive().optional(),
    maxPrice: joi_1.default.number().positive().optional(),
    location: joi_1.default.string().max(100).optional(),
    bedrooms: joi_1.default.number().integer().min(0).max(20).optional(),
    bathrooms: joi_1.default.number().integer().min(0).max(20).optional(),
    page: joi_1.default.number().integer().min(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(50).optional(),
});
// Appointment status update validation
exports.updateAppointmentStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED').required(),
    scheduledAt: joi_1.default.date().iso().optional(),
    rejectionReason: joi_1.default.string().max(500).optional(),
});
// Inquiry response validation
exports.inquiryResponseSchema = joi_1.default.object({
    response: joi_1.default.string().min(10).max(1000).required(),
    status: joi_1.default.string().valid('RESPONDED', 'CLOSED').optional(),
});
// Pagination validation
exports.paginationSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(50).default(10),
});
// UUID validation
exports.uuidSchema = joi_1.default.string().uuid();
// Validation helper function
const validateSchema = (schema, data) => {
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
exports.validateSchema = validateSchema;
