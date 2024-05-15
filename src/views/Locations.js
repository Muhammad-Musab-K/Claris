import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'

import { locationsData } from '../redux/LocationSlice'
import Navbar from '../components/Navbar'
import Box from '../components/Box'

function Locations() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(locationsData())
    }, [])

    const data = useSelector(state => state?.location?.location)
    if (data?.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
            </div>
        );
    }
    const locations = data?.map((location, index) => {
        return <Box key={index + 1} id={location?.id} name={location?.CityName} image={location?.City.url} />
    })

    return (
        <div className='w-full '>
            <Navbar />
            <h1 className='m-6 font-semibold text-4xl text-center'>Locations</h1>
            <div className='mt-4 flex flex-col justify-center items-center  md:flex-row gap-2 w-11/12 max-w-5xl m-auto'>
                {locations}
            </div>
        </div>
    )
}

export default Locations
