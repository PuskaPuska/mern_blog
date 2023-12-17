import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import {
	registerValidation,
	loginValidation,
	postCreateValidation,
	commentCreateValidation,
} from './validations.js'

import {checkAuth, handleValidationErrors} from './utils/index.js';

import {UserController, PostController, CommentController, FavoriteController, SubscriptionController} from './controllers/index.js'

//'mongodb+srv://admin:wwwwww@cluster0.0rb4kem.mongodb.net/?retryWrites=true&w=majority'
//process.env.MONGODB_URI

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({    
    destination: (_, __, cb) => {  
			if (!fs.existsSync('uploads')){
				fs.mkdirSync('uploads');
			}
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

app.get('/tags', PostController.getLastTags);
app.get('/tags/:tag', PostController.getAllByTag)

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
	'/posts/:id',
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.update
)

app.get('/comments/:postId', CommentController.getPostComments);
app.get('/comments', CommentController.getLastComments);
app.post(
	'/comments/:postId',
	checkAuth,
	commentCreateValidation,
	handleValidationErrors,
	CommentController.create
);
app.patch(
	'/comments/:commentId',
	checkAuth,
	commentCreateValidation,
	handleValidationErrors,
	CommentController.update
);
app.delete('/comments/:commentId', checkAuth, CommentController.remove);

app.get('/favorites', checkAuth, FavoriteController.getAll);
app.post('/favorites/:favoriteId', checkAuth, FavoriteController.create)
app.delete('/favorites/:favoriteId', checkAuth, FavoriteController.remove)

app.get('/subscriptions', checkAuth, SubscriptionController.getAll);
app.post(
	'/subscriptions/:subscriptionId',
	checkAuth,
	SubscriptionController.create
)
app.delete(
	'/subscriptions/:subscriptionId',
	checkAuth,
	SubscriptionController.remove
)

app.listen(process.env.PORT || 4444, (err)=> {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
});

