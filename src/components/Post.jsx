import React, { useState, useEffect, useRef } from 'react';
import { TbPhoto } from "react-icons/tb";
import { SiZcool } from "react-icons/si";
import { PiStickerDuotone } from "react-icons/pi";
import { IoClose, IoCheckmarkOutline } from "react-icons/io5";
import axios from 'axios';

const Post = (props) => {
    const [text, setText] = useState("");

    const imageUploader = useRef(null);
    const uploadedImage = useRef(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const [file, setFile] = useState("");
    const [image, setImage] = useState(null);

    const handleImgChange = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;

            setImage(e.target.files[0]);
            setSelectedImg(URL.createObjectURL(e.target.files[0]));
            current.file = file;

            reader.onload = e => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file);
        }
    }

    const uploadImage = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("myImage", image);

        axios({
            method: "post",
            url: "http://localhost:3001/user/upload-image",
            data: formData
        })
            .then(res => {
                const { data } = res;
                setFile(data.url);

            })
            .catch(err => {
                console.log(err, "error image upload");
            })

    }

    const handleTextChange = e => {
        setText(e.target.value);
    }



    return (
        <div className='post-main-div flex-column' style={{ display: props.display }}>
            <div className="post-text-div">
                <textarea name="text" className='post-textarea' placeholder="what's on your mind" />
                <div className="post-options-div flex">
                    <input type="file" accept='/image' onChange={handleImgChange} ref={imageUploader} style={{ display: "none" }} />
                    <div className="post-pic-optn post-option flex center" onClick={() => {
                        imageUploader.current.click();
                    }}>
                        <TbPhoto className='photo-icon' />
                    </div>
                    <div className="post-mood-optn post-option flex center">
                        <SiZcool className='photo-icon' />
                    </div>
                    <div className="post-sticker-optn post-option flex center">
                        <PiStickerDuotone className='photo-icon' />
                    </div>
                </div>
                <div className="post-photo-div">
                    {selectedImg ? <img src={selectedImg} ref={uploadedImage} className='post-image' /> : null}
                </div>
            </div>
            <div className="post-btn-div flex">
                <button className='post-discard-btn'><IoClose className='close-icon' /></button>
                <button className='post-btn' id='post-btn'><IoCheckmarkOutline className='done-icon' /></button>
            </div>
        </div>
    )
}

export default Post