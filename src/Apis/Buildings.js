import axiosSecure from "./Index"

// ===========================
//      BUILDING CRUD
// ===========================

// 1. CREATE THE BUILDING API
export const insertBuilding = async buildingData => {    
    // user info
    const createBuildingData = {
        ...buildingData,
    }
    const insert = axiosSecure.post(`/buildings/${buildingData.userEmail}`,  createBuildingData)
    return insert
    
}

// 2. SHOW THE BUILDING API FOR SPECIFIC USER
export const getAllBuildings = async (email) => {
    const {data} = await axiosSecure(`/buildings/${email}`)
    return data
}

// 3. SHOW THE SINGLE BUILDING
export const getSingleBuilding = async (id) => {
    const {data} = await axiosSecure(`/building/${id}`)
    return data
}

// 4. UPDATE THE BUILDING
export const makeBuildingUpdate = async (id,buildingData) => {
    const {data} = await axiosSecure.put(`/building/${id}`,buildingData)
    return data
}

// 5. DELETE THE BUILDING
export const makeBuildingDelete = async (id) => {
    const {data} = await axiosSecure.delete(`/building/${id}`)
    return data
}

// 6. CHANGE THE BUILDING DATA STATUS WHEN ORDERED
export const makeOrderedBuilding = async (data) => {
    const orderBuilding = await axiosSecure.patch('/building/ordered',data)
    return orderBuilding
}