import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import SaleDateRows from "./SaleDateRows";
import { getSales } from "../../../Apis/Sale";
import { getUser } from "../../../Apis/Auth";
const SaleHistory = () => {
  // user context
  const {user} = useAuth()
  // state for building
  const [sales, setSales] = useState([]);
  const [shopIds, setShopId] = useState('')

  // users
  useEffect(()=>{
    getUser(user?.email)
      .then((res) => {
        setShopId(res?.data?.shopId)
      })
      .catch((err) => {
        console.log(err);
      });
     

  },[user?.email])

  console.log(shopIds);

  // show all  building
  useEffect(() => {
    getSales(shopIds)
      .then((res) => {
        console.log(res);
        setSales(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shopIds]); 


console.log(sales);


  return (
    <>
    
      <div className="max-w-screen-xl mx-auto px-4 my-10 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              {` Totall Building Added ${sales.length} `}
            </h3>
          </div>
          <div className="mt-3  md:mt-0">
            <button
              type="button"
              className="inline-block  px-4 py-2 text-black duration-150 font-medium bg-accent rounded-lg hover:bg-accent/90 active:bg-gray md:text-sm"
            >
              {/* The button to open modal */}
              <label className="cursor-pointer" htmlFor="addBuildingModal">
                Add Building
              </label>
            </button>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6 "> Name</th>
                <th className="py-3 px-6">Selling Date</th>
                <th className="py-3 px-6">Profit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {sales?.map((sale) => (
                <SaleDateRows
                  sale={sale}
                  key={sale._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SaleHistory;
