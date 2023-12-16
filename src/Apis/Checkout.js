import axiosSecure from "./Index"


export const insertCheckout = async(email,checkoutData) => {
    const insert = await axiosSecure.put(`/checkout/${email}`,checkoutData)
    return insert
}