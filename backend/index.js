import express from 'express';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import {registerValidation, loginValidation, postCreateValidation, commentCreateValidation} from './validations.js';

import {checkAuth, handleValidationErrors} from './utils/index.js';

import {UserController, PostController, CommentController, FavoriteController, SubscriptionController} from './controllers/index.js'

mongoose.connect(
    'mongodb+srv://admin:wwwwww@cluster0.0rb4kem.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null,'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req,res)=> {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.get('/comments', CommentController.getAll);
app.get('/comments/:id', CommentController.getOne);
app.post('/comments', checkAuth, commentCreateValidation, CommentController.create);
app.delete('/comments/:id', checkAuth, CommentController.remove);

app.get('/favorits', checkAuth, FavoriteController.getAll);
app.post('/favorits', checkAuth, FavoriteController.create);
app.delete('/favorits/:id', checkAuth, FavoriteController.remove);

app.get('/subscriptions', checkAuth, SubscriptionController.getAll);
app.post('/subscriptions', checkAuth, SubscriptionController.create);
app.delete('/subscriptions/:id', checkAuth, SubscriptionController.remove);

app.listen(4444, (err)=> {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
});

