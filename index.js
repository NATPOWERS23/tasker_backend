import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv'

import { taskCreateValidation } from './backend/validations/task.js'
import { postCreateValidation } from './backend/validations/post.js'
import { UserController, TasksController, PostsController } from './backend/controllers/index.js'
import { checkAuth, handleValidationErrors } from './backend/utils/index.js';
import { registrationValidation, loginValidation } from './backend/validations/auth.js';

dotenv.config()
const monoUrl = process.env.MONGO_URL;

mongoose
    .connect(monoUrl)
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB'))
    .catch((err) => console.log('DB error: ', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/registration', registrationValidation, handleValidationErrors, UserController.registration);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    console.log(req)
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/tasks', TasksController.getAllTasks);
app.get('/tasks/:id', TasksController.getTaskById);
app.post('/tasks', checkAuth, taskCreateValidation, handleValidationErrors, TasksController.createTask);
app.delete('/tasks/:id', checkAuth, TasksController.deleteTask);
app.patch('/tasks/:id', checkAuth, taskCreateValidation, handleValidationErrors, TasksController.updateTask);

app.get('/posts', PostsController.getAllPosts);
app.get('/posts/:id', PostsController.getPostById);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostsController.createPost);
app.delete('/posts/:id', checkAuth, PostsController.deletePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostsController.updatePost);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});