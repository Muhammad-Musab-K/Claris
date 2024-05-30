import React from 'react'
import { useNavigate } from 'react-router-dom'

function Box({ id, name, image }) {

    const navigate = useNavigate()
    const handleClick = () => navigate(`/restraurents/${id}`)
    return (
        <div
            id={id}
            className='cursor-pointer bg-[#CCCCCC] rounded-md w-72 md:w-[400px] h-48'
            onClick={handleClick}
        >
            <img className='w-[429px] h-36 rounded-md' src={image} alt="" />
            <p className='mt-2 font-bold text-2xl text-center'>{name}</p>
        </div>
    )
}

export default Box
