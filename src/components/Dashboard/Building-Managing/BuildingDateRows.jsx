import PropTypes from 'prop-types'; // ES6
import Swal from 'sweetalert2';
import { makeBuildingDelete } from '../../../Apis/Buildings';
const BuildingDateRows = ({building,isUpdate,editBuildingFunc,setIsUpdate}) => {

  const handleDelete = async(id) => {

    console.log('dudu khao');

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        makeBuildingDelete(id)
        .then(()=> {
          
          Swal.fire({
            title: "Deleted!",
            text: "Your Building has been deleted.",
            icon: "success"
          });
          setIsUpdate(!isUpdate)


        })
        .catch((err)=>{
          console.log(err);
        })

       
      }
    });
  }


  return (
    <tr className="odd:bg-gray-50 even:bg-white">
    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
      {building?.buildingtName}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="w-16 h-16">
      <img src={building?.buildingImage} className="w-full h-full object-cover" alt="" />
        </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">{building?.buildingQuantity}</td>
    <td className="px-6 py-4 whitespace-nowrap">{building?.saleCount}</td>
    <td className=" px-6 whitespace-nowrap">
      <a
        onClick={() => editBuildingFunc(building?._id)}
        className="py-2 cursor-pointer px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        <label className="cursor-pointer" htmlFor="editBuildingModal">Edit</label>
      </a>
      <button
        onClick={() => handleDelete(building?._id)}
        className="py-2 cursor-pointer leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
      >
        Delete
      </button>
    </td>
  </tr>
  )
}

BuildingDateRows.propTypes = {
    building: PropTypes.object,
    editBuildingFunc: PropTypes.func,
    setIsUpdate: PropTypes.func,
    isUpdate: PropTypes.bool,
}

export default BuildingDateRows