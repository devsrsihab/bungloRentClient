import PropTypes from "prop-types"; // ES6

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const PaymentModal = ({isOpen,closeModal,payPrice}) => {



//   function openModal() {
//     setIsOpen(true)
//   }

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment for Subscription {payPrice}
                  </Dialog.Title>
                  <div className="mt-2">
                   {/* Modal body */}
                  </div>

                  <div className="mt-4">
                   
                   {/* stripe payment  */}
                   <Elements stripe={stripePromise} >
                    <CheckoutForm closeModal={closeModal} payPrice={payPrice} />
                   </Elements>




                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


// props validation
PaymentModal.propTypes = {
    setIsOpen: PropTypes.func,
    closeModal: PropTypes.func,
    payPrice: PropTypes.integer,
    isOpen: PropTypes.bool,
  };

export default PaymentModal
