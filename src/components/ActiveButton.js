import React from 'react';
import { Button } from 'rsuite';

function ActiveButton({ onClick, contentActive, text }) {
    return (
        <Button
            {...(contentActive
                ? { className: "bg-[#FF004F] text-white shadow-none border-none" }
                : { appearance: 'ghost' }
            )}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}

export default ActiveButton
