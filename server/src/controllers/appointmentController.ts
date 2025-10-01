import { Response } from 'express';
import { prisma } from '../config/database';
import { AuthenticatedRequest, CreateAppointmentDTO } from '../types';
import { sendSuccess, sendError, sendNotFound } from '../utils/responses';
import { emailService } from '../services/emailService';
//import { zoomService } from '../services/zoomService';

export class AppointmentController {
  // Create new appointment
  static async createAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, email, phone, message }: CreateAppointmentDTO = req.body;

      // Create or get user
      let user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: { name, email, phone }
        });
      }

      // Create appointment
      const appointment = await prisma.appointment.create({
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
      await emailService.sendAppointmentConfirmation(email, name, appointment.id);

      return sendSuccess(res, 'Appointment booked successfully', {
        id: appointment.id,
        status: appointment.status,
        message: 'Your appointment has been submitted for review. You will receive an email confirmation shortly.'
      }, 201);
    } catch (error) {
      console.error('Create appointment error:', error);
      return sendError(res, 'Failed to book appointment');
    }
  }

  // Get user appointments
  static async getUserAppointments(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const appointments = await prisma.appointment.findMany({
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

      return sendSuccess(res, 'Appointments retrieved successfully', appointments);
    } catch (error) {
      console.error('Get appointments error:', error);
      return sendError(res, 'Failed to retrieve appointments');
    }
  }

  // Get specific appointment
  static async getAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      
      const appointment = await prisma.appointment.findUnique({
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
        return sendNotFound(res, 'Appointment not found');
      }

      // Check if user owns this appointment or is admin
      if (req.user && appointment.userId !== req.user.id && !req.admin) {
        return sendError(res, 'Access denied', 403);
      }

      return sendSuccess(res, 'Appointment retrieved successfully', appointment);
    } catch (error) {
      console.error('Get appointment error:', error);
      return sendError(res, 'Failed to retrieve appointment');
    }
  }

  // Cancel appointment (user)
  static async cancelAppointment(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const { id } = req.params;

      const appointment = await prisma.appointment.findUnique({
        where: { id }
      });

      if (!appointment) {
        return sendNotFound(res, 'Appointment not found');
      }

      if (appointment.userId !== req.user.id) {
        return sendError(res, 'Access denied', 403);
      }

      if (appointment.status !== 'PENDING' && appointment.status !== 'APPROVED') {
        return sendError(res, 'Cannot cancel this appointment', 400);
      }

      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });

      return sendSuccess(res, 'Appointment cancelled successfully', updatedAppointment);
    } catch (error) {
      console.error('Cancel appointment error:', error);
      return sendError(res, 'Failed to cancel appointment');
    }
  }
}