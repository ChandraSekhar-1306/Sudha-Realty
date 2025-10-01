import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  message: string = 'Success',
  data: T,
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string = 'Something went wrong',
  statusCode: number = 500,
  error?: string
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
    data: null,
    error,
  };
  
  return res.status(statusCode).json(response);
};

export const sendValidationError = (
  res: Response,
  message: string = 'Validation failed',
  errors?: any
): Response => {
  return sendError(res, message, 400, errors);
};

export const sendNotFound = (
  res: Response,
  message: string = 'Resource not found'
): Response => {
  return sendError(res, message, 404);
};

export const sendUnauthorized = (
  res: Response,
  message: string = 'Unauthorized access'
): Response => {
  return sendError(res, message, 401);
};

export const sendForbidden = (
  res: Response,
  message: string = 'Forbidden access'
): Response => {
  return sendError(res, message, 403);
};