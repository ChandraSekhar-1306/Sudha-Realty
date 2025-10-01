"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validators_1 = require("../utils/validators");
const joi_1 = __importDefault(require("joi"));
const parseFormData_1 = require("../middleware/parseFormData");
const router = (0, express_1.Router)();
// Configure multer for file uploads (memory storage)
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per file
        files: 10, // Max 10 files
    },
    fileFilter: (req, file, cb) => {
        // Only allow images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed'));
        }
    },
});
// Public routes
router.post('/login', (0, validation_1.validateBody)(validators_1.adminLoginSchema), adminController_1.AdminController.login);
// Protected admin routes
router.use(auth_1.authenticateAdmin); // All routes below require admin authentication
// Dashboard
router.get('/dashboard', adminController_1.AdminController.getDashboard);
router.get('/profile', adminController_1.AdminController.getProfile);
// Appointments management
router.get('/appointments', (0, validation_1.validateQuery)(validators_1.paginationSchema), adminController_1.AdminController.getAppointments);
router.patch('/appointments/:id/status', (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), (0, validation_1.validateBody)(validators_1.updateAppointmentStatusSchema), adminController_1.AdminController.updateAppointmentStatus);
// Properties management
router.post('/properties', upload.array('images', 10), parseFormData_1.parseFormData, 
// validateBody(createPropertySchema),
adminController_1.AdminController.createProperty);
router.put('/properties/:id', upload.array('images', 10), parseFormData_1.parseFormData, (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), (0, validation_1.validateBody)(validators_1.updatePropertySchema), adminController_1.AdminController.updateProperty);
router.delete('/properties/:id', (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), adminController_1.AdminController.deleteProperty);
// Inquiries management
router.get('/inquiries', (0, validation_1.validateQuery)(validators_1.paginationSchema), adminController_1.AdminController.getInquiries);
router.post('/inquiries/:id/respond', (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), (0, validation_1.validateBody)(validators_1.inquiryResponseSchema), adminController_1.AdminController.respondToInquiry);
// Users management
router.get('/users', (0, validation_1.validateQuery)(validators_1.paginationSchema), adminController_1.AdminController.getUsers);
exports.default = router;
