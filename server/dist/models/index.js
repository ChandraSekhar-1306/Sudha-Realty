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
exports.AppointmentModel = exports.PropertyModel = void 0;
const database_1 = require("../config/database");
class PropertyModel {
    static getFeaturedProperties() {
        return __awaiter(this, arguments, void 0, function* (limit = 6) {
            return database_1.prisma.property.findMany({
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
        });
    }
    static getPropertyStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const [total, available, sold, reserved] = yield Promise.all([
                database_1.prisma.property.count(),
                database_1.prisma.property.count({ where: { status: 'AVAILABLE' } }),
                database_1.prisma.property.count({ where: { status: 'SOLD' } }),
                database_1.prisma.property.count({ where: { status: 'RESERVED' } }),
            ]);
            return { total, available, sold, reserved };
        });
    }
}
exports.PropertyModel = PropertyModel;
class AppointmentModel {
    static getUpcomingAppointments() {
        return __awaiter(this, arguments, void 0, function* (limit = 10) {
            return database_1.prisma.appointment.findMany({
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
        });
    }
}
exports.AppointmentModel = AppointmentModel;
