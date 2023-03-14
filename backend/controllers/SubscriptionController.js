import SubscriptionModel from '../models/Subscription.js'
import PostModel from '../models/Post.js'

export const getAll = async (req,res) => {
    try {
        const subscriptions = await SubscriptionModel.find().populate('user').exec();

        res.json(subscriptions);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось получить подписки',
        });
    }
};

export const create = async (req,res) => {
    try {
        const doc = new SubscriptionModel({
            user: req.userId,
            channel: req.body.channel,
        });
        
        const subscription = await doc.save();

        res.json(subscription);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось добавить в подписки',
        });
    }
};

export const remove = async (req,res) => {
    try {
        const subscriptionId = req.params.id;
    
        SubscriptionModel.findOneAndDelete(
          {
            _id: subscriptionId,
          },(err, doc) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'Не удалось удалить канал из подписок',
              });
            }
    
            if (!doc) {
              return res.status(404).json({
                message: 'Канал не найден',
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
          message: 'Не удалось получить канал',
        });
      }
};