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
exports.AppointmentController = void 0;
const database_1 = require("../config/database");
const responses_1 = require("../utils/responses");
const emailService_1 = require("../services/emailService");
//import { zoomService } from '../services/zoomService';
class AppointmentController {
    // Create new appointment
    static createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, message } = req.body;
                // Create or get user
                let user = yield database_1.prisma.user.findUnique({
                    where: { email }
                });
                if (!user) {
                    user = yield database_1.prisma.user.create({
                        data: { name, email, phone }
                    });
                }
                // Create appointment
                const appointment = yield database_1.prisma.appointment.create({
                    data: {
                        userId: user.id,
                        name,
                        email,
                        phone,
                        message,
                        status: 'PENDING'
                    }
                });
                // Send confirmation email
                yield emailService_1.emailService.sendAppointmentConfirmation(email, name, appointment.id);
                return (0, responses_1.sendSuccess)(res, 'Appointment booked successfully', {
                    id: appointment.id,
                    status: appointment.status,
                    message: 'Your appointment has been submitted for review. You will receive an email confirmation shortly.'
                }, 201);
            }
            catch (error) {
                console.error('Create appointment error:', error);
                return (0, responses_1.sendError)(res, 'Failed to book appointment');
            }
        });
    }
    // Get user appointments
    static getUserAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
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
                return (0, responses_1.sendSuccess)(res, 'Appointments retrieved successfully', appointments);
            }
            catch (error) {
                console.error('Get appointments error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve appointments');
            }
        });
    }
    // Get specific appointment
    static getAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield database_1.prisma.appointment.findUnique({
                    where: { id },
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
                if (!appointment) {
                    return (0, responses_1.sendNotFound)(res, 'Appointment not found');
                }
                // Check if user owns this appointment or is admin
                if (req.user && appointment.userId !== req.user.id && !req.admin) {
                    return (0, responses_1.sendError)(res, 'Access denied', 403);
                }
                return (0, responses_1.sendSuccess)(res, 'Appointment retrieved successfully', appointment);
            }
            catch (error) {
                console.error('Get appointment error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve appointment');
            }
        });
    }
    // Cancel appointment (user)
    static cancelAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                const { id } = req.params;
                const appointment = yield database_1.prisma.appointment.findUnique({
                    where: { id }
                });
                if (!appointment) {
                    return (0, responses_1.sendNotFound)(res, 'Appointment not found');
                }
                if (appointment.userId !== req.user.id) {
                    return (0, responses_1.sendError)(res, 'Access denied', 403);
                }
                if (appointment.status !== 'PENDING' && appointment.status !== 'APPROVED') {
                    return (0, responses_1.sendError)(res, 'Cannot cancel this appointment', 400);
                }
                const updatedAppointment = yield database_1.prisma.appointment.update({
                    where: { id },
                    data: { status: 'CANCELLED' }
                });
                return (0, responses_1.sendSuccess)(res, 'Appointment cancelled successfully', updatedAppointment);
            }
            catch (error) {
                console.error('Cancel appointment error:', error);
                return (0, responses_1.sendError)(res, 'Failed to cancel appointment');
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
