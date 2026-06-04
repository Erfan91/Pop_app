import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "config/.env") });
import path from "path";
import express from "express";
import connectDB from "../config/db.config.js";
import { createServer } from "http"
import { initSocket } from "./socket/socket.js"
import cors from "cors";
const app = express();
const port = 3001 || process.env.PORT;
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import notificationRouter from "./routes/notification.route.js";
import messageRouter from "./routes/message.route.js";
import passport from "passport";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/notification", notificationRouter);
app.use("/message", messageRouter);
app.use("/images",express.static('images'));


//app.use("./images", express.static('images'))




const startServer = async () => {
    try {
        await connectDB();
        const httpServer = createServer(app);
        initSocket(httpServer);
        
        httpServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
       
    } catch (error) {
        console.log("connection failed", error)
    }

}

startServer()