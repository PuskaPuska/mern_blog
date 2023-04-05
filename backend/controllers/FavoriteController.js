import FavoriteModel from '../models/Favorite.js'
import UserModel from '../models/User.js'

export const getAll = (req, res) => {
	try {
		FavoriteModel.find(
			{
				user: req.userId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть избранные статьи.',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Избранные не найдены.',
					})
				}
				res.json(doc)
			}
		)
			.populate('user')
			.sort('createdAt')
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи.',
		})
	}
}

export const create = async (req, res) => {
	try {
		console.log(req.userId, req.params.favoriteId)
		const doc = new FavoriteModel({
			user: req.userId,
			favorite: req.params.favoriteId,
		})
		console.log('good')
		const favorite = await doc.save()
		console.log('job')
		UserModel.updateOne(
			{ _id: req.userId },
			{ $push: { favoriteCount: favorite._id } }
		).exec()

		FavoriteModel.find(
			{
				user: req.userId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть избранное.',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Избранное не найдена.',
					})
				}
				res.json(doc)
			}
		).populate('user')
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось добавить в избранное.',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const { favoriteId } = req.params

		FavoriteModel.findByIdAndDelete(favoriteId, async (err, doc) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					message: 'Не удалось удалить статью из избранных.',
				})
			}
			if (!doc) {
				console.log(err)
				return res.status(404).json({
					message: 'Статья не найдена.',
				})
			}

			await UserModel.findOneAndUpdate(
				{ _id: req.userId },
				{ $pullAll: { favoriteCount: [favoriteId] } },
				{ new: true },
				(err, _) => {
					if (err) {
						console.log(err)
						return res.status(500).json({
							message: 'Не удалось удалить статью из избранных.',
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
			message: 'Не удалось получить избранные.',
		})
	}
}
