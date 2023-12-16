import axiosSecure from "./Index"


export const insertPaymentInfo = async(paymentInfo)=>{

    const insert = axiosSecure.post('/payments',paymentInfo)
    return insert
}