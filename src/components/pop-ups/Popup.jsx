import React, {useState, useEffect} from 'react'
import GettingStarted from './GettingStarted.jsx'

const Popup = (props) => {
  return (
    <div className='pop-up' style={{display: props.display}}>
        <GettingStarted />
        {/* <div className="big-dot"/>
        <div className="big-dot"/>
        <div className="big-dot"/> */}
    </div>
  )
}

export default Popup