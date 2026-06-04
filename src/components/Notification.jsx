import React, {useState, useEffect} from 'react'

const Notification = () => {
    const userId = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(userId));

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {   
        fetch(`http://localhost:3001/notification/user-notifications/${ids}`)
            .then(response => response.json())
            .then(data => {
                setNotifications(data.notifications);
            });
    }, [ids]);

    return (
        <div className='notification-container flex-column between'>
            <h1>Notification</h1>
            {notifications?.map(notification => (
                <div key={notification._id} className='notification flex'>
                    <img src={notification.sender.image} className='notification-sender-image' alt="sender profile" />
                    <p>{notification.sender.name}  {notification.message}</p>
                </div>
            ))}
        </div>
    )
}

export default Notification