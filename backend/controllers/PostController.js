import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
	const sortingParam =
		req.query.sortBy === 'views' ? '-viewsCount' : '-createdAt'
	try {
		const posts = await PostModel.find()
			.populate('user')
			.sort(sortingParam)
			.exec()

		res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи.',
		})
	}
}

export const getAllByTag = async (req, res) => {
	const tag = req.params.tag
	try {
		const posts = await PostModel.find({ tags: tag })
			.populate('user')
			.sort('-viewsCount')
			.exec()

		res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи по тегу.',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findByIdAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: {
					viewsCount: 1,
				},
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть статью.',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена.',
					})
				}

				res.json(doc)
			}
		).populate('user')
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи.',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findByIdAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось удалить статью.',
					})
				}
				if (!doc) {
					console.log(err)
					return res.status(404).json({
						message: 'Статья не найдена.',
					})
				}
				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи.',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: !!req.body.tags.length ? req.body.tags.split(', ') : [],
			user: req.userId,
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать статью.',
		})
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags.split(', '),
				user: req.userId,
			}
		)

		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось изменить статью.',
		})
	}
}

export const getLastTags = async (req, res) => {
	try {
		const posts = await PostModel.find().limit(5).exec()

		const allTags = posts.map((post) => post.tags).flat()
		const uniqueTags = new Set(allTags)
		const tags = [...uniqueTags].slice(0, 5)

		res.json(tags)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить теги.',
		})
	}
}