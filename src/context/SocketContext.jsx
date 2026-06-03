import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const id = localStorage.getItem('_id');
    const userId = JSON.parse(JSON.stringify(id));

    useEffect(() => {
        if (!userId) return

        const newSocket = io("http://localhost:3001", {
            withCredentials: true
        })


        newSocket.on("connect", () => {
            newSocket.emit("register", userId)
        })

        setSocket(newSocket)


        return () => newSocket.disconnect()

    }, [userId])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}