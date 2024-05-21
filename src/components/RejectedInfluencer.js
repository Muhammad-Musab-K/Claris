import React from 'react'
import InfluencerCard from './InfluencerCard'
import { useSelector } from 'react-redux'
import { rejectedInfluencer } from '../redux/InfluencerSlice'


function RejectedInfluncer() {

    const isRejectedInfluencers = useSelector(rejectedInfluencer)
    return (

        <section className='flex flex-col gap-9 my-5'>
            <h1 className='text-black font-bold text-lg md:text-2xl'>Rejected Requests</h1>
            <div className='flex flex-wrap gap-4'>
                {isRejectedInfluencers?.map((item, index) => <InfluencerCard key={index} {...item} />)}
            </div>
        </section>

    )
}

export default RejectedInfluncer
