import axios, { AxiosInstance } from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export default axiosInstance
