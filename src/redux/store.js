import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

import LocationSlice from "./LocationSlice";
import RestaurantsSlice from "./RestaurantsSlice";
import BookingSlice from "./BookingSlice";
import LoginSlice from "./LoginSlice";
import ContentSlice from "./ContentSlice";
import ActivationSlice from "./ActivationSlice";
import ModalSlice from "./ModalSlice";
import InfluencerSlice from "./InfluencerSlice";
import HandleReqSlice from "./HandleReqSlice";

import setupAxiosInterceptors from "../setupAxiosInterceptors";
import axiosInstance from "../axiosInstance";

const rootReducer = combineReducers({
    location: LocationSlice,
    restaurant: RestaurantsSlice,
    booking: BookingSlice,
    loginUser: LoginSlice,
    content: ContentSlice,
    activationButton: ActivationSlice,
    modalData: ModalSlice,
    influencer: InfluencerSlice,
    request: HandleReqSlice,
});

const persistConfig = {
    key: "clarisAdmin",
    storage,
    whitelist: ["loginUser"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);
setupAxiosInterceptors(store)


export { store, persistor, axiosInstance };
