import React from 'react'

const GettingStarted = (props) => {
  return (
    <div className='getting-started-div flex-column' style={{display: props.display}}>
        <h2 className='welcome-h2'>Welcome to Pop!</h2>
        <p>Here are some tips to get you started:</p>
        <ul className='gs-list flex-column'>
            <li>Explore your feed to see posts from people you follow.</li>
            <li>Use the search bar to find new users and content.</li>
            <li>Customize your profile to let others know more about you.</li>
            <li>Engage with posts by liking, commenting, and sharing.</li>
            <li>Check out notifications to stay updated on interactions.</li>
        </ul>
        <p>Enjoy your time on Pop!</p>
    </div>
  )
}

export default GettingStarted