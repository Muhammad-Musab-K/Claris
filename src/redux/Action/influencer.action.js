import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllinfluencer, setTotalPages } from "../InfluencerSlice";
import axiosInstance from "../../axiosInstance";


export const getAllInfluencer = createAsyncThunk(
    "influencer/fetchInfluencers",
    async ({ token, page, status }, { dispatch }) => {
        try {
            const response = await axiosInstance.get(`/user-turbo/list?page=${page}&status=${status}`, {

                headers: { Authorization: token },
            });
            if (response) {
                dispatch(setAllinfluencer(response.data.items));
                dispatch(setTotalPages(response.data.pageTotal));

                console.log(response)
            }
        } catch (err) {
        }
    }
);