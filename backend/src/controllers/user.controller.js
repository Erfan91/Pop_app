import {User} from "../models/user.model.js";

const createAccount = async (req, res) => {
    try {
        const {name, username, email, password} = req.body;

        if(!name, !username, !email, !password){
            return res.status(400).json({message: "All feilds are required"})
        }

        const existing = await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message: "email already exists"})
        }

        User.create(req.body)
        .then(result=>{
            res.status(201).json({
                message: "user created successfuly",
                user: result
            })
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}




export {
    createAccount
}