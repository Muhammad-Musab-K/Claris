import React from 'react'
import { Button } from 'rsuite'

function Buttons({ next, prev, page, totalPage }) {

    return (
        <div className='flex gap-2 justify-center m-5'>
            <Button
                disabled={page === 1 ? true : false}
                onClick={prev}
                className=''>
                Prev
            </Button>
            <button className='bg-none m-2' disabled={true}>{page}</button>
            <Button
                disabled={totalPage > page ? false : true}
                onClick={next}
                className=' bg-[#FF004F] text-white ' >
                Next
            </Button>
        </div>
    )
}

export default Buttons
