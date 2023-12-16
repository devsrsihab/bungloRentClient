import PropTypes from "prop-types"; // ES6
import { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import imageUpload from "../../../Apis/ImageUpload";
import { insertBuilding } from "../../../Apis/Buildings";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const AddBuildingModal = ({ isUpdate, setIsUpdate }) => {
  // modal open or not
  const modalRef = useRef();
  // loading state
  const [loading, setLoading] = useState(false);
  // auth context
  const { user } = useAuth();

  // handleAddBookForm
  const handleAddBookForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const buildingtName = form.buildingtName.value;
    const buildingImage = form.buildingImage.files[0];
    const buildingQuantity = parseInt(form.buildingQuantity.value);
    const buildingFloorNumber = parseInt(form.buildingFloorNumber.value);
    const buildingSize = parseFloat(form.buildingSize.value);
    const buildingLocation = form.buildingLocation.value;
    const profiteMargin = parseFloat(form.profiteMargin.value);
    const discount = parseFloat(form.discount.value);
    const buildingDescription = form.buildingDescription.value;
    const productionCost = parseFloat(form.productionCost.value);
    // calculate selling price
    const taxPercentage = productionCost * (7.5 / 100);
    const profitPercentage = productionCost * (profiteMargin / 100);
    const sellingPrice = productionCost + taxPercentage + profitPercentage;
    const roundedSellingPrice = parseFloat(sellingPrice.toFixed(2));

    // extra infos
    const userEmail = user.email;

    // uploading data in db
    try {
      // image upload
      const imageData = await imageUpload(buildingImage);
      // form data
      const formData = {
        buildingtName,
        buildingImage: imageData?.data?.display_url,
        buildingQuantity,
        buildingFloorNumber,
        buildingSize,
        buildingLocation,
        profiteMargin,
        discount,
        buildingDescription,
        productionCost,
        sellingPrice: roundedSellingPrice,
        userEmail,
      };
      console.table(formData);

      // save building in mongodb
      await insertBuilding(formData)
        .then(() => {
          form.reset();
          modalRef.current.checked = false; //
          toast.success("You have successfully created a Building");
          setIsUpdate(!isUpdate);
          setLoading(true);
        })
        .catch((err) => {
          if (err?.response?.status === 403) {
            toast.error("You have Riched the Limit to Create Building");
          }
          if (err?.response?.status === 404) {
            toast.error("You have no Shop, Create Shop First");
          }
          console.log(err);
        });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      {/* Modal toggle */}
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="addBuildingModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={handleAddBookForm} className="card-body space-y-4 ">
            <div className="form-control">
              <label htmlFor="buildingtName" className="label">
                <span className="label-text">Building Name</span>
              </label>
              <input
                type="text"
                placeholder="Building Name"
                className="input input-bordered"
                name="buildingtName"
                id="buildingtName"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="buildingImage" className="label">
                <span className="label-text">Building Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="input input-bordered"
                name="buildingImage"
                id="buildingImage"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="buildingQuantity" className="label">
                <span className="label-text">Building Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Building Quantity"
                className="input input-bordered"
                name="buildingQuantity"
                min="1"
                id="buildingQuantity"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="buildingFloorNumber" className="label">
                <span className="label-text">Building Floor Number</span>
              </label>
              <input
                type="number"
                placeholder="Building Floor Number"
                className="input input-bordered"
                name="buildingFloorNumber"
                min="1"
                id="buildingFloorNumber"
                required
              />
            </div>

            <div className="form-control w-full ">
              <label htmlFor="buildingSize" className="label">
                <span className="label-text">Building Size</span>
              </label>
              <input
                type="number"
                name="buildingSize"
                id="buildingSize"
                placeholder="Building Size"
                className="input input-bordered w-full "
              />
              <label className="label">
                <span className="label-text-alt">
                  {" "}
                  Please enter the total square footage of the building. For
                  example, if the building is 40ft x 25ft, the area would be
                  1000 square feet.
                </span>
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="buildingLocation" className="label">
                <span className="label-text">Building Location</span>
              </label>
              <input
                type="text"
                placeholder="Building Location"
                className="input input-bordered"
                name="buildingLocation"
                id="buildingLocation"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="profiteMargin" className="label">
                <span className="label-text">Profite Margin</span>
              </label>
              <input
                type="text"
                placeholder="Profite Margin"
                className="input input-bordered"
                name="profiteMargin"
                id="profiteMargin"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="discount" className="label">
                <span className="label-text">Discount</span>
              </label>
              <input
                type="text"
                placeholder="Discount"
                className="input input-bordered"
                name="discount"
                id="discount"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="buildingDescription" className="label">
                <span className="label-text">Building Description</span>
              </label>
              <textarea
                className="textarea textarea-warning"
                placeholder="Building Description"
                name="buildingDescription"
                id="buildingDescription"
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label htmlFor="productionCost" className="label">
                <span className="label-text">Production Cost</span>
              </label>
              <input
                type="number"
                placeholder="Building Cost"
                className="input input-bordered"
                name="productionCost"
                min="1"
                id="productionCost"
                required
              />
            </div>

            <div className="modal-action  ">
              <label htmlFor="addBuildingModal" className="btn">
                Close!
              </label>

              <button
                type="submit"
                className=" px-4 py-2 text-primary font-medium bg-accent hover:bg-accent/70 active:bg-accent/90 rounded-lg duration-150"
              >
                {loading ? (
                  <FaSpinner className="text-xl mx-auto animate-spin" />
                ) : (
                  "Create Building"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

AddBuildingModal.propTypes = {
  setIsUpdate: PropTypes.func,
  isUpdate: PropTypes.bool,
};

export default AddBuildingModal;
