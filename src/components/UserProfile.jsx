import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import UserPosts from "./profile-nav-comps/UserPosts";
import UserPics from "./profile-nav-comps/UserPics";
import CommentSection from "./CommentSection";
import MoodBubble from "./MoodAnimations";
import ChatBox from "./ChatBox";

const UserProfile = () => {
    const { id } = useParams()
    const currentUser = localStorage.getItem("_id")

    const [user, setUser] = useState(null)
    const [userMood, setUserMood] = useState(null)
    const [posts, setPosts] = useState([])
    const [pics, setPics] = useState([])
    const [activeTab, setActiveTab] = useState("posts")
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(true);

    const [postId, setPostId] = useState(null);
    const [commentDisplay, setCommentDisplay] = useState("none");
    const [userPicsDisplay, setUserPicsDisplay] = useState("none");
    const [chatDisplay, setChatDisplay] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:3001/user/user-info/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.state) {
                    setUser(data.user)
                    setIsFollowing(data.user.followers.includes(currentUser))
                    if (data.user.mood) setUserMood(data.user.mood)
                }
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])


    useEffect(() => {
        fetch(`http://localhost:3001/post/user-posts/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setPosts(data.posts))
            .catch(err => console.log(err))
    }, [id])

    // Fetch pics
    useEffect(() => {
        fetch(`http://localhost:3001/post/user-pics/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setPics(data.pics))
            .catch(err => console.log(err))
    }, [id])

    const handleFollow = () => {
        fetch("http://localhost:3001/user/add-follow", {
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                followerId: currentUser,
                followedId: id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.state) {
                    setIsFollowing(true)
                    setUser(prev => ({
                        ...prev,
                        followers: [...prev.followers, currentUser]
                    }))
                }
            })
    }

    const handleUnfollow = () => {
        fetch("http://localhost:3001/user/remove-follower", {
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                followerId: currentUser,
                followingId: id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.state) {
                    setIsFollowing(false)
                    setUser(prev => ({
                        ...prev,
                        followers: prev.followers.filter(f => f !== currentUser)
                    }))
                }
            })
    }

    const handleMessage = () => {
        setChatDisplay(true)
    }

    const userPostsProps = {
        posts,
        setPostId,
        className: "userProfile-posts-main-div",
        cardClass: "post-card feed-post-card",
        closeIconDisplay: "none",
        commentDisplay,
        setCommentDisplay,

    }

    const commentSectionProps = {
        postId,
        userData: user,
        commentDisplay,
        commentSectionCLass: "user-profile-comment-section",
        setCommentDisplay,
        userId: currentUser,
        getPostsFunc: () => {
            fetch(`http://localhost:3001/post/user-posts/${id}`, {
                credentials: "include"
            })
                .then(res => res.json())
                .then(data => setPosts(data.posts))
                .catch(err => console.log(err))
        }

    }

    const userPicsProps = {
        className: "userProfile-pics-section",
        display: userPicsDisplay,
        handleDisplay: setUserPicsDisplay,
        pics,
        closeIconDisplay: "none"
    }

    if (loading) return <div className="profile-loading">Loading...</div>
    if (!user) return <div className="profile-loading">User not found</div>

    return (
        <div className="user-profile">
            <div className="profile-top">
                {userMood ? (
                    <MoodBubble
                        mood={userMood}
                        user={user}
                        size={250}
                        onClick={() => { }}
                    />
                ) : (
                    <img
                        src={user.image?.[0] || "/default-avatar.png"}
                        alt={user.username}
                        className="profile-avatar"
                    />
                )}
                <h2>{user.name}</h2>
                <span className="profile-username">@{user.username}</span>
                {user.bio && <p className="profile-bio">{user.bio}</p>}
                {user.livesIn && (
                    <span className="profile-location">📍 {user.livesIn}</span>
                )}

                <div className="profile-stats">
                    <div className="stat">
                        <span className="stat-count">{user.followers?.length || 0}</span>
                        <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat">
                        <span className="stat-count">{user.following?.length || 0}</span>
                        <span className="stat-label">Following</span>
                    </div>
                    <div className="stat">
                        <span className="stat-count">{posts?.length || 0}</span>
                        <span className="stat-label">Posts</span>
                    </div>
                </div>

                {currentUser !== id && (
                    <div className="profile-actions">
                        <button
                            className={`btn-follow ${isFollowing ? "following" : ""}`}
                            onClick={isFollowing ? handleUnfollow : handleFollow}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                        <button
                            className="btn-message"
                            onClick={handleMessage}
                        >
                            Message
                        </button>
                    </div>
                )}
            </div>


            <div className="profile-tabs">
                <button
                    className={activeTab === "posts" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
                <button
                    className={activeTab === "pictures" ? "tab active" : "tab"}
                    onClick={() => {
                        setActiveTab("pictures")
                        setUserPicsDisplay("flex")
                    }}
                >
                    Pictures
                </button>
                <button
                    className={activeTab === "about" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("about")}
                >
                    About
                </button>
            </div>


            <div className="profile-content">


                {activeTab === "posts" && (
                    <div className=" user-profile-posts-section ">
                        <UserPosts {...userPostsProps} />
                        <CommentSection  {...commentSectionProps} />
                    </div>
                )}

                {activeTab === "pictures" && (
                    <UserPics {...userPicsProps} />
                )}

                {activeTab === "about" && (
                    <div className="about-section">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Username:</strong> @{user.username}</p>
                        {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
                        {user.country && <p><strong>Country:</strong> {user.country}</p>}
                        {user.livesIn && <p><strong>Lives in:</strong> {user.livesIn}</p>}
                    </div>
                )}
            </div>

            <ChatBox
                display={chatDisplay}
                onClose={() => setChatDisplay(false)}
                initialUser={user}
            />
        </div>
    )
}

export default UserProfile