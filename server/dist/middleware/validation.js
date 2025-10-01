"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateBody = exports.validateRequest = void 0;
const responses_1 = require("../utils/responses");
const validators_1 = require("../utils/validators");
const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const dataToValidate = req[property];
        const { isValid, errors } = (0, validators_1.validateSchema)(schema, dataToValidate);
        if (!isValid) {
            return (0, responses_1.sendValidationError)(res, 'Validation failed', errors);
        }
        next();
    };
};
exports.validateRequest = validateRequest;
const validateBody = (schema) => (0, exports.validateRequest)(schema, 'body');
exports.validateBody = validateBody;
const validateQuery = (schema) => (0, exports.validateRequest)(schema, 'query');
exports.validateQuery = validateQuery;
const validateParams = (schema) => (0, exports.validateRequest)(schema, 'params');
exports.validateParams = validateParams;
