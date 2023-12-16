import axiosSecure from "./Index"


// insert shop data
export const insertShop = async shopData => {    
    // user info
    const createShopData = {
        limit: 3, 
        ...shopData,
    }
    const insert = axiosSecure.post(`/shops/${shopData.shopOwnerEmail}`,  createShopData)
    return insert    
}

// show all shop
export const getAllShop = async () => {
    const data = await axiosSecure(`/shops`)
    return data
}

// update the shop value after payment
export const updateShop = async shopData => {
    const update = axiosSecure.patch(`/shops`,  shopData)
    return update
}