import React, {useEffect} from 'react'
import { IoClose} from 'react-icons/io5'

const UserPics = (props) => {

    useEffect(() => {
        if(props.pics.length === 0) {
            props.handleDisplay("none");
            props.handleProDataDis("flex")
        } 
    },[props.pics])

  return (
    <div className={`userPics-main-div flex-column center ${props.className}`} style={{display: props.display}}>
         <div className='userPosts-icon-div flex center' style={{display: props.closeIconDisplay}} onClick={() => {
                props.handleDisplay("none");
                props.handleProDataDis("flex");
            }}>
                <IoClose className='userPosts-close-icon' />
            </div>
        <div className="userPics-main-child flex center">
             {
            props.pics.map((pics,index) =>{
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