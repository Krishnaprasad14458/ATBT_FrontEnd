import axios from 'axios';

const atbtApi = axios.create({
    baseURL: 'https://atbtmain.infozit.com',
    // baseURL: 'http://localhost:3000/',

});

// Add a request interceptor
atbtApi.interceptors.request.use(
    (config) => {

        const data = JSON.parse(localStorage.getItem('data'));
        console.log(data?.token, "int-token")
        if (data?.token) {
            config.headers.Authorization = `${data?.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default atbtApi
