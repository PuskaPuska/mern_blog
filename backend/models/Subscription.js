import mongoose from 'mongoose';

const SubscriptionShema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
);

export default mongoose.model('Subscription', SubscriptionShema);