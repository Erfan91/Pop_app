import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 30
        },

        username:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLength: 3,
            maxLength: 30,
            unique: true
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        number: {
            type: Number,
            minLength: 9,
            maxLength: 13
        },

        friends: {
            type: [mongoose.Types.ObjectId],
            ref: "User"
        }

    },

    {
        timestamps: true,    
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);