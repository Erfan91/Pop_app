import React from 'react'

const UserPics = (props) => {


  return (
    <div className="userPics-main-div flex-column center" style={{display: props.display}}>
        <div className="userPics-main-child flex center">
             {
            props.data.map((pics,index) =>{
                return(
                    <div className="userPics-card flex center" key={index}>
                        <img src={pics.content} className='user-pics' alt="" />
                    </div>
                )
            })
        }
        </div>
       
    </div>
  )
}

export default UserPics