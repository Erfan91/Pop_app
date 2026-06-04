import { Server } from "socket.io"
import { Message } from "../models/message.model.js"

// Store online users: userId -> socketId
const onlineUsers = new Map()

export const initSocket = (httpServer) => {
    // started a socket.io server, allowing CORS from our React app
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    })
    // Handle user connections
    io.on("connection", (socket) => {
        console.log("user connected:", socket.id)

        // User registers themselves as online
        socket.on("register", (userId) => {
            onlineUsers.set(userId, socket.id)
            console.log("online users:", [...onlineUsers])
        })

        // Handle sending a message
        socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
            try {
                // Save to DB
                const message = await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    content,
                    seen: false
                })

                // Send to receiver if online
                const receiverSocketId = onlineUsers.get(receiverId)
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", message)
                }

                // Confirm back to sender
                socket.emit("messageSent", message)

            } catch (error) {
                socket.emit("messageError", { error: "Message failed to send" })
            }
        })

        // Mark message as seen
        socket.on("markSeen", async ({ messageId, senderId }) => {
            try {
                await Message.findByIdAndUpdate(messageId, { seen: true })

                // Notify sender their message was seen
                const senderSocketId = onlineUsers.get(senderId)
                if (senderSocketId) {
                    io.to(senderSocketId).emit("messageSeen", { messageId })
                }
            } catch (error) {
                console.log("markSeen error:", error)
            }
        })

        // Cleanup on disconnect
        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId)
                    break
                }
            }
            console.log("user disconnected:", socket.id)
        })
    })

    return io
}