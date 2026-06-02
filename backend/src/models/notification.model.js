import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',    
    },

    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    type: {
        type: String,
        enum: ['like', 'comment', 'follow'],
    },

    message: String,

    isRead: {   
        type: Boolean,
        default: false,
    },

}
,
{
    timestamps: true,
}
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;