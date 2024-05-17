import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activateBooking: true,
    activateContent: false,
    ModalAction: false
}
const ActivationSlice = createSlice({
    name: "activationButton",
    initialState,
    reducers: {
        activeBook(state, { payload }) {
            state.activateBooking = payload
            state.activateContent = false
        },
        activeCon(state, { payload }) {
            state.activateBooking = false
            state.activateContent = payload
        },
        isOpen(state, { payload }) {
            state.ModalAction = payload
        }

    }
})

export const { activeBook, activeCon, isOpen } = ActivationSlice.actions
export default ActivationSlice.reducer