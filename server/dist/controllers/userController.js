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
exports.UserController = void 0;
const database_1 = require("../config/database");
const responses_1 = require("../utils/responses");
const auth_1 = require("../middleware/auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    // Get or create user (for guest users)
    static getOrCreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, password } = req.body;
                if (!email || !password) {
                    return (0, responses_1.sendError)(res, 'Email and password are required', 400);
                }
                // Check if user exists
                let user = yield database_1.prisma.user.findUnique({
                    where: { email }
                });
                if (!user) {
                    if (!name)
                        return (0, responses_1.sendError)(res, 'Name is required for registration', 400);
                    // Hash password
                    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                    // Create new user
                    user = yield database_1.prisma.user.create({
                        data: {
                            name,
                            email,
                            phone,
                            password: hashedPassword
                        }
                    });
                }
                else {
                    // Compare passwords for existing user
                    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                    if (!isMatch) {
                        return (0, responses_1.sendError)(res, 'Invalid credentials', 401);
                    }
                }
                // Generate JWT token
                const token = (0, auth_1.generateToken)(user.id, user.email, 'user');
                return (0, responses_1.sendSuccess)(res, 'User authenticated successfully', {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                    },
                    token
                });
            }
            catch (error) {
                console.error('User authentication error:', error);
                return (0, responses_1.sendError)(res, 'Failed to authenticate user');
            }
        });
    }
    // Get user profile
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                const user = yield database_1.prisma.user.findUnique({
                    where: { id: req.user.id },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true,
                    }
                });
                if (!user) {
                    return (0, responses_1.sendNotFound)(res, 'User not found');
                }
                return (0, responses_1.sendSuccess)(res, 'Profile retrieved successfully', user);
            }
            catch (error) {
                console.error('Get profile error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve profile');
            }
        });
    }
    // Update user profile
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                const { name, phone } = req.body;
                const updatedUser = yield database_1.prisma.user.update({
                    where: { id: req.user.id },
                    data: {
                        name: name || req.user.name,
                        phone: phone || req.user.phone,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true,
                    }
                });
                return (0, responses_1.sendSuccess)(res, 'Profile updated successfully', updatedUser);
            }
            catch (error) {
                console.error('Update profile error:', error);
                return (0, responses_1.sendError)(res, 'Failed to update profile');
            }
        });
    }
    // Get user dashboard data
    static getDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                // Get appointments
                const appointments = yield database_1.prisma.appointment.findMany({
                    where: { userId: req.user.id },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        message: true,
                        status: true,
                        meetingLink: true,
                        scheduledAt: true,
                        createdAt: true,
                    }
                });
                // Get favorites with property details
                const favorites = yield database_1.prisma.favorite.findMany({
                    where: { userId: req.user.id },
                    include: {
                        property: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                location: true,
                                category: true,
                                type: true,
                                images: true,
                                status: true,
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                });
                // Get recent inquiries
                const inquiries = yield database_1.prisma.inquiry.findMany({
                    where: { userId: req.user.id },
                    include: {
                        property: {
                            select: {
                                id: true,
                                title: true,
                                images: true,
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                });
                const dashboardData = {
                    appointments,
                    favorites: favorites.map(fav => ({
                        id: fav.id,
                        property: fav.property,
                        createdAt: fav.createdAt,
                    })),
                    inquiries,
                    stats: {
                        totalAppointments: appointments.length,
                        pendingAppointments: appointments.filter(app => app.status === 'PENDING').length,
                        totalFavorites: favorites.length,
                        totalInquiries: inquiries.length,
                    }
                };
                return (0, responses_1.sendSuccess)(res, 'Dashboard data retrieved successfully', dashboardData);
            }
            catch (error) {
                console.error('Get dashboard error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve dashboard data');
            }
        });
    }
}
exports.UserController = UserController;
