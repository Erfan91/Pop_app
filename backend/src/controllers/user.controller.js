import { User } from "../models/user.model.js";

const createAccount = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name, !username, !email, !password) {
            return res.status(400).json({ message: "All feilds are required" })
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "email already exists" })
        }

        User.create(req.body)
            .then(result => {
                res.status(201).json({
                    message: "user created successfuly",
                    user: result
                })
            })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const body = req.body;

        const user = await User.findOne({
            email: body.email.toLowerCase(),
        })
    
                if (!user) {
                    res.status(400).json({ message: "Email not found" })
                }

        const isMatch = await user.comparePassword(body.password);
        if (!isMatch) {
            res.status(400).json({ message: "incorrect password" })
        }

        res.status(200).json({
            message: "login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}


const updateUser = async (req, res, next) => {
    try {
        const { password } = req.body;

        const user = await User.findById( req.params.id)
            if (!user) {
                res.status(400).json({ message: "user not found" })
            }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            res.status(400).json({ message: "incorrect password" })
        }
        
        await User.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then(result=>{
            res.status(200).json({message: "updated yes", detail: result})
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const {password} = req.body;
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(400).json({message: "user not found"})
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(400).json({ message: "incorrect password" })
        }

       await User.findByIdAndDelete(req.params.id)
        .then(result=>{
            res.status(200).json({message: "user deleted successfuly"})
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        
    }
}

export {
    createAccount,
    loginUser,
    updateUser,
    deleteUser
}