
import React from 'react';
import TikTok from "../assests/tiktok.png";
import Insta from "../assests/insta.png";
import background from "../assests/clarisimg.jpeg"
import { Link } from 'react-router-dom';
import Span from "./Span";

function Cards({ user_turbo, restaurant_turbo, BookingDay, canceled, Rejectedstatus, Approved, actions_turbo, timeframes_turbo }) {

    const bookingCompleted = () => {
        if (BookingDay) {
            const bookingDate = new Date(BookingDay).getTime();
            return bookingDate > Date.now();
        }
        return false;
    };

    const bookingStatus = () => {
        if (canceled) return <Span bg_color="bg-red-500" text="Canceled" />;
        if (Rejectedstatus) return <Span bg_color="bg-red-500" text="Denied" />;
        if (!Approved && !canceled && !Rejectedstatus) return <Span bg_color="bg-yellow-500" text="Pending" />;
        if (Approved && bookingCompleted()) return <Span bg_color="bg-green-700" text="Incoming" />;
        if (Approved && !bookingCompleted()) return <Span bg_color="bg-green-400" text="Completed" />;
    };

    const actionName = actions_turbo?.Action_Name.split(" ")[0];

    return (
        <div className='border-2 mb-3 w-full md:m-2 md:w-[250px] flex flex-col gap-4 bg-slate-50 rounded-lg p-3'>
            <div
                style={{
                    backgroundImage: `url(${restaurant_turbo?.Cover?.url?restaurant_turbo?.Cover?.url:background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className='h-32 md:h-24 rounded-lg px-1 flex flex-col justify-between py-1'>
                <div>
                    <span className='h-6 text-xs text-white bg-[#FF004F] rounded-md px-1 py-1'>
                        {restaurant_turbo?.Name}
                    </span>
                </div>
                <div className='flex justify-end'>
                    {bookingStatus()}
                </div>
            </div>
            <div className='flex gap-2'>
                <img
                    className='h-20 w-20 rounded-lg object-cover'
                    src={user_turbo?.Profile_pic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrLgzSMdH62yI75gb9jx3MTTR0o0VLDntTteWqR6rPQ&s"}
                    alt="Profile pic"
                />
                <div className='flex flex-col w-full'>
                    <h3 className='font-semibold text-lg md:text-sm leading-none text-black'>
                        {user_turbo?.name || "unknown"}
                    </h3>
                    <div className='flex relative'>
                        <div>
                            {user_turbo?.IG_account && (
                                <Link to={`https://instagram.com/${user_turbo.IG_account}`}>
                                    <img className='h-8 w-8' src={Insta} alt="Instagram" />
                                </Link>
                            )}
                            {user_turbo?.Tiktok_account && (
                                <Link to={`https://tiktok/en/${user_turbo.Tiktok_account}`}>
                                    <img className='h-8 w-8' src={TikTok} alt="TikTok" />
                                </Link>
                            )}
                        </div>
                        {actions_turbo?.Action_icon && (
                            <div className='font-semibold absolute right-2 flex flex-col items-center text-black'>
                                <img className='h-8' src={actions_turbo.Action_icon.url} alt={actionName} />
                                <p>{actionName}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='text-sm text-slate-500 md:font-semibold'>
                    <h6>Booking Day</h6>
                    <h6>Booking Time</h6>
                </div>
                <div className='text-sm text-black md:font-semibold'>
                    <h6>{BookingDay}</h6>
                    <h6>
                        {timeframes_turbo?.Start}:{timeframes_turbo?.Minute_Start} - {timeframes_turbo?.End}:{timeframes_turbo?.Minute_End}
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default Cards;
