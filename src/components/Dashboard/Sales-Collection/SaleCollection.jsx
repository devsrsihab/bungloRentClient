import { useEffect, useState } from "react";
import SaleDataRows from "./SaleDataRows";
import useAuth from "../../../hooks/useAuth";
import { getAllSaleCollection } from "../../../Apis/SaleCollection";

const SaleCollection = () => {
  // user context
  const { user } = useAuth();
  // state for collection
  const [saleCollections, setsaleCollections] = useState([]);
  // xearch sata
  const [search, setSearch] = useState('')
  // show all  collection
  useEffect(() => {
    getAllSaleCollection(user.email)
      .then((res) => {
        console.log(res);
        setsaleCollections(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.email]);

  console.log(search);


  return (
    <div className="max-w-screen-xl mx-auto px-4 my-10 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            {` Total Sale Collection ${saleCollections.length} `}
          </h3>
        </div>
      </div>
      <div className="items-start mt-5 justify-between md:flex">
        <div className="w-full">
          <form autoComplete="off" >
          <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
          </form>
        </div>

      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 ">ID</th>
              <th className="py-3 px-6 ">Name</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Discount</th>
              <th className="py-3 px-6">Sellign Price</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {
            saleCollections
            ?.filter((item)=> {
              return search.toLowerCase() === ''
               ? item
               : item._id.includes(search)

            })
            
            .map((saleCollection) => (
              <SaleDataRows
                key={saleCollection._id}
                saleCollection={saleCollection}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleCollection;
