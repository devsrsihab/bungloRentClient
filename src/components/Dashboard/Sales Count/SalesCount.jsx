import { useEffect, useState } from "react";
import SaleCard from "./SaleCard";
import { CiMoneyBill } from "react-icons/ci";
import { GiProfit, GiPayMoney } from "react-icons/gi";
import useAuth from "../../../hooks/useAuth";
import { getAllBuildings } from "../../../Apis/Buildings";

const SalesCount = () => {
  // auth state
  const { user } = useAuth();
  const email = user.email;
  // total sale state
  const [buildings, setBuildings] = useState([]);
  const [totalSaleCount, setTotalSaleCount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  // building all data of this shop
  useEffect(() => {
    getAllBuildings(email)
      .then((res) => {
        console.log(res);
        setBuildings(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  // caleucaiton
  useEffect(()=>{
     // Calculate total saleCount
     const saleCount = buildings?.reduce((total, item) => total + item.saleCount, 0);
     setTotalSaleCount(saleCount);
     // Calculate total investment
     const investment = buildings?.reduce((prevVal, currVal)=> prevVal + currVal.productionCost ,0)
     setTotalInvestment(investment);
     // Calculate total profit
     // Profit=Selling Price−Production Cost
     const totalSellingPrice = buildings?.reduce((prevVal, currVal)=> prevVal + currVal.sellingPrice ,0)
     const totalProfit = totalSellingPrice - investment;
     setTotalProfit(totalProfit);
  },[buildings])



  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 my-10 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              {` Sale Count of Shop Employees ${totalSaleCount} `}
            </h3>
          </div>
        </div>
        <div className="sale-count pt-20 grid grid-cols-3 gap-6 ">
          <SaleCard icon={CiMoneyBill} title="Total Sale" price={totalSaleCount} />

          <SaleCard icon={GiPayMoney} title="Total Invest" price={`$${totalInvestment}`} />

          <SaleCard icon={GiProfit} title="Total Profit" price={`$${totalProfit?.toFixed(2)}`} />
        </div>
      </div>
    </>
  );
};

export default SalesCount;
