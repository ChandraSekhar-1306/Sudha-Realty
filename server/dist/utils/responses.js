"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForbidden = exports.sendUnauthorized = exports.sendNotFound = exports.sendValidationError = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, message = 'Success', data, statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message = 'Something went wrong', statusCode = 500, error) => {
    const response = {
        success: false,
        message,
        data: null,
        error,
    };
    return res.status(statusCode).json(response);
};
exports.sendError = sendError;
const sendValidationError = (res, message = 'Validation failed', errors) => {
    return (0, exports.sendError)(res, message, 400, errors);
};
exports.sendValidationError = sendValidationError;
const sendNotFound = (res, message = 'Resource not found') => {
    return (0, exports.sendError)(res, message, 404);
};
exports.sendNotFound = sendNotFound;
const sendUnauthorized = (res, message = 'Unauthorized access') => {
    return (0, exports.sendError)(res, message, 401);
};
exports.sendUnauthorized = sendUnauthorized;
const sendForbidden = (res, message = 'Forbidden access') => {
    return (0, exports.sendError)(res, message, 403);
};
exports.sendForbidden = sendForbidden;
