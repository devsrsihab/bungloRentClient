import PropTypes from "prop-types"; // ES6
const SaleCard = ({icon:Icon, title, price}) => {
  return (
    <>
      <div className="card pb-8 card-compact w-96 bg-base-100 shadow-xl">
        <figure className="rounded-xl shadowl ">
          <Icon className="text-6xl  text-primary " />
        </figure>
        <div className="card-body  text-center ">
          <p className="text-xl font-semibold">{price}</p>
          <h2 className="text-3xl capitalize ">{title}</h2>
        </div>
      </div>
    </>
  );
};

SaleCard.propTypes = {
    icon: PropTypes.func,
    title: PropTypes.string,
    price: PropTypes.string,
  };

export default SaleCard;
