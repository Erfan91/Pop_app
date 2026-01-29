import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        ownerId : {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },

        decription: String,

        content : [String],

        //  mood is something new, this effect is chosen by user when creating post,
        //  then the mood animation appears seconds before the content to other 
        //  users to express the mood they are in then the content/photo/video/text appears  
        mood: [String],
         
        likes : {
            type: [mongoose.Types.ObjectId],
            ref: 'User'
        },


        // users could comment back with mood anims already created, these comments hold a block section to appear on top of eachother like showroom
        comments: {
            type: [mongoose.Types.ObjectId],
            ref: "User"
        }

    }
)

export const Post = mongoose.model("Post", postSchema);