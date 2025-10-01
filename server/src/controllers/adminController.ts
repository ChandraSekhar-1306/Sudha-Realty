import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { AuthenticatedRequest, CreatePropertyDTO } from '../types';
import { sendSuccess, sendError, sendNotFound } from '../utils/responses';
import { generateToken } from '../middleware/auth';
import { emailService } from '../services/emailService';
//import { zoomService } from '../services/zoomService';
import { cloudinaryService } from '../services/cloudinaryService';

export class AdminController {
  // Admin login
  static async login(req: AuthenticatedRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const admin = await prisma.admin.findUnique({
        where: { email }
      });

      if (!admin) {
        return sendError(res, 'Invalid credentials', 401);
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return sendError(res, 'Invalid credentials', 401);
      }

      const token = generateToken(admin.id, admin.email, 'admin');

      return sendSuccess(res, 'Login successful', {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token
      });
    } catch (error) {
      console.error('Admin login error:', error);
      return sendError(res, 'Login failed');
    }
  }

  // Get admin dashboard stats
  static async getDashboard(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      // Get counts
      const [
        totalProperties,
        totalAppointments,
        totalInquiries,
        totalUsers,
        pendingAppointments,
        pendingInquiries,
        availableProperties,
        soldProperties
      ] = await Promise.all([
        prisma.property.count(),
        prisma.appointment.count(),
        prisma.inquiry.count(),
        prisma.user.count(),
        prisma.appointment.count({ where: { status: 'PENDING' } }),
        prisma.inquiry.count({ where: { status: 'PENDING' } }),
        prisma.property.count({ where: { status: 'AVAILABLE' } }),
        prisma.property.count({ where: { status: 'SOLD' } })
      ]);

      // Get recent activities
      const [recentAppointments, recentInquiries, recentProperties] = await Promise.all([
        prisma.appointment.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        }),
        prisma.inquiry.findMany({
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
        prisma.property.findMany({
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

      return sendSuccess(res, 'Dashboard data retrieved successfully', dashboardData);
    } catch (error) {
      console.error('Admin dashboard error:', error);
      return sendError(res, 'Failed to retrieve dashboard data');
    }
  }

  // Get all appointments
  static async getAppointments(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { status, page = '1', limit = '20' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const where: any = {};
      if (status) where.status = status;

      const [appointments, totalCount] = await Promise.all([
        prisma.appointment.findMany({
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
        prisma.appointment.count({ where })
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);

      return sendSuccess(res, 'Appointments retrieved successfully', {
        appointments,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        }
      });
    } catch (error) {
      console.error('Get appointments error:', error);
      return sendError(res, 'Failed to retrieve appointments');
    }
  }

  // Update appointment status
  static async updateAppointmentStatus(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { id } = req.params;
      const { status, scheduledAt, rejectionReason } = req.body;

      const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: {
          user: true
        }
      });

      if (!appointment) {
        return sendNotFound(res, 'Appointment not found');
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
          
          meetingLink="https://dummymeetinglink.com/meeting123"; // Placeholder for actual Zoom link

          // Send approval email with meeting link
          await emailService.sendAppointmentApproval(
            appointment.email,
            appointment.name,
            meetingLink,
            scheduledAt ? new Date(scheduledAt) : undefined
          );
        } catch (error) {
          console.error('Failed to create Zoom meeting:', error);
          return sendError(res, 'Failed to create meeting link');
        }
      }

      // Handle rejection
      if (status === 'REJECTED') {
        await emailService.sendAppointmentRejection(
          appointment.email,
          appointment.name,
          rejectionReason
        );
      }

      // Update appointment
      const updatedAppointment = await prisma.appointment.update({
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

      return sendSuccess(res, 'Appointment status updated successfully', updatedAppointment);
    } catch (error) {
      console.error('Update appointment status error:', error);
      return sendError(res, 'Failed to update appointment status');
    }
  }

  // Create property
static async createProperty(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.admin) {
      return sendError(res, 'Admin not authenticated', 401);
    }

    

    const propertyData: CreatePropertyDTO = req.body;

    // Handle image uploads if files are present
    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      const files = req.files.map((file: any) => ({
        buffer: file.buffer,
        filename: file.originalname,
      }));

      const uploadResults = await cloudinaryService.uploadMultipleImages(files, 'properties');
      images = uploadResults.map(result => result.secure_url);
    }

    const property = await prisma.property.create({
      data: {
        ...propertyData,
        images,
      },
    });

    return sendSuccess(res, 'Property created successfully', property, 201);
  } catch (error) {
    console.error('Create property error:', error);
    return sendError(res, 'Failed to create property');
  }
}


  // Update property
  static async updateProperty(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { id } = req.params;
      const updateData = req.body;

      const existingProperty = await prisma.property.findUnique({
        where: { id }
      });

      if (!existingProperty) {
        return sendNotFound(res, 'Property not found');
      }

      // Handle new image uploads if files are present
      let images = existingProperty.images;
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const files = req.files.map((file: any) => ({
          buffer: file.buffer,
          filename: file.originalname,
        }));

        const uploadResults = await cloudinaryService.uploadMultipleImages(files, 'properties');
        const newImages = uploadResults.map(result => result.secure_url);
        
        // Combine with existing images or replace them
        images = updateData.replaceImages ? newImages : [...images, ...newImages];
      }

      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          ...updateData,
          images,
        }
      });

      return sendSuccess(res, 'Property updated successfully', updatedProperty);
    } catch (error) {
      console.error('Update property error:', error);
      return sendError(res, 'Failed to update property');
    }
  }

  // Delete property
  static async deleteProperty(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { id } = req.params;

      const property = await prisma.property.findUnique({
        where: { id }
      });

      if (!property) {
        return sendNotFound(res, 'Property not found');
      }

      // Delete images from Cloudinary
      if (property.images && property.images.length > 0) {
        try {
          const publicIds = property.images.map(url => {
            const parts = url.split('/');
            const filename = parts[parts.length - 1];
            return `properties/${filename.split('.')[0]}`;
          });
          
          await cloudinaryService.deleteMultipleImages(publicIds);
        } catch (error) {
          console.error('Failed to delete images from Cloudinary:', error);
          // Continue with property deletion even if image deletion fails
        }
      }

      await prisma.property.delete({
        where: { id }
      });

      return sendSuccess(res, 'Property deleted successfully', null);
    } catch (error) {
      console.error('Delete property error:', error);
      return sendError(res, 'Failed to delete property');
    }
  }

  // Get all inquiries
  static async getInquiries(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { status, page = '1', limit = '20' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const where: any = {};
      if (status) where.status = status;

      const [inquiries, totalCount] = await Promise.all([
        prisma.inquiry.findMany({
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
        prisma.inquiry.count({ where })
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);

      return sendSuccess(res, 'Inquiries retrieved successfully', {
        inquiries,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        }
      });
    } catch (error) {
      console.error('Get inquiries error:', error);
      return sendError(res, 'Failed to retrieve inquiries');
    }
  }

  // Respond to inquiry
  static async respondToInquiry(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { id } = req.params;
      const { response, status = 'RESPONDED' } = req.body;

      const inquiry = await prisma.inquiry.findUnique({
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
        return sendNotFound(res, 'Inquiry not found');
      }

      // Update inquiry status
      const updatedInquiry = await prisma.inquiry.update({
        where: { id },
        data: { status }
      });

      // Send response email to user
      await emailService.sendInquiryResponse(
        inquiry.user.email,
        inquiry.user.name,
        inquiry.property.title,
        response
      );

      return sendSuccess(res, 'Response sent successfully', updatedInquiry);
    } catch (error) {
      console.error('Respond to inquiry error:', error);
      return sendError(res, 'Failed to send response');
    }
  }

  // Get all users
  static async getUsers(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const { page = '1', limit = '20' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const [users, totalCount] = await Promise.all([
        prisma.user.findMany({
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
        prisma.user.count()
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);

      return sendSuccess(res, 'Users retrieved successfully', {
        users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        }
      });
    } catch (error) {
      console.error('Get users error:', error);
      return sendError(res, 'Failed to retrieve users');
    }
  }

  // Get admin profile
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.admin) {
        return sendError(res, 'Admin not authenticated', 401);
      }

      const admin = await prisma.admin.findUnique({
        where: { id: req.admin.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        }
      });

      return sendSuccess(res, 'Profile retrieved successfully', admin);
    } catch (error) {
      console.error('Get admin profile error:', error);
      return sendError(res, 'Failed to retrieve profile');
    }
  }
}