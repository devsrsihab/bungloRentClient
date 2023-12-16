import AddBuildingModal from "./AddBuildingModal";
import { useEffect, useState } from "react";
import { getAllBuildings, getSingleBuilding } from "../../../Apis/Buildings";
import useAuth from "../../../hooks/useAuth";
import BuildingDateRows from "./BuildingDateRows";
import EditBuildingModal from "./EditBuildingModal";
const BuildingManaging = () => {
  // state for building
  const [buildings, setBuildings] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  // single product state
  const [showEdit, setShowEdit] = useState([]);
  // user context
  const { user } = useAuth();
  // show all  building
  useEffect(() => {
    getAllBuildings(user.email)
      .then((res) => {
        console.log(res);
        setBuildings(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.email, isUpdate]);

  console.log(isUpdate);


  // edit a building data
  const handleSingleCategoryEdit = (id) => {
    console.log(id);
    getSingleBuilding(id)
      .then((res) => {
        console.log(res);
        setShowEdit(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AddBuildingModal  isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
      <EditBuildingModal isUpdate={isUpdate}  setIsUpdate={setIsUpdate} showEdit={showEdit} />
      <div className="max-w-screen-xl mx-auto px-4 my-10 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              {` Totall ${buildings.length} Building Added`}
            </h3>
          </div>
          <div className="mt-3  md:mt-0">
            <button
              type="button"
              className="inline-block  px-4 py-2 text-black duration-150 font-medium bg-accent rounded-lg hover:bg-accent/90 active:bg-gray md:text-sm"
            >
              {/* The button to open modal */}
              <label className="cursor-pointer" htmlFor="addBuildingModal">
                Add Building
              </label>
            </button>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6 flex items-center gap-x-4">
                  Building Name
                </th>
                <th className="py-3 px-6">Building Image</th>
                <th className="py-3 px-6">Building Quantity</th>
                <th className="py-3 px-6">Sale Count</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {buildings?.map((building) => (
                <BuildingDateRows
                  building={building}
                  setIsUpdate={setIsUpdate}
                  editBuildingFunc={handleSingleCategoryEdit}
                  key={building._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BuildingManaging;
