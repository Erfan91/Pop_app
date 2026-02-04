import { Post } from "../models/post.model.js";
import multer from "multer";
import path from "path";

const createPost = async (req, res, next) => {

    try {
        const { ownerId, description, content } = req.body;
        if (!ownerId || !description || !content) {
            res.status(400).json({ message: "owner id is required, post must contain desc or content/image/video" })

        }

        await Post.create(req.body)
            .then(result => {
                res.json({ message: "post created", postDetail: result, state: true })
            });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }


}
const getPost = async (req, res, next) => {
    try {
        await Post.find()
            .exec()
            .then(result => {
                res.status(200).json({ message: "operation successful", posts: result })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const getUserPosts = async (req, res, next) =>{
    try {
        const id = req.params.id;
       await Post.find({ownerId: id})
        .populate("ownerId")
        .sort({createAt: -1})
        .exec()
        .then(result => {
            if(result){
                res.status(200).json({message: "user posts found", state: true, posts: result})
            }
            if(!result){
                res.status(400).json({message: "Wrong user id or doesn't have any post yet "})
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}


const updatePost = async (req, res, next) => {
    try {
        const _id = req.params.id;
        await Post.findByIdAndUpdate(_id, req.body, { new: true })
            .then(result => {
                console.log(result)
                !result ? res.status(400).json({ message: "Post not found", state: false }) : res.status(200).json({ message: "Post updated successfuly", state: true })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

const deletePost = async (req, res ,next) => {
    const _id = req.params.id;
    await Post.findByIdAndDelete(_id)
    .then(result=>{
        !result ? res.status(400).json({ message: "Post not found" }) : res.status(200).json({ message: "Post deleted successfuly" })
    });
}

let imageName = "";
const storage = multer.diskStorage({
    destination: path.join("./images"),
    filename: function (req, file, cb) {
        imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName)
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 }, // 3MB limit
}).single("myImage");


const uploadImage = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(500).json({ message: "Image upload failed", error: err.message, state: false });
        } else {
            res.status(201).json({ url: "http://localhost:3001/images/" + imageName, state: true });
        }
    })
}

export {
    createPost,
    getPost,
    updatePost,
    deletePost,
    uploadImage,
    getUserPosts
}