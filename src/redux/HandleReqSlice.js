

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setInfluencerAcepeted, setInfluencerRejected } from "./InfluencerSlice";

export const HandleReq = createAsyncThunk(
    "RequestAorR",
    async ({ id, res, token }, { dispatch }) => {
        console.log(id, res, token)
        try {
            const response = await axios.put(
                `https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/user-turbo/status/${id}`,
                { "Approved": res },
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
            const response = await axios.put(
                `https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/user-turbo/status/${id}`,
                { "NotApproved": res },
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

