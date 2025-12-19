import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },

        text: String,
        content: String,

        postId: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    },

    {
        timestamps: true,
    }
);

export const Comment = mongoose.model("Comment", commentSchema);