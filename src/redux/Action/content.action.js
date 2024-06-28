import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAprroveContent, setNewContent, setPagination } from "../ContentSlice";
import axiosInstance from "../../axiosInstance";


export const getContentData = createAsyncThunk(
    "Bookings/AllBookings", async ({ ids, page, restraurantId, token }, { dispatch }) => {
        try {
            const url = `/booking_turbo/content_status/${restraurantId}`;
            const res = await axiosInstance.get(url, {
                params: {
                    restaurantIds: ids,
                    page: page
                },
                headers: { "Authorization": token }
            });
            if (res) {
                console.log(res, 'CheckCOntent')
                const { items, ...rest } = res?.data
                console.log(items, 'CheckCOntent')
                dispatch(setNewContent(items))
                dispatch(setPagination(rest))
            }
            return res;
        }
        catch (err) {
            console.log(err.message)
        }
    }
)

export const setContent = createAsyncThunk(
    "setContent", async ({ id, status, token }, { dispatch }) => {
        try {
            const response = await axiosInstance.put(`/booking_turbo/content_status/${id}`,
                { "status": status },
                {
                    headers: {

                        "Authorization": token
                    }
                })
            if (response) {
                dispatch(setAprroveContent({ id, status }))
            }
            return response.data;
        } catch (err) {
            console.log(err.message)
        }
    }
)