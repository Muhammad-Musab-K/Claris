import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';

import NoBookingCard from '../components/NoBookingCard';
import { Totalpage, ContentItemData, selectPagination } from '../redux/ContentSlice';
import Cards from '../components/Cards';
import Buttons from '../Elements/Button';
import { getContentData } from '../redux/Action/content.action';
import MyModal from '../components/Modal';

function Content({ ids, restraurantId }) {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const token = useSelector(state => state?.loginUser?.token);
    const pagination = useSelector(selectPagination)
    console.log(pagination, "checkPagination")
    useEffect(() => {
        if (token) dispatch(getContentData({ ids, page, restraurantId, token }));
    }, [ids, page, restraurantId, token, dispatch]);

    useEffect(() => { setPage(1) }, [ids]);

    const data = useSelector(ContentItemData);
    console.log(data, 'checkSelecter');
    const totalPage = useSelector(Totalpage);

    const next = () => { if (totalPage > page) setPage(prevPage => prevPage + 1); };
    const prev = () => { if (page > 1) setPage(prevPage => prevPage - 1); };

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        );
    }

    if (data?.length === 0) {
        return (
            <div className="flex justify-center items-center mt-10 text-2xl">
                <h1>No Content</h1>
            </div>
        );
    }

    const groupedBookings = {};

    data?.forEach(item => {
        const bookingDay = item.BookingDay;
        if (!groupedBookings[bookingDay]) { groupedBookings[bookingDay] = []; }
        groupedBookings[bookingDay].push(item);
    });

    const content = Object.keys(groupedBookings).map(bookingDay => {
        const contentItems = groupedBookings[bookingDay];

        return (
            <div
                key={bookingDay}
                className="flex flex-col p-2 gap-2">
                <h4 className="text-[#FF004F] text-3xl pl-2">{bookingDay}</h4>
                <div className="flex flex-col md:flex-row md:flex-wrap">
                    {contentItems.map((item, index) => (
                        item?.user_turbo ? <Cards key={index} {...item} isContent={true} isBooking={false} /> : <NoBookingCard key={index} />
                    ))}
                </div>
            </div>
        );
    });

    return (
        <div className='flex-col items-center md:pl-4'>
            <Buttons
                next={next}
                prev={prev}
                page={page}
                totalPage={totalPage} />
            <div className='flex flex-col gap-6'>
                {content}

            </div>
            <MyModal contentStatus={true} />
        </div>
    );
}

export default Content;
