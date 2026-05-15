import React, { useState, useEffect } from 'react'
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircleOutline, } from "react-icons/io";
import { IoClose, IoCheckmarkOutline } from 'react-icons/io5';
import { FcCancel } from "react-icons/fc";

const EditDelete = (props) => {
    const [editDeleteDisplay, setEditDeleteDisplay] = useState({
        editDelete: "flex",
        updateDiv: "none",
        deleteDiv: "none",
        confirmDelete: "none"
    });


    const handleEdit = () => {
        props.data.setIndex(inputIndex => props.data.inputIndex === props.data.index ? null : props.data.index)
        setEditDeleteDisplay(prevState => ({
            ...prevState,
            editDelete: "none",
            updateDiv: "flex"
        }))
    }

    const handleIndex = () => {
        props.data.setIndex(inputIndex => props.data.inputIndex === props.data.index ? null : props.data.index)
    }


    const updateComment = () => {
        fetch(`http://localhost:3001/comment/edit-comment/${props.data.commentId}`, {
            method: "PATCH",
            headers: new Headers({ "Content-Type": "application/json", }),
            body: JSON.stringify({
                text: props.data.text
            })
        }).then(res => res.json())
            .then(data => {
                if (data.message) {
                    props.data.refresh();
                    props.data.handleDisplay("none");
                    handleIndex()

                    setEditDeleteDisplay(prevState => ({
                        ...prevState,
                        updateDiv: "none",
                    }))

                } else {
                    alert(data.message);
                }

            })
    }

    const deleteComment = () => {
        fetch(`http://localhost:3001/comment/delete-comment/${props.data?.commentId}`, {
            method: "DELETE",
            headers: new Headers({ "Content-type": "application/json" }),
            body: JSON.stringify({
                postId: props?.data?.postId
            })
        }).then(result => result.json())
            .then(data => {
                if (data.message) {
                    props.data?.refresh();
                    props.data?.refMain();
                } else {
                    alert(data.message);
                }
            })
    }


    const updatePost = async () => {
        if (props.data?.edit) {
            await fetch(`http://localhost:3001/post/update-post/${props.data?.postId}`, {
                method: "PATCH",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    description: props.data?.text,
                })
            }).then(result => result.json())
                .then(data => {
                    if (data.state) {

                        props.data?.setText(data.message);
                    } else {
                        alert(data.message)
                    }
                })
        } else {
            null
        }
    }

    const deletePost = async () => {
        if (props.data?.isDelete) {
            await fetch(`http://localhost:3001/post/delete-post/${props.data?.postId}`, {
                method: "DELETE",
                headers: new Headers({ "content-type": "application/json" }),
            }).then(result => result.json())
                .then(data => {
                    props.data?.refMain();
                })
        } else {
            null
        }
    }

    const updateContent = e => {
        e.preventDefault();
        if (props.data.content === "comment") {
            updateComment();
        }

        if (props.data.content === "post") {
            updatePost();
        }
    }

    const deleteContent = e => {
        e.preventDefault();
        props.data?.content === "comment"? deleteComment() : deletePost()
    }

    const handleDelete = () => {
        setEditDeleteDisplay(prevState => ({
            ...prevState,
            editDelete: "none",
            updateDiv: "none",
            confirmDelete: "flex"
        }))
    }

    return (
        <div className='editDlt-main-div' style={{ display: props.data.display }}>
            <div className="editDlt-div flex-column center" style={{ display: editDeleteDisplay.editDelete }}>
                <button className='post-option-btn' onClick={handleEdit}>
                    <MdModeEdit className='edit-icon' />
                </button>
                <button className='delete-button post-option-btn flex center' onClick={handleDelete}>
                    <MdDelete className='delete-icon' />
                </button>
            </div>
            <div className="confirm-update-div felx-column editDlt-div" style={{ display: editDeleteDisplay.updateDiv }}>
                <button className='cancel-update-btn post-option-btn flex center' onClick={() => {
                    handleIndex();
                    setEditDeleteDisplay(prevState => ({
                        ...prevState,
                        editDelete: "none",
                        updateDiv: "none",
                    }))
                    props.data.handleDisplay("none")
                }}>
                    <FcCancel className='delete-icon cancel-icon' />
                </button>
                <button className='update-post-button post-option-btn flex center' onClick={updateContent}>
                    <IoMdCheckmarkCircleOutline className='edit-icon checkmark-icon' />
                </button>
            </div>
            <div className="confirm-delete-div flex-column around" style={{ display: editDeleteDisplay.confirmDelete }}>
                <p>Delete comment</p>
                <div className="confirm-btn-div flex between">
                    <button className='editDlt-cancel-btn editDlt-btn' ><IoClose className='editDlt-cancel-icon' /></button>
                    <button className='editDLt-confirm-btn editDlt-btn' onClick={deleteContent}><IoCheckmarkOutline className='editDlt-confirm-icon' /></button>
                </div>
            </div>
        </div>
    )
}

export default EditDelete