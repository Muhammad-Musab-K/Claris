import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    activateBooking: true,
    activateContent: false,
    ModalAction: false,
    Atab: false,
    Ptab: true,
    Rtab: false
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
        },
        AcceptedTab(state) {
            state.Atab = true
            state.Ptab = false
            state.Rtab = false
        },
        PendingTab(state) {
            state.Ptab = true
            state.Atab = false
            state.Rtab = false
        },
        RejectedTab(state) {
            state.Rtab = true
            state.Atab = false
            state.Ptab = false
        }

    }
})

export const pendingInfleuncer = createDraftSafeSelector(
    [state => state.activationButton.Ptab], (Ptab) => Ptab
)
export const acceptedInfleuncer = createDraftSafeSelector(
    [state => state.activationButton.Atab], (Atab) => Atab
)
export const rejectedInfleuncer = createDraftSafeSelector(
    [state => state.activationButton.Rtab], (Rtab) => Rtab
)


export const {
    activeBook,
    activeCon,
    isOpen,
    AcceptedTab,
    PendingTab,
    RejectedTab
} = ActivationSlice.actions
export default ActivationSlice.reducer