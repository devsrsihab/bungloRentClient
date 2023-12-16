import PropTypes from "prop-types"; // ES6


const ChecoutItems = ({cart}) => {

    const {
        buildingImage,
        buildingtName,
        totalPrice,
        quantity
      } = cart;


  return (
    <li className="flex justify-between">
      <div className="inline-flex">
        <img
          src={buildingImage}
          alt=""
          className="max-h-16"
        />
        <div className="ml-3">
          <p className="text-base font-semibold text-white">
            {buildingtName}
          </p>
          <p className="text-base  text-white">
            {quantity}
          </p>
         
        </div>
      </div>
      <p className="text-sm font-semibold text-white">${totalPrice.toFixed(2)} </p>
    </li>
  );
};

ChecoutItems.propTypes = {
    cart: PropTypes.object,
  };

export default ChecoutItems;
