import React from 'react';
import { Button } from 'rsuite';

function ActiveButton({ onclick, contentActive, text }) {
    return (
        <Button
            {...(contentActive
                ? { className: "bg-[#FF004F] text-white shadow-none border-none" }
                : { appearance: 'ghost' }
            )}
            onClick={onclick}
        >
            {text}
        </Button>
    )
}

export default ActiveButton
