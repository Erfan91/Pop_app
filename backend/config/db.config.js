import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.URL_MONGO_DB)
    .then(() => console.log("connected to database"))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
}

export default connectDB