

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setInfluencerAcepeted, setInfluencerRejected } from "./InfluencerSlice";
import axiosInstance from "../axiosInstance";


export const HandleReq = createAsyncThunk(
    "RequestAorR",
    async ({ id, res, token }, { dispatch }) => {
        console.log(id, res, token)
        try {
            const body = {
                UserStatus: res
            }
            const response = await axiosInstance.put(
                `/user-turbo/status/${id}`,
                body,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response) {
                dispatch(setInfluencerAcepeted(id))
            }
            return response.data;
        } catch (e) {
            console.log(e.message)
        }

    }
);

export const HandleReject = createAsyncThunk(
    "RequestReject",
    async ({ id, res, token }, { dispatch }) => {
        console.log(id, res, token)
        try {
            const body = {
                UserStatus: res
            }
            const response = await axiosInstance.put(
                `/user-turbo/status/${id}`,
                body,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response) {
                dispatch(setInfluencerRejected(id))
            }
            return response.data;
        } catch (e) {
            console.log(e.message)
        }

    }
);

const initialState = {
    status: "idle",
    newUser: [],
    rejectUser: []
}

const HandleReqSlice = createSlice({
    name: "request",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HandleReq.pending, (state) => {
                state.status = "loading";
            })
            .addCase(HandleReq.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                state.newUser = payload;
            })
            .addCase(HandleReq.rejected, (state) => {
                state.status = "rejected";
            });


    }
});

export default HandleReqSlice.reducer;

