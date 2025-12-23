import { Comment } from "../models/comment.model.js";

const createComment = async (req, res, next) => {
    try {
        const {ownerId, text, content, postId} = req.body;
        if(!ownerId || !postId){
            res.status(400).json({message: "owner _id and post _id is required"})
        }

        if(!text || !content){
            res.status(400).json({message: "comment must at least contain text or media image/video"});
        }

        await Comment.create(req.body)
        .then(result=>{
            res.status(200).json({message: "comment created succefuly", detail: result})
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

const getComment = async (req, res, next) => {
    try {
        await Comment.find({ownerId: req.params.id})
        .exec()
        .then(result=>{
            if(!result){
                res.status(400).json({message: "owner id not registred or incorrect"});
            }

            res.status(200).json({message: "user comments", comments: result});
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

const editComment = async (req, res, next) => {
    const {text} = req.body
    try {
        await Comment.findOneAndUpdate({ownerId: req.params.id}, {text}, {new: true})
        .exec()
        .then(result=>{
            if(!result){
                res.status(400).json({message: "owner id incorrect or not registred"})
            }
            res.status(200).json({message: "comment edited successfuly"});
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
};

const deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        .exec()
        .then(result=>{
            if(!result){
                res.status(400).json({message: "comment id incorrect or not registred"})
            }
            res.status(200).json({message: "comment deleted successfuly"})
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
};



export {
    createComment,
    getComment,
    editComment,
    deleteComment
}