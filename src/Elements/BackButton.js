import React from 'react'
import Arrow from "../assests/back.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activeBook } from '../redux/ActivationSlice';

function BackButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const goBack = () => {
        navigate(-1)
        dispatch(activeBook(true))
    }
    return (
        <div onClick={goBack}>
            <img className='w-6 h-6' src={Arrow} alt="" />
        </div>
    )
}

export default BackButton
