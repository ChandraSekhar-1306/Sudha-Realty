import { Router } from 'express';
import { InquiryController } from '../controllers/inquiryController';
import { authenticateUser, optionalAuth } from '../middleware/auth';
import { validateBody, validateParams, validateQuery } from '../middleware/validation';
import { createInquirySchema, uuidSchema, paginationSchema } from '../utils/validators';
import Joi from 'joi';

const router = Router();

// Public routes
router.post('/', validateBody(createInquirySchema), InquiryController.createInquiry);

// Protected routes
router.get('/', authenticateUser, validateQuery(paginationSchema), InquiryController.getUserInquiries);
router.get('/:id', optionalAuth, validateParams(Joi.object({ id: uuidSchema })), InquiryController.getInquiry);

export default router;