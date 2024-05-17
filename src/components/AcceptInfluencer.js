import React from 'react'
import InfluencerCard from './InfluencerCard'
import { useSelector } from 'react-redux'
import { acceptedInfluencer } from '../redux/InfluencerSlice'



function AcceptInfluencer() {

    const isAcceptedInfluencer = useSelector(state => acceptedInfluencer(state))
    return (

        <section className='flex flex-col gap-9 my-5'>
            <h1 className='text-black font-bold text-lg md:text-2xl'>Accepted Requests</h1>
            <div className='flex flex-wrap gap-4'>
                {isAcceptedInfluencer?.map((item, index) => <InfluencerCard key={index} {...item} />)}
            </div>
        </section>

    )
}

export default AcceptInfluencer
