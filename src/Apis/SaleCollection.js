import axiosSecure from "./Index"

// 2. SHOW THE BUILDING API FOR SPECIFIC USER
export const getAllSaleCollection = async (email) => {
    const {data} = await axiosSecure(`/buildings/${email}`)
    return data
}