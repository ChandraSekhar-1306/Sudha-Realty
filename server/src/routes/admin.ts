import { Router } from 'express';
import multer from 'multer';
import { AdminController } from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody, validateParams, validateQuery } from '../middleware/validation';
import {
  adminLoginSchema,
  createPropertySchema,
  updatePropertySchema,
  updateAppointmentStatusSchema,
  inquiryResponseSchema,
  uuidSchema,
  paginationSchema
} from '../utils/validators';
import Joi from 'joi';
import { parseFormData } from '../middleware/parseFormData';

const router = Router();

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10, // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Public routes
router.post('/login', validateBody(adminLoginSchema), AdminController.login);

// Protected admin routes
router.use(authenticateAdmin); // All routes below require admin authentication

// Dashboard
router.get('/dashboard', AdminController.getDashboard);
router.get('/profile', AdminController.getProfile);

// Appointments management
router.get('/appointments', validateQuery(paginationSchema), AdminController.getAppointments);
router.patch('/appointments/:id/status', 
  validateParams(Joi.object({ id: uuidSchema })),
  validateBody(updateAppointmentStatusSchema),
  AdminController.updateAppointmentStatus
);

// Properties management
router.post('/properties', 
  upload.array('images', 10),
   parseFormData,  
  // validateBody(createPropertySchema),
  AdminController.createProperty
);
router.put('/properties/:id', 
  upload.array('images', 10),
  parseFormData,
  validateParams(Joi.object({ id: uuidSchema })),
  validateBody(updatePropertySchema),
  AdminController.updateProperty
);
router.delete('/properties/:id', validateParams(Joi.object({ id: uuidSchema })), AdminController.deleteProperty);

// Inquiries management
router.get('/inquiries', validateQuery(paginationSchema), AdminController.getInquiries);
router.post('/inquiries/:id/respond', 
  validateParams(Joi.object({ id: uuidSchema })),
  validateBody(inquiryResponseSchema),
  AdminController.respondToInquiry
);

// Users management
router.get('/users', validateQuery(paginationSchema), AdminController.getUsers);

export default router;