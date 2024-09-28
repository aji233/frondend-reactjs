import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

const onRequest = async (config) => {
    if (!config.params) {
        config.params = {};
    }
    config.params['apikey'] = process.env.REACT_APP_X_API_KEY;
    return config;
};

const onRequestError = (error) => Promise.reject(error);
const onResponse = (response) => response;
const onResponseError = (error) => Promise.reject(error);

AxiosInstance.interceptors.request.use(onRequest, onRequestError);
AxiosInstance.interceptors.response.use(onResponse, onResponseError);

export default AxiosInstance;