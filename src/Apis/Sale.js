import axiosSecure from "./Index"


export const insertSale = async(data)=> {
    const insert = axiosSecure.post('/sale',data)
    return insert
}

export const getSales = async shopId => {
    const get = axiosSecure.get(`/sales/${shopId}`)
    return get
}