import mongoose from 'mongoose';

const CommentShema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Comment',CommentShema);