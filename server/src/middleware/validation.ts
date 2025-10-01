import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendValidationError } from '../utils/responses';
import { validateSchema } from '../utils/validators';

export const validateRequest = (schema: Joi.ObjectSchema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[property];
    const { isValid, errors } = validateSchema(schema, dataToValidate);
    
    if (!isValid) {
      return sendValidationError(res, 'Validation failed', errors);
    }
    
    next();
  };
};

export const validateBody = (schema: Joi.ObjectSchema) => validateRequest(schema, 'body');
export const validateQuery = (schema: Joi.ObjectSchema) => validateRequest(schema, 'query');
export const validateParams = (schema: Joi.ObjectSchema) => validateRequest(schema, 'params');