import { User } from "../models/user.model.js";
import  Notification  from "../models/notification.model.js";

const getNotifications = async (req, res, next) => {
    const userId = req.params.id;
    try {
        await Notification.find({ recipient: userId })
            .populate("sender", "name username image")
            .exec()
            .then(result => {
                res.status(200).json({ message: "Notifications found", notifications: result })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const markAsRead = async (req, res, next) => {
    const notificationId = req.params.id;   
    try {
        await  Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true })
            .exec()
            .then(result => {  
                if (result) {
                    res.status(200).json({ message: "Notification marked as read", notification: result })
                } else {
                    res.status(404).json({ message: "Notification not found" })
                }
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }           
}

const deleteNotification = async (req, res, next) => {
    const notificationId = req.params.id;
    try {
        await Notification.findByIdAndDelete(notificationId)
            .exec()
            .then(result => {       
                if (result) {
                    res.status(200).json({ message: "Notification deleted" })
                }

                if (!result) {
                    res.status(404).json({ message: "Notification not found" })
                }       
            })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}


export{
    getNotifications,
    markAsRead,
    deleteNotification
}