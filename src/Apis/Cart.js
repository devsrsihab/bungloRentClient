import axiosSecure from "./Index"

// 1. CREATE THE CART API
export const insertCart = async (email,id,cartData) => {    
   
    const insert = axiosSecure.post(`/carts/${email}/${id}`,  cartData)
    return insert
    
}

// 2. SHOW THE CART API
export const getCart = async (email) => {       
    const show = axiosSecure(`/carts/${email}`)
    return show
    
}

export const deleteCart = async (idsAndEmail) => {
    
    const cartDelete = axiosSecure.delete(`/carts/`,{ data: { idsAndEmail } })
    return cartDelete
}