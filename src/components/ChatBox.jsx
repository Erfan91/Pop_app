import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { IoClose, IoArrowBack, IoArrowUpCircleSharp } from "react-icons/io5";

const ChatBox = ({ display, onClose, initialUser = null }) => {
    const { socket } = useSocket()
    const [selectedUser, setSelectedUser] = useState(null)
    const [inbox, setInbox] = useState([])
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState("")
    const [myMood, setMyMood] = useState(null)
    const id = localStorage.getItem('_id');
    const currentUser = JSON.parse(JSON.stringify(id));
    const bottomRef = useRef(null)

    const moodColors = {
        fire: ['#ff4e00', '#ec9f05'],
        chill: ['#00d2ff', '#3a7bd5'],
        lit: ['#f9ca24', '#f0932b'],
        wavy: ['#2193b0', '#6dd5ed'],
        vibes: ['#a855f7', '#6366f1'],
        love: ['#ff416c', '#ff4b2b'],
        grind: ['#f7971e', '#ffd200'],
        moody: ['#2c3e50', '#4ca1af'],
        glowing: ['#f6d365', '#fda085'],
        rainy: ['#4e54c8', '#8f94fb'],
    }

    const getSplitBg = (otherMood, myMood) => {
        const top = moodColors[otherMood] || ['#0d1b2e', '#0d1b2e']
        const bottom = moodColors[myMood] || ['#0d1b2e', '#0d1b2e']
        return `linear-gradient(90deg, ${top[0]} 0%, ${top[1]} 48%, ${bottom[0]} 52%, ${bottom[1]} 100%)`
    }


    useEffect(() => {
        fetch(`http://localhost:3001/user/user-info/${currentUser}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.user?.mood) setMyMood(data.user.mood)
            })
            .catch(err => console.log(err))
    }, [])


    const loadInbox = () => {
        fetch(`http://localhost:3001/message/inbox`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setInbox(Array.isArray(data) ? data : []))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (display) loadInbox()
    }, [display])

    // When opened with a target user (e.g. the "Message" button on a profile),
    // jump straight into that user's conversation.
    useEffect(() => {
        if (display && initialUser?._id) openConversation(initialUser)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [display, initialUser])

    const openConversation = (user) => {
        setSelectedUser(user)
        fetch(`http://localhost:3001/message/${user._id}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setMessages(data)
                data.forEach(msg => {
                    if (!msg.seen && msg.receiver === currentUser) {
                        socket.emit("markSeen", { messageId: msg._id, senderId: msg.sender })
                    }
                })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!socket) return

        socket.on("receiveMessage", (message) => {
            if (message.sender === selectedUser?._id || message.receiver === selectedUser?._id) {
                setMessages(prev => [...prev, message])
                if (message.receiver === currentUser) {
                    socket.emit("markSeen", { messageId: message._id, senderId: message.sender })
                }
            }
            setInbox(prev => prev.map(conv =>
                conv.user._id === message.sender ? { ...conv, lastMessage: message } : conv
            ))
        })

        socket.on("messageSent", (message) => {
            setMessages(prev => [...prev, message])
        })

        socket.on("messageSeen", ({ messageId }) => {
            setMessages(prev => prev.map(msg =>
                msg._id === messageId ? { ...msg, seen: true } : msg
            ))
        })

        return () => {
            socket.off("receiveMessage")
            socket.off("messageSent")
            socket.off("messageSeen")
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
        <div className={`chatbox-panel ${display ? "chatbox-open" : ""}`}>

            {/* INBOX VIEW */}
            <div className="chatbox-header">
                <span className="chatbox-title">Messages</span>
                <IoClose className="chatbox-close" onClick={onClose} />
            </div>

            <div className="chatbox-inbox">
                {inbox.length === 0 && <p className="chatbox-empty">No conversations yet</p>}
                {inbox.map((conv) => (
                    <div
                        key={conv.user._id}
                        className="chatbox-conv-item"
                        onClick={() => openConversation(conv.user)}
                    >
                        <img
                            src={conv.user.image?.[0] || "/default-avatar.png"}
                            alt={conv.user.username}
                            className="chatbox-conv-avatar"
                        />
                        <div className="chatbox-conv-info">
                            <span className="chatbox-conv-username">{conv.user.username}</span>
                            <span className="chatbox-conv-last">{conv.lastMessage?.content || ""}</span>
                        </div>
                        {!conv.lastMessage?.seen && conv.lastMessage?.receiver === currentUser && (
                            <span className="chatbox-conv-dot" />
                        )}
                    </div>
                ))}
            </div>

            {/* CONVERSATION VIEW — covers the inbox */}
            <div className={`chatbox-conversation ${selectedUser ? "chatbox-conv-open" : ""}`}>
                {selectedUser && (
                    <>
                        <div className="chatbox-conv-header">
                            <IoArrowBack className="chatbox-back" onClick={() => setSelectedUser(null)} />
                            <img
                                src={selectedUser.image?.[0] || "/default-avatar.png"}
                                alt={selectedUser.username}
                                className="chatbox-conv-avatar"
                            />
                            <span className="chatbox-conv-username">{selectedUser.username}</span>
                        </div>

                        <div
                            className={`chatbox-messages mood-bg-${selectedUser.mood} || 'moody`}
                            // style={{ background: getSplitBg(selectedUser.mood, myMood) }}
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`chatbox-message ${msg.sender === currentUser ? "sent" : "received"}`}
                                >
                                    <p>{msg.content}</p>
                                    <div className="chatbox-message-meta">
                                        <span className="chatbox-message-time">
                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                        {msg.sender === currentUser && (
                                            <span className="chatbox-message-seen">{msg.seen ? "✓✓" : "✓"}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        <div className="chatbox-input">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className={content.trim() ? "chatbox-send" : "chatbox-send chatbox-send-off"}
                                onClick={sendMessage}
                            >
                                <IoArrowUpCircleSharp />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ChatBox