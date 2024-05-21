import React from 'react'
import InfluencerCard from './InfluencerCard'
import { useSelector } from 'react-redux'
import { pendingInfluencer } from '../redux/InfluencerSlice'

function PenInfluencer() {

    const isPendingInfluencer = useSelector(state => pendingInfluencer(state))
    return (

        <section className='flex flex-col gap-9 my-5'>
            <h1 className='text-black font-bold text-lg md:text-2xl'>Pending Requests</h1>
            <div className='flex flex-wrap gap-4'>
                {isPendingInfluencer?.map((item, index) => <InfluencerCard key={index} {...item} />)}
            </div>
        </section>
    )
}

export default PenInfluencer
