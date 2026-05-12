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
        props.setIndex(inputIndex => props.inputIndex === props.index ? null : props.index)
        setEditDeleteDisplay(prevState => ({
            ...prevState,
            editDelete: "none",
            updateDiv: "flex"
        }))
    }

    const handleIndex = () => {
        props.setIndex(inputIndex => props.inputIndex === props.index ? null : props.index)
    }

    const updateComment = e => {
         // send update request
    }

    return (
        <div className='editDlt-main-div'>
            <div className="editDlt-div flex-column center" style={{ display: editDeleteDisplay.editDelete }}>
                <button className='post-option-btn' onClick={handleEdit}>
                    <MdModeEdit className='edit-icon' />
                </button>
                <button className='delete-button post-option-btn flex center' >
                    <MdDelete className='delete-icon' />
                </button>
            </div>
            <div className="confirm-update-div felx-column editDlt-div" style={{ display: editDeleteDisplay.updateDiv }}>
                <button className='cancel-update-btn post-option-btn flex center' onClick={() => {
                    handleIndex();
                    setEditDeleteDisplay(prevState => ({
                        ...prevState,
                        editDelete: "none",
                        updateDiv: "none"
                    }))
                }}>
                    <FcCancel className='delete-icon cancel-icon' />
                </button>
                <button className='update-post-button post-option-btn flex center' >
                    <IoMdCheckmarkCircleOutline className='edit-icon checkmark-icon' />
                </button>
            </div>
            <div className="confirm-delete-div flex-column around" style={{ display: editDeleteDisplay.confirmDelete }}>
                <p>Confirm delete</p>
                <div className="confirm-btn-div flex between">
                    <button className='post-cancel-btn' ><IoClose className='cancel-icon' /></button>
                    <button className='confirm-btn'><IoCheckmarkOutline className='confirm-icon' /></button>
                </div>
            </div>
        </div>
    )
}

export default EditDelete