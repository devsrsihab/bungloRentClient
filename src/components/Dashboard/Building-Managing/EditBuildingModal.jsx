import PropTypes from "prop-types"; // ES6
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { makeBuildingUpdate } from "../../../Apis/Buildings";
import imageUpload from "../../../Apis/ImageUpload";

const EditBuildingModal = ({ showEdit,isUpdate, setIsUpdate }) => {
  // modal open or not
  const modalRef = useRef();
  // loading state
  const [loading, setLoading] = useState(false);

  // clear form
  const clearForm = () => {
    document.getElementById("editBuildingForm").reset();
  };

  // handleAddBookForm
  const handleAddBookForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    // buildingtName
    // buildingImage
    // buildingQuantity
    // buildingLocation
    // buildingCost
    // profiteMargin
    // discount
    // buildingDescription
    let buildingImage = null;
    const buildingtName = form.buildingtName.value;
    buildingImage = form.buildingImage.files[0];
    const buildingQuantity = parseInt(form.buildingQuantity.value);
    const buildingLocation = form.buildingLocation.value;
    const profiteMargin = parseFloat(form.profiteMargin.value);
    const discount = parseFloat(form.discount.value);
    const buildingDescription = form.buildingDescription.value;
    const productionCost = parseFloat(form.productionCost.value);

    // uploading data in db
    try {
      // image upload
      if (buildingImage) {
        const imageData = await imageUpload(buildingImage);
        buildingImage = imageData?.data?.display_url;
      } else {
        buildingImage = showEdit.buildingImage;
      }
      // form data
      const formData = {
        buildingtName,
        buildingImage,
        buildingQuantity,
        buildingLocation,
        profiteMargin,
        discount,
        buildingDescription,
        productionCost,
      };
      console.table(formData);

      // save building in mongodb
      await makeBuildingUpdate(showEdit._id, formData)
        .then((res) => {
          form.reset();
          modalRef.current.checked = false; //

          toast.success("You have successfully updated a Building");

          console.log(res);
          setIsUpdate(!isUpdate);
          setLoading(true);
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* Modal toggle */}
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="editBuildingModal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleAddBookForm}
            id="editBuildingForm"
            className="card-body space-y-4 "
          >
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
                defaultValue={showEdit.buildingtName}
              />
            </div>

            <div className="form-control">
              <label htmlFor="buildingImage" className="label">
                <span className="label-text">Building Image</span>
              </label>
              <div className="w-full h-56 mb-5">
                <img
                  className="w-full object-cover h-full"
                  src={showEdit.buildingImage}
                  alt=""
                />
              </div>

              <input
                type="file"
                accept="image/*"
                className="input input-bordered"
                name="buildingImage"
                id="buildingImage"
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
                defaultValue={showEdit.buildingQuantity}
              />
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
                defaultValue={showEdit.buildingLocation}
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
                defaultValue={showEdit.profiteMargin}
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
                defaultValue={showEdit.discount}
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
                defaultValue={showEdit.buildingDescription}
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
                defaultValue={showEdit.productionCost}
              />
            </div>

            <div className="modal-action  ">
              <label
                onClick={clearForm}
                htmlFor="editBuildingModal"
                className="btn"
              >
                Close!
              </label>

              <button
                type="submit"
                className=" px-4 py-2 text-primary font-medium bg-accent hover:bg-accent/70 active:bg-accent/90 rounded-lg duration-150"
              >
                {loading ? (
                  <FaSpinner className="text-xl mx-auto animate-spin" />
                ) : (
                  "Update Building"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

EditBuildingModal.propTypes = {
  showEdit: PropTypes.func,
  setIsUpdate: PropTypes.func,
  isUpdate: PropTypes.bool,
};

export default EditBuildingModal;
