import React, {useEffect} from 'react'
import { IoClose} from 'react-icons/io5'

const UserPics = (props) => {

    useEffect(() => {
        if(props.data.length === 0) {
            props.handleDisplay("none");
            props.handleProDataDis("flex")
        } 
    },[props.data])

  return (
    <div className="userPics-main-div flex-column center" style={{display: props.display}}>
         <div className='userPosts-icon-div flex center' onClick={() => {
                props.handleDisplay("none");
                props.handleProDataDis("flex");
            }}>
                <IoClose className='userPosts-close-icon' />
            </div>
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