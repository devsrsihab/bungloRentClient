import { useEffect, useState } from "react";
import { getCart } from "../../Apis/Cart";
import useAuth from "../../hooks/useAuth";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  // 1. DONE: shown the prouct in the table with quantity
  // 2. DONE: when add to cart the product quantity will default value 1
  // 3. DONE: after add cart redirect cart page and from the cart page user can increase the cart number 
  // 4. TODO: from the cart page ueer can checkout the product

  // cart sate
  const [carts, setCarts] = useState([])
  // user context
  const {user} = useAuth()
  const userEmail = user.email

  useEffect(() => {

    getCart(userEmail)
    .then((res)=>{
      setCarts(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    
  },[userEmail])

 //  total price count

   const totalPrice = carts.reduce((acc, curr) => acc + curr.totalPrice , 0 )






  return (

    <section className=" bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart {carts.length} </h1>
        </div>
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                 {
                    carts?.map(cart =>
                        
                        <CartItem 
                        key={cart._id}
                        cart={cart}

                        /> 
                        
                        )
                 }

       

                </ul>
              </div>
              <div className="mt-6 border-t border-b py-2">

              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">USD</span>{" "}
                  {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/checkout"
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
