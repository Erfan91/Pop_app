import { Post } from "../models/post.model.js";

const createPost = async (req, res, next) => {

    try {
        const { ownerId, description, content } = req.body;
        if (!ownerId || !description || !content) {
            res.status(400).json({ message: "owner id is required, post must contain desc or content/image/video" })

        }

        await Post.create(req.body)
        .then(result=>{
            res.json({message: "post created", postDetail: result})
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }


}

export{
    createPost
}