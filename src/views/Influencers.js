import React, { useEffect } from 'react'
import InfluencerCard from '../components/InfluencerCard'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Influencer } from '../redux/InfluencerSlice'
import PenInfluencer from '../components/PenInfluencer'
import AcceptInfluencer from '../components/AcceptInfluencer'
import MyModal from '../components/Modal'
import InfluencerModal from '../components/InfluencerModal'

function Influencers() {
    const token = useSelector(state => state?.loginUser?.token)
    const disptach = useDispatch()
    useEffect(() => {
        disptach(Influencer({ token }))
    }, [])

    return (
        <div className='w-full'>
            <Navbar />
            <div className='w-full max-w-6xl m-auto flex flex-col items-center'>
                <PenInfluencer />
                <AcceptInfluencer />
            </div>
            <InfluencerModal />
        </div>
    )
}

export default Influencers
