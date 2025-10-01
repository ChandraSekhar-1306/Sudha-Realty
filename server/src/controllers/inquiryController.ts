import { Response } from 'express';
import { prisma } from '../config/database';
import { AuthenticatedRequest, CreateInquiryDTO } from '../types';
import { sendSuccess, sendError, sendNotFound } from '../utils/responses';
import { emailService } from '../services/emailService';

export class InquiryController {
  // Create new inquiry
  static async createInquiry(req: AuthenticatedRequest, res: Response) {
    try {
      const { propertyId, name, email, phone, message }: CreateInquiryDTO = req.body;

      // Check if property exists
      const property = await prisma.property.findUnique({
        where: { id: propertyId },
        select: {
          id: true,
          title: true,
          status: true,
        }
      });

      if (!property) {
        return sendNotFound(res, 'Property not found');
      }

      if (property.status !== 'AVAILABLE') {
        return sendError(res, 'Property is not available for inquiries', 400);
      }

      // Create or get user
      let user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        user = await prisma.user.create({
          data: { name, email, phone, password: 'defaultPassword123' }
        });
      }

      // Create inquiry
      const inquiry = await prisma.inquiry.create({
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
      await emailService.sendInquiryNotification(
        property.title,
        name,
        email,
        phone,
        message
      );

      return sendSuccess(res, 'Inquiry submitted successfully', {
        id: inquiry.id,
        status: inquiry.status,
        property: inquiry.property,
        message: 'Your inquiry has been submitted. We will contact you soon.'
      }, 201);
    } catch (error) {
      console.error('Create inquiry error:', error);
      return sendError(res, 'Failed to submit inquiry');
    }
  }

  // Get user inquiries
  static async getUserInquiries(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const { page = '1', limit = '10' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const [inquiries, totalCount] = await Promise.all([
        prisma.inquiry.findMany({
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
        prisma.inquiry.count({
          where: { userId: req.user.id }
        })
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
      console.error('Get user inquiries error:', error);
      return sendError(res, 'Failed to retrieve inquiries');
    }
  }

  // Get specific inquiry
  static async getInquiry(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const inquiry = await prisma.inquiry.findUnique({
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
        return sendNotFound(res, 'Inquiry not found');
      }

      // Check if user owns this inquiry or is admin
      if (req.user && inquiry.userId !== req.user.id && !req.admin) {
        return sendError(res, 'Access denied', 403);
      }

      return sendSuccess(res, 'Inquiry retrieved successfully', inquiry);
    } catch (error) {
      console.error('Get inquiry error:', error);
      return sendError(res, 'Failed to retrieve inquiry');
    }
  }
}