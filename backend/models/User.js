import mongoose from 'mongoose';

const UserShema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatarUrl: String,
		favoriteCount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
		subscriptionCount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User',UserShema);