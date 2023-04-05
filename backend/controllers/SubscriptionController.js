import SubscriptionModel from '../models/Subscription.js'
import UserModel from '../models/User.js'


export const getAll = (req, res) => {
	try {
		SubscriptionModel.find(
			{
				user: req.userId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть подписки.',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Подписки не найдены.',
					})
				}
				res.json(doc)
			}
		)
			.populate('post')
			.populate('user')
			.limit(10)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить подписки.',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new SubscriptionModel({
			user: req.userId,
			channel: req.params.subscriptionId,
		})
		
		const subscription = await doc.save()

		UserModel.updateOne(
			{ _id: req.userId },
			{ $push: { subscriptionCount: subscription._id } }
		).exec()
		
		SubscriptionModel.find(
			{
				user: req.userId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть подписки.',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Подписки не найдена.',
					})
				}
				res.json(doc)
			}
		).populate('user')
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось добавить в подписки.',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const { subscriptionId } = req.params

		SubscriptionModel.findByIdAndDelete(subscriptionId, async (err, doc) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					message: 'Не удалось удалить статью из подписок.',
				})
			}
			if (!doc) {
				console.log(err)
				return res.status(404).json({
					message: 'Подписки не найдены.',
				})
			}

			await UserModel.findOneAndUpdate(
				{ _id: req.userId },
				{ $pullAll: { subscriptionCount: [subscriptionId] } },
				{ new: true },
				(err, _) => {
					if (err) {
						console.log(err)
						return res.status(500).json({
							message: 'Не удалось удалить статью из подписок.',
						})
					}
				}
			).clone()

			res.json({
				success: true,
			})
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить подписки.',
		})
	}
}