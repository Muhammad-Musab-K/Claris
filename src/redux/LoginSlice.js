import { createSlice, createAsyncThunk, createSelector, createDraftSafeSelector } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const LoginUser = createAsyncThunk(
    "login/loginUser", async ({ email, password }) => {
        try {
            const response = await axios.post(
                "https://xbut-eryu-hhsg.f2.xano.io/api:bwh6Xc5O/restaurant_owner/Login",
                { email, password },

            );
            const data = response?.data
            return data
        } catch (err) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Check Your Email or Password",

            });
        }
    }
)

const initialState = {
    response: {},
    loginStatus: "idle",
    token: ""
}

const LoginSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        resetState(state) {
            state.token = "";
            state.response = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.loginStatus = "loading"
            })
            .addCase(LoginUser.fulfilled, (state, { payload }) => {
                state.loginStatus = "succeeded"
                state.response = payload?.data
                state.token = payload?.token
            })
            .addCase(LoginUser.rejected, (state) => {
                state.loginStatus = "rejected"
            })
    }
})

export const selectIs = createDraftSafeSelector(
    [state => state?.loginUser.response],
    state => state
)

export const selectIsLoggedIn = createDraftSafeSelector(
    [state => state?.loginUser?.token],
    token => token
)
export const selectRole = createDraftSafeSelector(
    [selectIs],
    state => state?.roles[0]
)
export const selectRestaurants = createDraftSafeSelector(
    [selectIs],
    state => state?.restaurant_turbo_id
)
export const selectCities = createDraftSafeSelector(
    [selectIs],
    state => state?.cities
)



export const { resetState } = LoginSlice.actions
export default LoginSlice.reducer
