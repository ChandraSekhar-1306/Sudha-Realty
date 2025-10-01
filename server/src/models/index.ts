import { prisma } from '../config/database';
import bcrypt from 'bcryptjs';





export class PropertyModel {
  static async getFeaturedProperties(limit: number = 6) {
    return prisma.property.findMany({
      where: { status: 'AVAILABLE' },
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        price: true,
        location: true,
        images: true,
        category: true,
        type: true,
        area: true,
        bedrooms: true,
        bathrooms: true,
      }
    });
  }

  static async getPropertyStats() {
    const [total, available, sold, reserved] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'AVAILABLE' } }),
      prisma.property.count({ where: { status: 'SOLD' } }),
      prisma.property.count({ where: { status: 'RESERVED' } }),
    ]);

    return { total, available, sold, reserved };
  }
}

export class AppointmentModel {
  static async getUpcomingAppointments(limit: number = 10) {
    return prisma.appointment.findMany({
      where: {
        status: 'APPROVED',
        scheduledAt: {
          gte: new Date()
        }
      },
      take: limit,
      orderBy: { scheduledAt: 'asc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          }
        }
      }
    });
  }
}



