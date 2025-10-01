import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticateUser, optionalAuth } from '../middleware/auth';
import { validateBody, validateParams } from '../middleware/validation';
import { createAppointmentSchema, uuidSchema } from '../utils/validators';
import Joi from 'joi';

const router = Router();

// Public routes
router.post('/', validateBody(createAppointmentSchema), AppointmentController.createAppointment);

// Protected routes
router.get('/', authenticateUser, AppointmentController.getUserAppointments);

router.get('/:id', optionalAuth, validateParams(Joi.object({ id: uuidSchema })), AppointmentController.getAppointment);
router.patch('/:id/cancel', authenticateUser,  AppointmentController.cancelAppointment);

export default router;