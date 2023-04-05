import mongoose from 'mongoose'

const FavoriteShema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		favorite: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Favorite', FavoriteShema)
