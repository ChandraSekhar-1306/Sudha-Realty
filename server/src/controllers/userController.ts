import { Response } from 'express';
import { prisma } from '../config/database';
import { AuthenticatedRequest } from '../types';
import { sendSuccess, sendError, sendNotFound } from '../utils/responses';
import { generateToken } from '../middleware/auth';
import bcrypt from 'bcryptjs';

export class UserController {
  // Get or create user (for guest users)
static async getOrCreateUser(req: AuthenticatedRequest, res: Response) {
  try {
    const { name, email, phone, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      if (!name) return sendError(res, 'Name is required for registration', 400);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword
        }
      });
    } else {
      // Compare passwords for existing user
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return sendError(res, 'Invalid credentials', 401);
      }
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email, 'user');

    return sendSuccess(res, 'User authenticated successfully', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token
    });
  } catch (error) {
    console.error('User authentication error:', error);
    return sendError(res, 'Failed to authenticate user');
  }
}

  // Get user profile
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const user = await prisma.user.findUnique({
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
        return sendNotFound(res, 'User not found');
      }

      return sendSuccess(res, 'Profile retrieved successfully', user);
    } catch (error) {
      console.error('Get profile error:', error);
      return sendError(res, 'Failed to retrieve profile');
    }
  }

  // Update user profile
  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const { name, phone } = req.body;

      const updatedUser = await prisma.user.update({
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

      return sendSuccess(res, 'Profile updated successfully', updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      return sendError(res, 'Failed to update profile');
    }
  }

  // Get user dashboard data
  static async getDashboard(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      // Get appointments
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

      // Get favorites with property details
      const favorites = await prisma.favorite.findMany({
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
      const inquiries = await prisma.inquiry.findMany({
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

      return sendSuccess(res, 'Dashboard data retrieved successfully', dashboardData);
    } catch (error) {
      console.error('Get dashboard error:', error);
      return sendError(res, 'Failed to retrieve dashboard data');
    }
  }
}