import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAprroveContent, setNewContent, setPagination, setRejectContent } from "../ContentSlice";


export const getContentData = createAsyncThunk(
    "Bookings/AllBookings", async ({ ids, page, restraurantId, token }, { dispatch }) => {
        try {
            const url = `https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/booking_turbo/content_status/${restraurantId}`;
            const res = await axios.get(url, {
                params: {
                    restaurantIds: ids,
                    page: page
                },
                headers: { "Authorization": token }
            });
            if (res) {
                console.log(res, 'CheckCOntent')
                const { items, ...rest } = res?.data
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
            const response = await axios.put(`https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/booking_turbo/content_status/${id}`,
                { "status": status },
                {
                    headers: {

                        "Authorization": token
                    }
                })
            if (response) {
                    dispatch(setAprroveContent(id))
            }
            return response.data;
        } catch (err) {
            console.log(err.message)
        }
    }
)