import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import ChecoutItems from "./ChecoutItems";
import { insertCheckout } from "../../Apis/Checkout";
import { useLoaderData, useNavigate } from "react-router-dom";
import { deleteCart } from "../../Apis/Cart";
import { FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useState } from "react";
import { generatePDF } from "../../jsPDF/generatePDF";
import { insertSale } from "../../Apis/Sale";
import { makeOrderedBuilding } from "../../Apis/Buildings";

const Checkout = () => {
 // Navigate
 const navigate = useNavigate()
 // loading state
 const [loading, setLoading] = useState(false)

  // // user context
  const {user} = useAuth()
  const userEmail = user.email
  // cart data
  const carts = useLoaderData()
 //  total price count
 const totalPrice = carts.reduce((acc, curr) => acc + curr.totalPrice , 0 )
//  order details 


  // Insert The Data with the current Date and Time to the Sales Collection
  // ● DONE: Increase the sales count of that product from product collection
  // ● DONE: Decrease the Quantity of that product from product collection
  // ● DONE: A pdf will be generated with all the information from checkout page
  // ● DONE: Clear the Current Cart.



  // ===========
  //  Solution
  // ===========
  
  // ans.1 handle the order 
  const handleOrder = async() => {
    // const ids = carts.map(cart => cart.productId)
    setLoading(true)
    const idAndQuantity = carts.map(({ productId, quantity }) => ({ productId, quantity }));
    const idsAndEmail = carts.map(({ _id,userEmail }) => ({ _id,userEmail }));

    const checkoutData = { idAndQuantity }
    // make requesti
    insertCheckout(userEmail,checkoutData)
    .then((res)=> {
      console.log(res)
      // salw insert 
      const soldDate = new Date()
      const [{ shopId: ownerShopId }] = carts;

      const saleDate = {purchaseProducts:carts,soldDate,ownerShopId}
      insertSale(saleDate)
      // make building data status change 
      makeOrderedBuilding(checkoutData)



      .then(()=>{
        toast.success('Order Placed')
      })
      .catch((err)=>{
        toast.error(err.message)
      })

      generatePDF(carts)
      // clear the cart data
      deleteCart(idsAndEmail)
      .then(()=>{
        console.log('cart deleted');
        navigate('/dashboard/sales-collection')
      })
      .catch((err)=>{
        toast.error(err.message)
      })


    } )
    .catch((err)=> console.log(err))
  }





















  return (
    <>
      <Container>
        <div id="productChecout" className="relative mx-auto w-full bg-white">
          <div className="">
            <div className="relative w-1/2 mx-auto flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
              <h2 className="sr-only">Order summary</h2>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-secondary to-primary opacity-95" />
              </div>
              <div className="relative">
                <ul className="space-y-5">
                 {/* {cartItems} */}
                 {
                   carts.map(cart => <ChecoutItems key={cart._id} cart={cart} />)
                 }
                 
                </ul>
                <div className="my-5 h-0.5 w-full bg-white bg-opacity-30" />
                <div className="space-y-2">
                  <p className="flex justify-between text-lg font-bold text-white">
                    <span>Total price:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div className="relative mt-10 text-white">
                <h3 className="mb-5 text-lg font-bold">Support</h3>
                <p className="text-sm font-semibold">
                  +01 653 235 211{" "}
                  <span className="font-light">(International)</span>
                </p>
                <p className="mt-1 text-sm font-semibold">
                  support@nanohair.com{" "}
                  <span className="font-light">(Email)</span>
                </p>
                <p className="mt-2 text-xs font-medium">
                  Call us now for payment related issues
                </p>
              </div>
              <div className="relative mt-10 flex">
                <p className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    Money Back Guarantee
                  </span>
                  <span className="text-xs font-medium text-white">
                    within 30 days of purchase
                  </span>
                </p>
              </div>
              <div className="relative mt-10 flex">
                <button 
                onClick={handleOrder}
                disabled={!(loading===false)}
                className="btn uppercase text-xl bg-accent w-1/2 " >
                  {
                    loading ?
                    <FaSpinner className="text-xl animate-spin" />
                    :
                    "Get Paid"
                    
                  }
                
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
