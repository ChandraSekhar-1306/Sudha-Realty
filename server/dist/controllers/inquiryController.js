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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryController = void 0;
const database_1 = require("../config/database");
const responses_1 = require("../utils/responses");
const emailService_1 = require("../services/emailService");
class InquiryController {
    // Create new inquiry
    static createInquiry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyId, name, email, phone, message } = req.body;
                // Check if property exists
                const property = yield database_1.prisma.property.findUnique({
                    where: { id: propertyId },
                    select: {
                        id: true,
                        title: true,
                        status: true,
                    }
                });
                if (!property) {
                    return (0, responses_1.sendNotFound)(res, 'Property not found');
                }
                if (property.status !== 'AVAILABLE') {
                    return (0, responses_1.sendError)(res, 'Property is not available for inquiries', 400);
                }
                // Create or get user
                let user = yield database_1.prisma.user.findUnique({
                    where: { email }
                });
                if (!user) {
                    user = yield database_1.prisma.user.create({
                        data: { name, email, phone }
                    });
                }
                // Create inquiry
                const inquiry = yield database_1.prisma.inquiry.create({
                    data: {
                        userId: user.id,
                        propertyId,
                        name,
                        email,
                        phone,
                        message,
                        status: 'PENDING'
                    },
                    include: {
                        property: {
                            select: {
                                title: true,
                                price: true,
                                location: true,
                            }
                        }
                    }
                });
                // Send notification email to admin
                yield emailService_1.emailService.sendInquiryNotification(property.title, name, email, phone, message);
                return (0, responses_1.sendSuccess)(res, 'Inquiry submitted successfully', {
                    id: inquiry.id,
                    status: inquiry.status,
                    property: inquiry.property,
                    message: 'Your inquiry has been submitted. We will contact you soon.'
                }, 201);
            }
            catch (error) {
                console.error('Create inquiry error:', error);
                return (0, responses_1.sendError)(res, 'Failed to submit inquiry');
            }
        });
    }
    // Get user inquiries
    static getUserInquiries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                const { page = '1', limit = '10' } = req.query;
                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const skip = (pageNum - 1) * limitNum;
                const [inquiries, totalCount] = yield Promise.all([
                    database_1.prisma.inquiry.findMany({
                        where: { userId: req.user.id },
                        skip,
                        take: limitNum,
                        include: {
                            property: {
                                select: {
                                    id: true,
                                    title: true,
                                    price: true,
                                    location: true,
                                    images: true,
                                    status: true,
                                }
                            }
                        },
                        orderBy: { createdAt: 'desc' }
                    }),
                    database_1.prisma.inquiry.count({
                        where: { userId: req.user.id }
                    })
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
                console.error('Get user inquiries error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve inquiries');
            }
        });
    }
    // Get specific inquiry
    static getInquiry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const inquiry = yield database_1.prisma.inquiry.findUnique({
                    where: { id },
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
                                status: true,
                            }
                        }
                    }
                });
                if (!inquiry) {
                    return (0, responses_1.sendNotFound)(res, 'Inquiry not found');
                }
                // Check if user owns this inquiry or is admin
                if (req.user && inquiry.userId !== req.user.id && !req.admin) {
                    return (0, responses_1.sendError)(res, 'Access denied', 403);
                }
                return (0, responses_1.sendSuccess)(res, 'Inquiry retrieved successfully', inquiry);
            }
            catch (error) {
                console.error('Get inquiry error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve inquiry');
            }
        });
    }
}
exports.InquiryController = InquiryController;
