import React from 'react'

const PhoneNumber = (props) => {
  return (
    <div className='phoneNum-main-div flex-column' style={{display: props.display}}>
        <h2>Phone Number</h2>
        <input type="tel" className='phoneNum-input' placeholder="Enter your phone number"/>
    </div>
  )
}

export default PhoneNumber

