import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        ownerId : {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },

        decription: String,

        content : String,
         
        likes : {
            type: [mongoose.Types.ObjectId],
            ref: 'User'
        },

        comments: {
            type: [mongoose.Types.ObjectId],
            ref: "User"
        }

    }
)

export const Post = mongoose.model("Post", postSchema);