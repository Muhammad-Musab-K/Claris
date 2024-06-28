import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import { locationsData } from '../redux/LocationSlice';
import Navbar from '../components/Navbar';
import Box from '../Elements/Box';
import { selectCities, selectRole } from '../redux/LoginSlice';

function Locations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(locationsData());
    }, [dispatch]);

    const data = useSelector(state => state?.location?.location);
    const role = useSelector(selectRole);
    const cities = useSelector(selectCities);

    useEffect(() => {
        if (cities.length === 1) {
            const id = cities[0];
            navigate(`/restraurents/${id}`);
        }
    }, [cities, navigate]);

    if (!data || Object.values(data).length === 0) {
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

    const locations = Object.values(data)
        .filter(location => role !== "owner" || cities.length === 0 || cities.includes(location?.id))
        .map((location, index) => (
            <Box key={index + 1} id={location?.id} name={location?.CityName} image={location?.City.url} />
        ));

    return (
        <div className='w-full '>
            <Navbar />
            <h1 className='m-6 font-semibold text-4xl text-center'>Locations</h1>
            <div className='mt-4 flex flex-col justify-center items-center md:flex-row gap-2 w-11/12 max-w-5xl m-auto'>
                {locations}
            </div>
        </div>
    );
}

export default Locations;
