import PropTypes from 'prop-types'; // ES6

const FeatureIcon = ({icon:Icon}) => {
  return <>
  <div   className="h-16 text-3xl w-16 flex items-center justify-center " >
  <Icon/>
  </div>
  </>
}

// props validaiton
FeatureIcon.propTypes = {
  icon: PropTypes.func
}

export default FeatureIcon