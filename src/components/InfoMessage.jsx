import React from 'react'

const InfoMessage = (props) => {
    return (
        <div className='infoMsg-main-div flex-column around ' style={{ display: props.display }}>
            <span className='info-span'>{props.info}</span>
            <div className="call-to-action">
                <button className='infoMsg-action-btn'>share a note...</button>
            </div>
        </div>
    )
}

export default InfoMessage