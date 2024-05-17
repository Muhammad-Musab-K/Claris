import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userModal: {}
};

const ModalSlice = createSlice({
    name: "modalData",
    initialState,
    reducers: {
        ModalData(state, { payload }) {
            state.userModal = payload;
        }
    }
});

const selectUserModal = (state) => state.modalData.userModal;
const selectUserTurbo = createDraftSafeSelector(
    selectUserModal,
    (userModal) => userModal?.user_turbo
);

export const { ModalData } = ModalSlice.actions;
export default ModalSlice.reducer;
export { selectUserTurbo };
