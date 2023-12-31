import { useState } from "react";
import PaymentModal from "./PaymentModal";

const Subscription = () => {
    // paymetn price
    const [payPrice, setPayPrice] = useState(0)

    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
      }


  return <>
    <div className="pt-16 pb-8 text-center leading-8 text-gray-800 md:pb-16 lg:pt-20">
      <div className="mb-20 text-center">
        <div className="mb-4 text-gray-800">
          <h2 className="text-4xl font-bold md:text-5xl md:leading-none">
            Pay As You Grow
          </h2>
        </div>
        <p className="mx-auto mb-8 max-w-3xl text-gray-800">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
          molestias nemo, alias quaerat expedita.
        </p>
        <div className="text-gray-800">
          <div className="mb-4 inline-block">
            <a
              className="relative flex cursor-pointer items-center pr-12 text-base leading-tight text-purple-600 md:text-xl"
            >
              See All Features
              <span className="ml-8">
                {/* hero: arrow-narrow-right */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-3">
        {/* cart 01 */}
        <div className="relative text-gray-800">
          <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-purple-100">
            <div className="bg-purple-50 py-2 text-xl">Basic</div>
            <div className="py-10 px-4 font-semibold">
              <p className="  ">
                <span className="text-base leading-tight">$</span>10 / month
              </p>
            </div>
            <ul className="  ">
              <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                <svg
                  className="absolute ml-4 block h-full align-middle"
                  width="17.5px"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                    fill="currentColor"
                    className="text-purple-600"
                  />
                </svg>
                <p className="py-2 text-xl font-semibold">200 Limit</p>
              </li>

            </ul>
            <div className="my-10 px-2">
              <button 
               onClick={(e) => {
                    
                setIsOpen(true)
                setPayPrice( e.target.title)
            }}
                className="block cursor-pointer rounded bg-gray-800 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4"
                title={10}

              >
                Purchase
              </button>
            </div>
          </div>
        </div>
        {/* cart 02 */}
        <div className="relative text-gray-800">
          <div className="absolute top-0 right-0 z-10 -mt-5 -mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400 px-2 font-bold text-white">
            <p className="text-base leading-tight">Most Picked</p>
          </div>
          <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-purple-500">
            <div className="bg-purple-500 py-2 text-xl text-white">Starter</div>
            <div className="py-10 px-4 font-semibold">
              <p className="  ">
                <span className="text-base leading-tight">$</span>20 / month
              </p>
            </div>
            <ul className="  ">
              <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                <svg
                  className="absolute ml-4 block h-full align-middle"
                  width="17.5px"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                    fill="currentColor"
                    className="text-purple-600"
                  />
                </svg>
                <p className="py-2 text-xl font-semibold">450 Limit</p>
              </li>
            </ul>
            <div className="my-10 px-2">
              <button
                onClick={(e) => {
                    
                    setIsOpen(true)
                    setPayPrice( e.target.title)
                }}
                className="block cursor-pointer rounded bg-purple-600 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4"
                title={20}
                
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
        {/* cart 03 */}
        <div className="relative text-gray-800">
          <div className="relative mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border  border-purple-100">
            <div className="bg-purple-50 py-2 text-xl">Team</div>
            <div className="py-10 px-4 font-semibold">
              <p className="  ">
                <span className="text-base leading-tight">$</span>40 / month
              </p>
            </div>
            <ul className="  ">
              <li className="relative mx-4 mb-2 rounded-md bg-gray-50">
                <svg
                  className="absolute ml-4 block h-full align-middle"
                  width="17.5px"
                  viewBox="0 0 18 14"
                  fill="none"
                >
                  <path
                    d="M5.6 10.6L1.4 6.4L0 7.8L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z"
                    fill="currentColor"
                    className="text-purple-600"
                  />
                </svg>
                <p className="py-2 text-xl font-semibold">1500 Limit</p>
              </li>

            </ul>
            <div className="my-10 px-2">
              <button
                onClick={(e) => {
                    
                    setIsOpen(true)
                    setPayPrice( e.target.title)
                }}
                className="block cursor-pointer rounded bg-gray-800 py-4 px-10 text-base leading-tight text-white duration-200 ease-in-out md:inline-block lg:py-4"
                title={40}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* payment mdoal */}
    <PaymentModal payPrice={payPrice} isOpen={isOpen} closeModal={closeModal} />
    </>
};

export default Subscription;
