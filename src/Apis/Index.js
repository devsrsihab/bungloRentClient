import axios from "axios";


// create a axios instant
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export default axiosSecure