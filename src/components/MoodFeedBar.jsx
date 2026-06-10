import { useState, useEffect, useRef } from 'react'
import MoodBubble, { MoodPicker } from './MoodAnimations'
import { useNavigate } from 'react-router-dom'
import '../styles/moods.css'

const MoodFeedBar = () => {
    const [moodUsers, setMoodUsers] = useState([])
    const [userData, setUserData] = useState(null)
    const [myMood, setMyMood] = useState(null)
    const [showPicker, setShowPicker] = useState(false)
    const pickerRef = useRef(null)
    const currentUser = localStorage.getItem('_id')
    const navigate = useNavigate()

    useEffect(() => {
        const id = JSON.parse(JSON.stringify(currentUser))

        fetch(`http://localhost:3001/user/user-info/${id}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setUserData(data.user)
                if (data.user?.mood) setMyMood(data.user.mood)
            })
            .catch(err => console.log(err))

        fetch('http://localhost:3001/post/following-moods', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setMoodUsers(Array.isArray(data) ? data : []))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false)
            }
        }
        if (showPicker) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showPicker])

    const handleSetMood = (mood) => {
        setMyMood(mood)
        setShowPicker(false)
        fetch('http://localhost:3001/user/set-mood', {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ mood, userId: currentUser })
        }).catch(err => console.log(err))
    }

    const half = Math.ceil(moodUsers.length / 2)
    const leftUsers = moodUsers.slice(0, half)
    const rightUsers = moodUsers.slice(half)

    return (
        <div className="mood-feed-bar-wrapper">
            {/* Left side — first half of followed users */}
            <div className="mood-feed-side mood-feed-left">
                {leftUsers.map((item) => (
                    <MoodBubble
                        key={item.user._id}
                        mood={item.mood}
                        user={item.user}
                        onClick={() => navigate(`/profile/${item.user._id}`)}
                    />
                ))}
            </div>

            {/* Center — my pfp / story add */}
            <div className="mood-my-story" ref={pickerRef}>
                <div
                    className={`mood-my-pfp-wrap ${myMood ? `mood-ring mood-${myMood}` : 'mood-my-pfp-empty'}`}
                    onClick={() => setShowPicker(v => !v)}
                >
                    {myMood && (
                        <div className="mood-particles">
                            {[...Array(6)].map((_, i) => (
                                <span key={i} className={`particle particle-${i + 1} mood-particle-${myMood}`} />
                            ))}
                        </div>
                    )}
                    <img
                        src={userData?.image?.[0] || '/default-avatar.png'}
                        alt="you"
                        className="mood-avatar mood-my-avatar"
                    />
                    {!myMood && <div className="mood-add-badge">+</div>}
                </div>
                <span className="mood-username">You</span>
                {myMood && <span className="mood-label">{myMood}</span>}

                {showPicker && (
                    <div className="mood-story-picker-dropdown">
                        <MoodPicker selected={myMood} onSelect={handleSetMood} />
                    </div>
                )}
            </div>

            {/* Right side — second half of followed users */}
            <div className="mood-feed-side mood-feed-right">
                {rightUsers.map((item) => (
                    <MoodBubble
                        key={item.user._id}
                        mood={item.mood}
                        user={item.user}
                        onClick={() => navigate(`/profile/${item.user._id}`)}
                    />
                ))}
            </div>
        </div>
    )
}

export default MoodFeedBar
