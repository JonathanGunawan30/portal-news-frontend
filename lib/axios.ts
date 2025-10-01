import axios, { AxiosInstance } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

export default axiosInstance;

export const createServerAxiosInstance = (cookieHeader: string): AxiosInstance => {
    return axios.create({
        baseURL: baseUrl,
        headers: {
            Cookie: cookieHeader,
        },
        withCredentials: false,
    });
};