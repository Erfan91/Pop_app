import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import cors from "cors";
const app = express();
const port = 3001 || process.env.PORT;
dotenv.config({
    path: "./.env"
});
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import passport from "passport";

app.use(express.json());
// app.use(session(
//     {
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true
//     }
// ))
// app.use(cookieParser("secretcode"));
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/images",express.static('images'));


//app.use("./images", express.static('images'))




const startServer = async () => {
    try {
        await connectDB();
        app.on("eroor", (err) => {
            console.log("error", err);
            throw err;
        });
        app.listen(process.env.PORT || 3001, ()=>{
            console.log("server is running on port :", port)
        })
    } catch (error) {
        console.log("connection failed", err)
    }

}

startServer()