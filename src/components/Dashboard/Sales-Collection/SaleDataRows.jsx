import PropTypes from "prop-types"; // ES6
import {  useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { insertCart } from "../../../Apis/Cart";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SaleDataRows = ({ saleCollection }) => {
  // loading state
  const [loading, setLoading] = useState(false);
  // quantitly state
  const [quantity, setQuantitly] = useState(1);
  // auth context
  const { user } = useAuth();
  // navigate
  const navigate = useNavigate();
  //  Prooduct data
  const {
    _id,
    buildingtName,
    buildingImage,
    discount,
    sellingPrice,
    shopOwnerEmail,
    shopId
  } = saleCollection;


  // handleAddBookForm
  const handleAddToCart = async (id) => {
    setLoading(true);

    // extra infos
    const userEmail = user.email;
    // total price
    const totalPrice = (sellingPrice * quantity);

    // uploading data in db
    try {
      // form data
      const formData = {
        productId: _id,
        userEmail,
        shopOwnerEmail, 
        buildingtName,
        buildingImage,
        quantity,
        discount,
        sellingPrice,
        totalPrice,
        shopId
      };
      console.table(formData);

      // save building in mongodb
      await insertCart(userEmail, id, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("You have successfully add to cart");
            setLoading(true);
            navigate(`/checkout/${userEmail}`);
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            return toast.error("Already Add in Cart");
          }
          toast.error(err.message);
        });

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <tr
      style={{ alignItems: "center" }}
      className="odd:bg-gray-50 even:bg-white "
    >
      <td className="px-6 py-4 whitespace-nowrap">{_id}</td>
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
        {buildingtName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-16 h-16">
          <img
            src={buildingImage}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="mx-auto flex h-8 items-stretch text-gray-600">
          <button 
          onClick={() => {
            if (quantity > 1) {
              setQuantitly(quantity - 1);
            }
          }}

          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
            -
          </button>
          <div className="flex w-full text-xl items-center justify-center bg-gray-100 px-4  uppercase font-semibold transition">
            {quantity}
          </div>
          <button
          onClick={() => setQuantitly(quantity + 1)}
          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
            +
          </button>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">{discount}</td>
      <td className="px-6 py-4 whitespace-nowrap">{sellingPrice}</td>
      <td className=" px-6 whitespace-nowrap">
        <button
          onClick={() => handleAddToCart(_id)}
          type="submit"
          className=" px-4 py-2 text-primary font-medium bg-accent hover:bg-accent/70 active:bg-accent/90 rounded-lg duration-150"
        >
          {loading ? (
            <FaSpinner className="text-xl mx-auto animate-spin" />
          ) : (
            "Add For Check Out"
          )}
        </button>
      </td>
    </tr>
  );
};

SaleDataRows.propTypes = {
  saleCollection: PropTypes.object,
};

export default SaleDataRows;
