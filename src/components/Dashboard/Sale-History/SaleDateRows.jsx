import PropTypes from 'prop-types'; // ES6
const SaleDateRows = ({sale}) => {

 const {purchaseProducts} = sale


  return (

    <tr className="odd:bg-gray-50 even:bg-white">
    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
      {purchaseProducts?.buildingtName}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">{sale?.soldDate}</td>
    <td className="px-6 py-4 whitespace-nowrap">{'2323'}</td>
    
  </tr>
  )
}

SaleDateRows.propTypes = {
    sale: PropTypes.object,
}

export default SaleDateRows