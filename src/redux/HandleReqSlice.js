// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const HandleReq = createAsyncThunk(
//     "RequestAorR", async ({ id, res, token }) => {
//         const response = await axios.put(`https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/booking_turbo/content_status/user-turbo/status/${id}`,
//             { "Approved": res },
//             {
//                 headers: {
//                     "Authorization": token
//                 }
//             })
//         const data = await response.data
//         return data
//     }
// )

// const initialState = {
//     status: "idle",
//     newUser: [],
// }

// const HandleReqSlice = createSlice({
//     name: "request",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(HandleReq.pending, (state) => {
//                 state.status = "loading"
//             })
//             .addCase(HandleReq.fulfilled, (state, { payload }) => {
//                 state.status = "succeeded"
//                 state.newUser = payload
//             })
//             .addCase(HandleReq.rejected, (state) => {
//                 state.status = "reject"
//             })
//     }
// })

// export default HandleReqSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk
export const HandleReq = createAsyncThunk(
    "RequestAorR",
    async ({ id, res, token }) => {
        console.log(id, res, token)
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
        return response.data;
    }
);


const initialState = {
    status: "idle",
    newUser: [],
}

// Create slice
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

