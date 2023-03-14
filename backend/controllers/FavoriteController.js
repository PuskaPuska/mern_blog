import FavoriteModel from '../models/Favorite.js'
import PostModel from '../models/Post.js'
import { getPost } from './PostController.js';

export const getAll = async (req,res) => {
    try {
        const favorite = await FavoriteModel.find({ user: req.userId });
        //console.log(favorite.at(0).post);
        const posts = await PostModel.findById(favorite.at(0).post).exec();
       
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить избранные статьи',
        });
    }
};

export const create = async (req,res) => {
    try {
        const doc = new FavoriteModel({
            post: req.body.post,
            user: req.userId,
        });
        
        const favorite = await doc.save();

        res.json(favorite);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось добавить в избранное',
        });
    }
};

export const remove = async (req,res) => {
    try {
        const favoriteId = req.params.id;
    
        FavoriteModel.findOneAndDelete(
          {
            _id: favoriteId,
          },(err, doc) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'Не удалось удалить статью из избранных',
              });
            }
    
            if (!doc) {
              return res.status(404).json({
                message: 'Статья не найдена',
              });
            }
    
            res.json({
                success: true,
            });
          },
        );
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить комментарий',
        });
      }
};