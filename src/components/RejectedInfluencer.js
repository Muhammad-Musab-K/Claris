import React from 'react'
import InfluencerCard from './InfluencerCard'
import { useSelector } from 'react-redux'
import { rejectedInfluencer } from '../redux/InfluencerSlice'
import { ColorRing } from 'react-loader-spinner'

function RejectedInfluncer() {

    const isRejectedInfluencers = useSelector(rejectedInfluencer)
    return (

        <section className='flex flex-col gap-9 my-5'>
            <h1 className='text-black font-bold text-lg md:text-2xl'>Rejected Requests</h1>
            <div className='flex flex-wrap gap-4'>
                {isRejectedInfluencers.length !== 0 ? isRejectedInfluencers.map((item, index) => <InfluencerCard key={index} {...item} />)
                    :
                    <div className="absolute top-2/4 left-">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>}
            </div>
        </section>

    )
}

export default RejectedInfluncer
