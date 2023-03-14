import CommentModel from '../models/Comment.js'

export const getAll = async (req,res) => {
    try {
        const comments = await CommentModel.find().populate('post').exec();

        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить комментарии',
        });
    }
};

export const getOne = async (req,res) => {
    try {
        const commentId = req.params.id;
    
        CommentModel.findOneAndUpdate(
          {
            _id: commentId,
          },
          {
            returnDocument: 'after',
          },
          (err, doc) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'Не удалось вернуть комментарий',
              });
            }
    
            if (!doc) {
              return res.status(404).json({
                message: 'Комментарий не найден',
              });
            }
    
            res.json(doc);
          },
        ).populate('post');
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить комментарий',
        });
      }
};

export const remove = async (req,res) => {
    try {
        const commentId = req.params.id;
    
        CommentModel.findOneAndDelete(
          {
            _id: commentId,
          },(err, doc) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'Не удалось удалить комментарий',
              });
            }
    
            if (!doc) {
              return res.status(404).json({
                message: 'Комментарий не найден',
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
 
export const create = async (req,res) => {
    try {
        const doc = new CommentModel({
            post: req.body.post,
            text: req.body.text,
            user: req.userId,
        });
        
        const comment = await doc.save();

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось создать комментарий',
        });
    }
};