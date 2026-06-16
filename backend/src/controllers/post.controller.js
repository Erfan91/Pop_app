import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { upload } from "../cloudinary/cloudinary.js";
import  Notification  from "../models/notification.model.js";
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
            .populate("ownerId", '_id name username image followers')
            .exec()
            .then(result => {
                res.status(200).json({ message: "operation successful", posts: result })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const getPostById = async (req, res, next) => {
    const _id = req.params.id;
    try {
        await Post.findById(_id)
            .populate("ownerId", '_id name username image ')
            .populate({
                path: "comments",
                populate: {
                    path: "ownerId",
                    model: "User"
                }
            })
            .sort({ createAt: -1 })
            .exec()
            .then(result => {   
                if (result) {
                    res.status(200).json({ message: "operation successful", post: result })
                }                               
                if (!result) {
                    res.status(400).json({ message: "post not found" })
                }       
           })
        } catch (error){
            res.status(500).json({ message: "Internal server error", error: error.message })
        } 
    }
const getUserPosts = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Post.find({ ownerId: id })
            .populate({ path: "ownerId", select: "_id name username image followers" })
            .sort({ createAt: -1 })
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({ message: "user posts found", state: true, posts: result })
                }
                if (!result) {
                    res.status(400).json({ message: "Wrong user id or doesn't have any post yet " })
                }
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const getUserPics = async (req, res, next) => {
    const id = req.params.id;
    try {
        Post.find({ ownerId: id })
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({ message: "user pics found", state: true, pics: result })
                }
                if (!result) {
                    res.status(400).json({ message: "Wrong user id or doesn't have any pic post yet " })
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

const addLike = async (req, res, next) => {
    const _id = req.body.postId;
    try {
        await Post.findById({ likes: { $in: req.body.userId }, _id: _id })
            .then(result => {
                if(result.likes.includes(req.body.userId)){
                    Post.updateOne({_id: _id},{$pull : {likes: req.body.userId}}, {new: true})
                    .then(resp =>{
                        res.status(200).json({message: "like removed", state: false})
                    })
                } else {
                    Post.updateOne({_id: _id},{$push : {likes: req.body.userId}}, {new: true})
                    .then(resp =>{
                         Notification.create({
                            recipient: result.ownerId,
                            sender: req.body.userId,
                            type: 'like',
                            message: ' liked your post'
                        })
                        .then(notification => {
                            if (!notification) {
                                res.status(400).json({ message: "notification could not be created" })
                            }
                            User.findByIdAndUpdate(result.ownerId, { $push: { notifications: notification._id } }, { new: true })
                                .then(user => {
                                    if (!user) {
                                        res.status(400).json({ message: "user not found, notification not linked to user" })
                                    }
                                })   
                        })
                        
                        res.status(200).json({message: "like added", state: true})
                    })
                }

            })


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const getFollowingMoods = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        const following = currentUser.following

        const usersWithMood = await User.find({
            _id: { $in: following },
            mood: { $exists: true, $ne: null }
        }).select('_id username name image mood')

        const result = usersWithMood.map(u => ({
            mood: u.mood,
            user: { _id: u._id, username: u.username, name: u.name, image: u.image }
        }))

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch moods', error })
    }
}


const deletePost = async (req, res, next) => {
    const _id = req.params.id;
    await Post.findByIdAndDelete(_id)
        .then(result => {
            !result ? res.status(400).json({ message: "Post not found" }) : res.status(200).json({ message: "Post deleted successfuly" })
        });
}


// const uploadImage = (req, res, next) => {
//     upload(req, res, function (err) {
//         if (err) {
//             res.status(500).json({ message: "Image upload failed", error: err.message, state: false });
//         } else {
//             res.status(201).json({ url: "http://localhost:3001/images/" + imageName, state: true });
//         }
//     })
// }

const uploadImage = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            console.log("ERORORO ", err)
            return res.status(500).json({ message: "Image upload failed", error: err.message })
        }
        res.status(201).json({ url: req.file.path, state: true })
    })
}

export {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    uploadImage,
    getUserPosts,
    getUserPics,
    addLike
}