import PropTypes from "prop-types"; // ES6
const Heading = ({ title, subtitle, center }) => {
  return (
    <>
      <div className={`${center ? "text-center" : "text-left"} sm:text-center my-16`}>
        <h2 className="text-3xl font-semibold capitalize leading-7 text-secondary sm:text-4xl xl:text-5xl">
          {title}
        </h2>
        <h4 className="text-xl text-secondary my-4 capitalize font-thin ">{subtitle}</h4>
        <hr className="mt-4 h-1.5 w-32 border-none bg-accent sm:mx-auto sm:mt-8" />
      </div>
    </>
  );
};

// props validations
Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
};

export default Heading;
