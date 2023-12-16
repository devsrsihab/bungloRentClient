import PropTypes from "prop-types"; // ES6

const CartItem = ({ cart }) => {
  const {
    buildingImage,
    buildingtName,
    sellingPrice,
    quantity
  } = cart;
  
  

// ====================================
//            TODO: CHALLENGE
// ====================================
// 1. : calculate price based on quantity




  return (
    <>
      <li className="flex flex-col justify-center items-center space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
        <div className="shrink-0">
          <img
            className="h-24 w-24 max-w-full rounded-lg object-cover"
            src={buildingImage}
            alt=""
          />
        </div>
        <div className="relative flex flex-1 flex-col justify-between">
          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
            <div className="pr-8 sm:pr-5">
              <p className="text-base capitalize font-semibold text-gray-900">
                {buildingtName}
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                {sellingPrice}
              </p>
              <div className="sm:order-1">
                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                <div className="flex w-full text-xl items-center justify-center bg-gray-100 px-4  uppercase font-semibold transition">
                {quantity}
              </div>

                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
            <button
              type="button"
              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  className=""
                />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

CartItem.propTypes = {
  cart: PropTypes.object,
  qtyBasedTotal: PropTypes.number,
};

export default CartItem;
