import { useState, useEffect } from 'react'
import MoodBubble from './MoodAnimations'
import { useNavigate } from 'react-router-dom'
import '../styles/moods.css'

const MoodFeedBar = () => {
    const [moodUsers, setMoodUsers] = useState([])
    const currentUser = localStorage.getItem('_id')
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch latest posts from people you follow
        fetch('http://localhost:3001/post/following-moods', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setMoodUsers(data))
            .catch(err => console.log(err))
    }, [])

    if (moodUsers.length === 0) return null

    return (
        <div className="mood-feed-bar">
            {moodUsers.map((item) => (
                <MoodBubble
                    key={item.user._id}
                    mood={item.mood}
                    user={item.user}
                    onClick={() => navigate(`/profile/${item.user._id}`)}
                />
            ))}
        </div>
    )
}

export default MoodFeedBar