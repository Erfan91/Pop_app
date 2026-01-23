import React from 'react'

const Bio = (props) => {
  return (
    <div className='bio-main-div flex-column' style={{display: props.display}}>
        <h2>Bio</h2>
        <textarea 
        className='bio-textarea' 
        maxLength={150} 
        placeholder="Write a short bio about yourself (max 150 characters)"/>

    </div>
  )
}

export default Bio