import { Message } from "../models/message.model.js"
import mongoose from "mongoose";

export const getConversation = async (req, res) => {
    const { id } = req.params
    const currentUser = new mongoose.Types.ObjectId(req.user._id);
    const otherUser = new mongoose.Types.ObjectId(id);

    try {
        const messages = await Message.find({
            $or: [
                { sender: currentUser, receiver: otherUser },
                { sender: otherUser, receiver: currentUser }
            ]
        }).sort({ createdAt: 1 }) 

       
        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch conversation", error })
    }
}


export const getInbox = async (req, res) => {
    const currentUser = new mongoose.Types.ObjectId(req.user._id)

    try {
        const messages = await Message.aggregate([ // lets you transform, group, join, reshape data through a pipeline of stages
            {
                $match: {
                    $or: [
                        { sender: currentUser },
                        { receiver: currentUser }
                    ]
                }
            },
            { $sort: { createdAt: -1 } },
            {
                $group: { // group the converstaion by the other user id 
                    _id: { // will be used to group the messages by the other user in the conversation 
                        $cond: [
                            { $eq: ["$sender", currentUser] },
                            "$receiver",
                            "$sender"
                        ]
                    },
                    lastMessage: { $first: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    "user.password": 0 
                }
            }
        ])
        

        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch inbox", error })
    }
}