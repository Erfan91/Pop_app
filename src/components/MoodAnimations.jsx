import '../styles/moods.css'

const moods = [
    { id: 'fire', label: '🔥 Fire', color: '#ff4e00' },
    { id: 'chill', label: '💙 Chill', color: '#00d2ff' },
    { id: 'lit', label: '💥 Lit', color: '#f9ca24' },
    { id: 'wavy', label: '🌊 Wavy', color: '#6dd5ed' },
    { id: 'vibes', label: '💜 Vibes', color: '#a855f7' },
    { id: 'love', label: '❤️ Love', color: '#ff416c' },
    { id: 'grind', label: '😤 Grind', color: '#f7971e' },
    { id: 'moody', label: '🌙 Moody', color: '#2c3e50' },
    { id: 'glowing', label: '✨ Glowing', color: '#f6d365' },
    { id: 'rainy', label: '🌧️ Rainy', color: '#4e54c8' },
]

export const MoodBubble = ({ mood, user, onClick }) => {
    const moodData = moods.find(m => m.id === mood) || moods[0]

    return (
        <div className="mood-bubble-wrapper" onClick={onClick}>
            <div className={`mood-ring mood-${mood}`}>
                <div className="mood-particles">
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className={`particle particle-${i + 1} mood-particle-${mood}`} />
                    ))}
                </div>
                <img
                    src={user?.image?.[0] || '/default-avatar.png'}
                    alt={user?.username}
                    className="mood-avatar"
                />
            </div>
            <span className="mood-username">{user?.username}</span>
            <span className="mood-label">{moodData.label}</span>
        </div>
    )
}

export const MoodPicker = ({ selected, onSelect }) => {
    return (
        <div className="mood-picker">
            <p className="mood-picker-title">What's your mood?</p>
            <div className="mood-picker-grid">
                {moods.map(mood => (
                    <div
                        key={mood.id}
                        className={`mood-option ${selected === mood.id ? 'mood-selected' : ''}`}
                        style={{ '--mood-color': mood.color }}
                        onClick={() => onSelect(mood.id)}
                    >
                        <div className={`mood-option-ring mood-${mood.id}`} />
                        <span>{mood.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { moods }
export default MoodBubble