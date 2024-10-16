import { body } from 'express-validator';

export const postCreateValidation = [
    body('text', 'Incorrect text format').isLength({ min: 5 }).isString(),
    body('tags', 'Incorrect tags').optional().isString(),
];