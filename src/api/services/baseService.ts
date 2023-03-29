import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosPromise } from 'axios';

const defaultHeaders: any = {
    'Content-Type': 'application/json',
}


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVICE_URL,
    timeout: 150000,
    responseType: 'json',
    headers: defaultHeaders,
});

const request = (options: AxiosRequestConfig): AxiosPromise => {
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            // Do something with response data
            return response;
        },
        (error: AxiosError) => {
            // Do something with response error
            return Promise.reject(error);
        },
    );

    return new Promise((resolve, reject) => {
        axiosInstance
            .request(options)
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: any) => {
                error.message = error.message || `${error.status} ${error.statusText}`;
                reject(error);
            });
    });
};

export default {
    get: (url: string, config: AxiosRequestConfig): AxiosPromise => {
        return request({ method: 'GET', url, ...config });
    },
    post: (url: string, data: any, config: AxiosRequestConfig): AxiosPromise => {
        return request({ method: 'POST', data, url, ...config });
    },
    put: (url: string, data: any, config: AxiosRequestConfig): AxiosPromise => {
        return request({ method: 'PUT', data, url, ...config });
    },
    delete: (url: string, config: AxiosRequestConfig): AxiosPromise => {
        return request({ method: 'DELETE', url, ...config });
    },
    patch: (url: string, data: any, config: AxiosRequestConfig): AxiosPromise => {
        return request({ method: 'PATCH', data, url, ...config });
    },
};
