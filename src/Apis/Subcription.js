import axiosSecure from "./Index"


export const createPaymentIntent = async price => {
    const {data} = await axiosSecure.post('/create-payment-intent', price)
    return data
}