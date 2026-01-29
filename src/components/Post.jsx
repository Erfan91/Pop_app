import React, { useState, useEffect } from 'react';
import { TbPhoto } from "react-icons/tb";
import { SiZcool } from "react-icons/si";
import { PiStickerDuotone } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

const Post = () => {

    return (
        <div className='post-main-div flex-column'>
            <div className="post-text-div">
                <textarea name="text" className='post-textarea' placeholder="what's on your mind" />
                <div className="post-options-div flex">
                    <div className="post-pic-optn post-option flex center">
                        <TbPhoto className='photo-icon'/>    
                    </div>
                    <div className="post-mood-optn post-option flex center">
                        <SiZcool className='photo-icon'/>    
                    </div>
                    <div className="post-sticker-optn post-option flex center">
                        <PiStickerDuotone className='photo-icon'/>    
                    </div>
                </div>
                    <IoClose className='close-icon'/>    
            </div>
            <div className="post-photo-div">

            </div>

            <div className="post-btn-div">

            </div>
        </div>
    )
}

export default Post