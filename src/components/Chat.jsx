import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useLocation } from "react-router-dom";

const Chat = () => {
    const location = useLocation()
    const { socket } = useSocket()
    const [selectedUser, setSelectedUser] = useState(location.state?.selectedUser || null)
    const [inbox, setInbox] = useState([])
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState("")
    const id = localStorage.getItem('_id');
    const currentUser = JSON.parse(JSON.stringify(id));
    const bottomRef = useRef(null)

    
    useEffect(() => {
        fetch("http://localhost:3001/message/inbox", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setInbox(data))
            .catch(err => console.log(err))
    }, [])

    
    useEffect(() => {
        if (!selectedUser) return

        fetch(`http://localhost:3001/message/${selectedUser._id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.log(err))
    }, [selectedUser])

    
    useEffect(() => {
        if (!socket) return

        socket.on("receiveMessage", (message) => {
            
            if (
                message.sender === selectedUser?._id ||
                message.receiver === selectedUser?._id
            ) {
                setMessages(prev => [...prev, message])
            }

            
            setInbox(prev => prev.map(conv =>
                conv.user._id === message.sender
                    ? { ...conv, lastMessage: message }
                    : conv
            ))
        })

        socket.on("messageSent", (message) => {
            setMessages(prev => [...prev, message])
        })

        return () => {
            socket.off("receiveMessage")
            socket.off("messageSent")
        }
    }, [socket, selectedUser])

    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = () => {
        if (!content.trim() || !selectedUser) return

        socket.emit("sendMessage", {
            senderId: currentUser,
            receiverId: selectedUser._id,
            content
        })

        setContent("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage()
    }

    return (
        <div className="chat-container">

        
            <div className="chat-sidebar">
                <h2>Messages</h2>
                {inbox.length === 0 && <p>No conversations yet</p>}
                {inbox.map((conv) => (
                    <div
                        key={conv.user._id}
                        className={`conv-item ${selectedUser?._id === conv.user._id ? "active" : ""}`}
                        onClick={() => setSelectedUser(conv.user)}
                    >
                        <img
                            src={conv.user.image?.[0] || "/default-avatar.png"}
                            alt={conv.user.username}
                            className="conv-avatar"
                        />
                        <div className="conv-info">
                            <span className="conv-username">{conv.user.username}</span>
                            <span className="conv-last">
                                {conv.lastMessage?.content || ""}
                            </span>
                        </div>
                        {!conv.lastMessage?.seen &&
                            conv.lastMessage?.receiver === currentUser && (
                                <span className="conv-dot" />
                            )}
                    </div>
                ))}
            </div>

            {/* CHAT WINDOW */}
            <div className="chat-window">
                {!selectedUser ? (
                    <div className="chat-empty">
                        <p>Select a conversation</p>
                    </div>
                ) : (
                    <>
                        
                        <div className="chat-header">
                            <img
                                src={selectedUser.image?.[0] || "/default-avatar.png"}
                                alt={selectedUser.username}
                                className="conv-avatar"
                            />
                            <span>{selectedUser.username}</span>
                        </div>

                        
                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`message ${msg.sender === currentUser ? "sent" : "received"}`}
                                >
                                    <p>{msg.content}</p>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Chat