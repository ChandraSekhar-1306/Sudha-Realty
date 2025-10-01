"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inquiryController_1 = require("../controllers/inquiryController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validators_1 = require("../utils/validators");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
// Public routes
router.post('/', (0, validation_1.validateBody)(validators_1.createInquirySchema), inquiryController_1.InquiryController.createInquiry);
// Protected routes
router.get('/', auth_1.authenticateUser, (0, validation_1.validateQuery)(validators_1.paginationSchema), inquiryController_1.InquiryController.getUserInquiries);
router.get('/:id', auth_1.optionalAuth, (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), inquiryController_1.InquiryController.getInquiry);
exports.default = router;
