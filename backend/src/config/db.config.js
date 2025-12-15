import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect("mongodb://0.0.0.0:27017/popProject")
    .then(() => console.log("connected to database"))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
}

export default connectDB