import React from 'react'
import Insta from "../assests/insta.png";
import TikTok from "../assests/tiktok.png"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isOpen } from '../redux/ActivationSlice';
import { InfluencerModalData } from '../redux/ModalSlice';

function InfluencerCard({ IG_account, Tiktok_account, Profile_pic, name, bio, Birthday, NickName, id, UserStatus }) {

    const dispatch = useDispatch()

    const modalOpen = () => {
        dispatch(isOpen(true))
        dispatch(InfluencerModalData({ IG_account, Tiktok_account, Profile_pic, name, bio, Birthday, NickName, id, UserStatus }))
    }
    return (
        <div onClick={modalOpen} className=' cursor-pointer flex gap-4 rounded-lg w-full mx-3 sm:mx-0 sm:w-[300px] shadow p-3' >
            <img className='h-16 w-16 md:h-24 md:w-24 rounded-lg object-cover' src={Profile_pic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrLgzSMdH62yI75gb9jx3MTTR0o0VLDntTteWqR6rPQ&s"} alt="" />

            <div className='flex flex-col justify-between py-2'>
                <h6 className='text-black md:font-semibold md:text-lg'>{name || "unknown"}</h6>
                <div className='flex ga-2'>
                    {IG_account && (
                        <Link to={IG_account.includes("https://www.instagram.com/")
                            ? IG_account
                            : `https://www.instagram.com/${IG_account}`}>
                            <img className="h-8 w-8" src={Insta} alt="Instagram" />
                        </Link>
                    )}

                    {Tiktok_account && (
                        <Link to={Tiktok_account.includes("https://www.tiktok.com/") ? Tiktok_account : `https://www.tiktok.com/${Tiktok_account}`}>
                            <img className='h-8 w-8' src={TikTok} alt="TikTok" />
                        </Link>
                    )}
                </div>
            </div>
        </div >
    )
}

export default InfluencerCard
