import axiosSecure from "./Index"


// save user
export const insertUser = async user => {    
    // user info
    const currentUser = {
        email: user.email, 
        name: user.displayName,
        photo: user.photoURL,
        role: 'guest'
    }
    const {data} = axiosSecure.put(`/users/${user?.email}`,  currentUser)
    return data
}

// update user which role admin after payment 
export  const updateAdmin = async userInfo => {
    const update = axiosSecure.patch(`/users`,  userInfo)
    return update
}

// get token from server
export const getToken = async email =>  {
    const {data } = axiosSecure.post(`/jwt`, email)
    return data
}

// get user
export const getUser = async email => {
    const data = axiosSecure.get(`/users/${email}`)
    return data
}