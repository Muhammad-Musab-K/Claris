import React from 'react'

function Span({ bg_color, text }) {
    return (
        <span className={` text-[10px] text-white  ${bg_color}  rounded-md px-1 py-[2px]`}>
            {text}
        </span>
    )
}

export default Span
