import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userModal: {},
    influencerModal: {}
};

const ModalSlice = createSlice({
    name: "modalData",
    initialState,
    reducers: {
        ModalData(state, { payload }) {
            state.userModal = payload;
        },
        InfluencerModalData(state, { payload }) {
            state.influencerModal = payload;
        }
    }
});

const selectUserModal = (state) => state?.modalData?.userModal;
const selectInfluencerModal = (state) => state?.modalData?.influencerModal

export const selectUserTurbo = createDraftSafeSelector(
    selectUserModal,
    (userModal) => userModal
);

export const selectInfluencerTurbo = createDraftSafeSelector(
    selectInfluencerModal,
    (influencerModal) => influencerModal
);

export const { ModalData, InfluencerModalData } = ModalSlice.actions;
export default ModalSlice.reducer;

