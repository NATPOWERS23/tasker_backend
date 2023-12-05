import { body } from 'express-validator';

export const taskCreateValidation = [
    body('title', 'Incorrect title format').optional().isLength({ min: 2 }).isString(),
    body('content', 'Incorrect content format').optional().isString(),
    body('tags', 'Incorrect tags').optional().isString(),
    body('checked', 'Incorrect check value').optional().isBoolean(),
];