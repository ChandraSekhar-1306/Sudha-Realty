"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const responses_1 = require("../utils/responses");
const auth_1 = require("../middleware/auth");
const emailService_1 = require("../services/emailService");
//import { zoomService } from '../services/zoomService';
const cloudinaryService_1 = require("../services/cloudinaryService");
class AdminController {
    // Admin login
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const admin = yield database_1.prisma.admin.findUnique({
                    where: { email }
                });
                if (!admin) {
                    return (0, responses_1.sendError)(res, 'Invalid credentials', 401);
                }
                const isValidPassword = yield bcryptjs_1.default.compare(password, admin.password);
                if (!isValidPassword) {
                    return (0, responses_1.sendError)(res, 'Invalid credentials', 401);
                }
                const token = (0, auth_1.generateToken)(admin.id, admin.email, 'admin');
                return (0, responses_1.sendSuccess)(res, 'Login successful', {
                    admin: {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email,
                        role: admin.role,
                    },
                    token
                });
            }
            catch (error) {
                console.error('Admin login error:', error);
                return (0, responses_1.sendError)(res, 'Login failed');
            }
        });
    }
    // Get admin dashboard stats
    static getDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                // Get counts
                const [totalProperties, totalAppointments, totalInquiries, totalUsers, pendingAppointments, pendingInquiries, availableProperties, soldProperties] = yield Promise.all([
                    database_1.prisma.property.count(),
                    database_1.prisma.appointment.count(),
                    database_1.prisma.inquiry.count(),
                    database_1.prisma.user.count(),
                    database_1.prisma.appointment.count({ where: { status: 'PENDING' } }),
                    database_1.prisma.inquiry.count({ where: { status: 'PENDING' } }),
                    database_1.prisma.property.count({ where: { status: 'AVAILABLE' } }),
                    database_1.prisma.property.count({ where: { status: 'SOLD' } })
                ]);
                // Get recent activities
                const [recentAppointments, recentInquiries, recentProperties] = yield Promise.all([
                    database_1.prisma.appointment.findMany({
                        take: 5,
                        orderBy: { createdAt: 'desc' },
                        include: {
                            user: {
                                select: { name: true, email: true }
                            }
                        }
                    }),
                    database_1.prisma.inquiry.findMany({
                        take: 5,
                        orderBy: { createdAt: 'desc' },
                        include: {
                            user: {
                                select: { name: true, email: true }
                            },
                            property: {
                                select: { title: true }
                            }
                        }
                    }),
                    database_1.prisma.property.findMany({
                        take: 5,
                        orderBy: { createdAt: 'desc' },
                        select: {
                            id: true,
                            title: true,
                            price: true,
                            location: true,
                            category: true,
                            type: true,
                            status: true,
                            createdAt: true,
                        }
                    })
                ]);
                const dashboardData = {
                    stats: {
                        totalProperties,
                        totalAppointments,
                        totalInquiries,
                        totalUsers,
                        pendingAppointments,
                        pendingInquiries,
                        availableProperties,
                        soldProperties,
                    },
                    recentActivities: {
                        appointments: recentAppointments,
                        inquiries: recentInquiries,
                        properties: recentProperties,
                    }
                };
                return (0, responses_1.sendSuccess)(res, 'Dashboard data retrieved successfully', dashboardData);
            }
            catch (error) {
                console.error('Admin dashboard error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve dashboard data');
            }
        });
    }
    // Get all appointments
    static getAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { status, page = '1', limit = '20' } = req.query;
                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const skip = (pageNum - 1) * limitNum;
                const where = {};
                if (status)
                    where.status = status;
                const [appointments, totalCount] = yield Promise.all([
                    database_1.prisma.appointment.findMany({
                        where,
                        skip,
                        take: limitNum,
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    phone: true,
                                }
                            }
                        },
                        orderBy: { createdAt: 'desc' }
                    }),
                    database_1.prisma.appointment.count({ where })
                ]);
                const totalPages = Math.ceil(totalCount / limitNum);
                return (0, responses_1.sendSuccess)(res, 'Appointments retrieved successfully', {
                    appointments,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalCount,
                        hasNextPage: pageNum < totalPages,
                        hasPrevPage: pageNum > 1,
                    }
                });
            }
            catch (error) {
                console.error('Get appointments error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve appointments');
            }
        });
    }
    // Update appointment status
    static updateAppointmentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { id } = req.params;
                const { status, scheduledAt, rejectionReason } = req.body;
                const appointment = yield database_1.prisma.appointment.findUnique({
                    where: { id },
                    include: {
                        user: true
                    }
                });
                if (!appointment) {
                    return (0, responses_1.sendNotFound)(res, 'Appointment not found');
                }
                let meetingLink = appointment.meetingLink;
                let meetingId = appointment.meetingId;
                // Handle approval
                if (status === 'APPROVED' && appointment.status === 'PENDING') {
                    try {
                        // Create Zoom meeting
                        // const zoomMeeting = await zoomService.createConsultationMeeting(
                        //   appointment.name,
                        //   appointment.email,
                        //   scheduledAt ? new Date(scheduledAt) : undefined
                        // );
                        // meetingLink = zoomMeeting.join_url;
                        // meetingId = zoomMeeting.id.toString();
                        meetingLink = "https://dummymeetinglink.com/meeting123"; // Placeholder for actual Zoom link
                        // Send approval email with meeting link
                        yield emailService_1.emailService.sendAppointmentApproval(appointment.email, appointment.name, meetingLink, scheduledAt ? new Date(scheduledAt) : undefined);
                    }
                    catch (error) {
                        console.error('Failed to create Zoom meeting:', error);
                        return (0, responses_1.sendError)(res, 'Failed to create meeting link');
                    }
                }
                // Handle rejection
                if (status === 'REJECTED') {
                    yield emailService_1.emailService.sendAppointmentRejection(appointment.email, appointment.name, rejectionReason);
                }
                // Update appointment
                const updatedAppointment = yield database_1.prisma.appointment.update({
                    where: { id },
                    data: {
                        status,
                        scheduledAt: scheduledAt ? new Date(scheduledAt) : appointment.scheduledAt,
                        meetingLink,
                        meetingId,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true,
                            }
                        }
                    }
                });
                return (0, responses_1.sendSuccess)(res, 'Appointment status updated successfully', updatedAppointment);
            }
            catch (error) {
                console.error('Update appointment status error:', error);
                return (0, responses_1.sendError)(res, 'Failed to update appointment status');
            }
        });
    }
    // Create property
    static createProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const propertyData = req.body;
                // Handle image uploads if files are present
                let images = [];
                if (req.files && Array.isArray(req.files)) {
                    const files = req.files.map((file) => ({
                        buffer: file.buffer,
                        filename: file.originalname,
                    }));
                    const uploadResults = yield cloudinaryService_1.cloudinaryService.uploadMultipleImages(files, 'properties');
                    images = uploadResults.map(result => result.secure_url);
                }
                const property = yield database_1.prisma.property.create({
                    data: Object.assign(Object.assign({}, propertyData), { images }),
                });
                return (0, responses_1.sendSuccess)(res, 'Property created successfully', property, 201);
            }
            catch (error) {
                console.error('Create property error:', error);
                return (0, responses_1.sendError)(res, 'Failed to create property');
            }
        });
    }
    // Update property
    static updateProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { id } = req.params;
                const updateData = req.body;
                const existingProperty = yield database_1.prisma.property.findUnique({
                    where: { id }
                });
                if (!existingProperty) {
                    return (0, responses_1.sendNotFound)(res, 'Property not found');
                }
                // Handle new image uploads if files are present
                let images = existingProperty.images;
                if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                    const files = req.files.map((file) => ({
                        buffer: file.buffer,
                        filename: file.originalname,
                    }));
                    const uploadResults = yield cloudinaryService_1.cloudinaryService.uploadMultipleImages(files, 'properties');
                    const newImages = uploadResults.map(result => result.secure_url);
                    // Combine with existing images or replace them
                    images = updateData.replaceImages ? newImages : [...images, ...newImages];
                }
                const updatedProperty = yield database_1.prisma.property.update({
                    where: { id },
                    data: Object.assign(Object.assign({}, updateData), { images })
                });
                return (0, responses_1.sendSuccess)(res, 'Property updated successfully', updatedProperty);
            }
            catch (error) {
                console.error('Update property error:', error);
                return (0, responses_1.sendError)(res, 'Failed to update property');
            }
        });
    }
    // Delete property
    static deleteProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { id } = req.params;
                const property = yield database_1.prisma.property.findUnique({
                    where: { id }
                });
                if (!property) {
                    return (0, responses_1.sendNotFound)(res, 'Property not found');
                }
                // Delete images from Cloudinary
                if (property.images && property.images.length > 0) {
                    try {
                        const publicIds = property.images.map(url => {
                            const parts = url.split('/');
                            const filename = parts[parts.length - 1];
                            return `properties/${filename.split('.')[0]}`;
                        });
                        yield cloudinaryService_1.cloudinaryService.deleteMultipleImages(publicIds);
                    }
                    catch (error) {
                        console.error('Failed to delete images from Cloudinary:', error);
                        // Continue with property deletion even if image deletion fails
                    }
                }
                yield database_1.prisma.property.delete({
                    where: { id }
                });
                return (0, responses_1.sendSuccess)(res, 'Property deleted successfully', null);
            }
            catch (error) {
                console.error('Delete property error:', error);
                return (0, responses_1.sendError)(res, 'Failed to delete property');
            }
        });
    }
    // Get all inquiries
    static getInquiries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { status, page = '1', limit = '20' } = req.query;
                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const skip = (pageNum - 1) * limitNum;
                const where = {};
                if (status)
                    where.status = status;
                const [inquiries, totalCount] = yield Promise.all([
                    database_1.prisma.inquiry.findMany({
                        where,
                        skip,
                        take: limitNum,
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    phone: true,
                                }
                            },
                            property: {
                                select: {
                                    id: true,
                                    title: true,
                                    price: true,
                                    location: true,
                                    images: true,
                                }
                            }
                        },
                        orderBy: { createdAt: 'desc' }
                    }),
                    database_1.prisma.inquiry.count({ where })
                ]);
                const totalPages = Math.ceil(totalCount / limitNum);
                return (0, responses_1.sendSuccess)(res, 'Inquiries retrieved successfully', {
                    inquiries,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalCount,
                        hasNextPage: pageNum < totalPages,
                        hasPrevPage: pageNum > 1,
                    }
                });
            }
            catch (error) {
                console.error('Get inquiries error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve inquiries');
            }
        });
    }
    // Respond to inquiry
    static respondToInquiry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { id } = req.params;
                const { response, status = 'RESPONDED' } = req.body;
                const inquiry = yield database_1.prisma.inquiry.findUnique({
                    where: { id },
                    include: {
                        user: true,
                        property: {
                            select: {
                                title: true
                            }
                        }
                    }
                });
                if (!inquiry) {
                    return (0, responses_1.sendNotFound)(res, 'Inquiry not found');
                }
                // Update inquiry status
                const updatedInquiry = yield database_1.prisma.inquiry.update({
                    where: { id },
                    data: { status }
                });
                // Send response email to user
                yield emailService_1.emailService.sendInquiryResponse(inquiry.user.email, inquiry.user.name, inquiry.property.title, response);
                return (0, responses_1.sendSuccess)(res, 'Response sent successfully', updatedInquiry);
            }
            catch (error) {
                console.error('Respond to inquiry error:', error);
                return (0, responses_1.sendError)(res, 'Failed to send response');
            }
        });
    }
    // Get all users
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const { page = '1', limit = '20' } = req.query;
                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const skip = (pageNum - 1) * limitNum;
                const [users, totalCount] = yield Promise.all([
                    database_1.prisma.user.findMany({
                        skip,
                        take: limitNum,
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            createdAt: true,
                            _count: {
                                select: {
                                    appointments: true,
                                    inquiries: true,
                                    favorites: true,
                                }
                            }
                        },
                        orderBy: { createdAt: 'desc' }
                    }),
                    database_1.prisma.user.count()
                ]);
                const totalPages = Math.ceil(totalCount / limitNum);
                return (0, responses_1.sendSuccess)(res, 'Users retrieved successfully', {
                    users,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalCount,
                        hasNextPage: pageNum < totalPages,
                        hasPrevPage: pageNum > 1,
                    }
                });
            }
            catch (error) {
                console.error('Get users error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve users');
            }
        });
    }
    // Get admin profile
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.admin) {
                    return (0, responses_1.sendError)(res, 'Admin not authenticated', 401);
                }
                const admin = yield database_1.prisma.admin.findUnique({
                    where: { id: req.admin.id },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                    }
                });
                return (0, responses_1.sendSuccess)(res, 'Profile retrieved successfully', admin);
            }
            catch (error) {
                console.error('Get admin profile error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve profile');
            }
        });
    }
}
exports.AdminController = AdminController;
