import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const createAccount = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name, !username, !email, !password) {
            return res.status(400).json({ message: "All feilds are required" })
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ state: false, message: "email already exists" })
        }

        await User.create(req.body)
            .then(result => {
                res.status(201).json({
                    message: "user created successfuly",
                    user: result,
                    state: true,
                })
            })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const emailExists = async (req, res, next) => {
    const { email } = req.body;
    try {
        await User.findOne({ email: email.toLowerCase() })
            .exec()
            .then(result => {
                if (!result) {
                    res.status(400).json({ state: false, message: "Email not found" });
                }
                res.status(200).json({ state: true, message: "Email match " });
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const usernameExists = async (req, res, next) => {
    try {
        const { username } = req.body;
        await User.findOne({ username })
            .exec()
            .then(user => {
                if (user) {
                    res.status(400).json({ message: "username already exists", state: false })
                }
                res.status(200).json({ message: "username available", state: true })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const loginUser = async (req, res, next) => {
    try {
        const body = req.body;

        const user = await User.findOne({
            email: body.email.toLowerCase(),
        })

        if (!user) {
            res.status(400).json({ message: "Email not found", state: false })
        }

        const isMatch = await user.comparePassword(body.password);
        if (!isMatch) {
            res.status(400).json({ message: "incorrect password", state: false })
        }

        res.status(200).json({
            message: "login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username, 
                name: user.name,
                firstLogin: user.firstLogin,
            },
            state: true,
            login: true
        })


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}


const resetPassword = async (req, res, next) => {
    const { email, password } = req.body;
    const hashshedPassword = await bcrypt.hash(password, 10) 
    try {
        await User.findOneAndUpdate({email}, {password: hashshedPassword}, { new: true })
            .exec()
            .then(result => {
                if(!result){
                    res.status(400).json({result, state: false});
                }
                res.status(200).json({state: true, message: "password updated successfuly"})
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }

}

const updateUser = async (req, res, next) => {
    try {
        const { password } = req.body;

        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            res.status(400).json({ message: "incorrect password" })
        }

        await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(result => {
                res.status(200).json({ message: "updated yes", detail: result })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: "incorrect password" })
        }

        await User.findByIdAndDelete(req.params.id)
            .then(result => {
                res.status(200).json({ message: "user deleted successfuly" })
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
}

export {
    createAccount,
    loginUser,
    updateUser,
    deleteUser,
    usernameExists,
    emailExists,
    resetPassword
}