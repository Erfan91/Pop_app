import React, { useState, useEffect, useRef } from 'react';
import { TbPhoto } from "react-icons/tb";
import { SiZcool } from "react-icons/si";
import { PiStickerDuotone } from "react-icons/pi";
import { IoClose, IoCheckmarkOutline } from "react-icons/io5";
import { MdCloseFullscreen } from "react-icons/md";
import axios from 'axios';

const Post = (props) => {
    const [text, setText] = useState("");

    const imageUploader = useRef(null);
    const uploadedImage = useRef(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const [file, setFile] = useState("");
    const [image, setImage] = useState(null);

    const [imgDisplay, setImgDisplay] = useState("post-image");
    const [divDisplay, setDDisplay] = useState("post-photo-div");
    const [iconDisplay, setIconDisplay] = useState("none")

    const userId = localStorage.getItem('_id');
    const ids = JSON.parse(JSON.stringify(userId));

    const handleDisplay = () => {
        if (imgDisplay === "post-image" && divDisplay === "post-photo-div") {
            setImgDisplay("post-img-lg");
            setDDisplay("focused-photo-div");
            setIconDisplay("block")
        } else {
            setImgDisplay("post-image");
            setDDisplay("post-photo-div");
            setIconDisplay("none")
        }
    }

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



    const handleTextChange = e => {
        setText(e.target.value);
    }

    const sendPost = async (url) => {
        await fetch("http://localhost:3001/post/create-post", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                ownerId: ids,
                description: text,
                content: url,
            })
        }).then(result => result.json())
            .then(response => {
                console.log(response.message)
                if(response.state){
                    alert(response.message);
                    props.handleDisplay("none")
                }
            })

    }


    const uploadImage = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("myImage", image);

        axios({
            method: "post",
            url: "http://localhost:3001/post/upload-image",
            data: formData
        })
            .then(res => {
                const { data } = res;
                setFile(data.url);
                if (data.state) {
                    sendPost(data.url);
                }

            })
            .catch(err => {
                console.log(err, "error image upload");
            })

    }



    return (
        <div className='post-main-div flex-column' style={{ display: props.display }}>
            <div className="post-text-div">
                <textarea name="text" className='post-textarea' placeholder="what's on your mind" onChange={handleTextChange}/>
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
                <div className={divDisplay} onClick={handleDisplay}>
                    {selectedImg ? <img src={selectedImg} ref={uploadedImage} className={imgDisplay} /> : null}
                    <MdCloseFullscreen className="closeFS-icon" style={{ display: iconDisplay }} />
                </div>
            </div>
            <div className="post-btn-div flex">
                <button className='post-discard-btn' onClick={() => props.handleDisplay("none")}><IoClose className='close-icon' /></button>
                <button className={text !== "" ? "post-btn" : "invalid-button"} id='post-btn' onClick={uploadImage}><IoCheckmarkOutline className='done-icon' /></button>
            </div>
        </div>
    )
}

export default Post