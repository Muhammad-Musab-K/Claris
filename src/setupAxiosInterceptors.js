
import axiosInstance from './axiosInstance';
import { resetState } from './redux/LoginSlice';

const setupAxiosInterceptors = (store) => {

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = store.getState().token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        (response) => {
            
            return response;
        },
        (error) => {
         
            if (error.response.status === 401) {
                store.dispatch(resetState())
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;
