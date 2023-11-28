import { body } from 'express-validator';

export const registrationValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Incorrect password format').isLength({ min: 5 }),
    body('fullName', 'Incorrect name format').isLength({ min: 3 }),
    body('avatarUrl', 'Incorrect avatar link format').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Incorrect password format').isLength({ min: 5 }),
];