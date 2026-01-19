import React from 'react'

const Loader = (props) => {
  return (
    <div className='loader-div'  style={{display: props.display}}>
        <div className="dot d1"/>
        <div className="dot d2"/>
        <div className="dot d3"/>
    </div>
  )
}

export default Loader