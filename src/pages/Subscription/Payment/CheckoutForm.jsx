import PropTypes from "prop-types"; // ES6
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import './CheckoutForm.css'
import { ImSpinner9 } from 'react-icons/im'
import useAuth from '../../../hooks/useAuth'
import { createPaymentIntent } from "../../../Apis/Subcription";
import { insertPaymentInfo } from "../../../Apis/Payments";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateShop } from "../../../Apis/ShopInsert";
import { updateAdmin } from "../../../Apis/Auth";




const CheckoutForm = ({closeModal,payPrice}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [cardError, setCardError] = useState('')
  const [clientSecret,setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  // Create Payment Intent
  useEffect(() => {
      if (payPrice > 0) {
        createPaymentIntent({price: payPrice})
        .then((res)=>{
            console.log(res.clientSecret);
            setClientSecret(res.clientSecret)
        })
        .catch((err)=>{
            console.log(err);
        })
      }
  },[payPrice])





  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }

    // async function
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('error', error)
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('payment method', paymentMethod)
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      })

    if (confirmError) {
      console.log(confirmError)
      setCardError(confirmError.message)
    }

    console.log('payment intent', paymentIntent)

    // here the payment will be deducted`
    if (paymentIntent.status === 'succeeded') {
      // save payment information to the server
      // Update room status in db
      const paymentInfo = {
        price: parseInt(payPrice) ,
        email: user.email,
        name: user.displayName,
        transactionId: paymentIntent.id,
        date: new Date(),
      }

      try {
        await insertPaymentInfo(paymentInfo)
        // update shop info
        const shopInfo = {
          email: user.email,
          limit: payPrice === "10" && 200 || payPrice === "20" && 450 || payPrice === "40" && 1500,
        }
        await updateShop(shopInfo)
        // update admin info
        const adminInfo = {
          email: user.email,
          income: payPrice === "10" && 200 || payPrice === "20" && 450 || payPrice === "40" && 1500,
        }
        await updateAdmin(adminInfo)

        const text = `Successfully Paid ${ paymentIntent.id}`
        toast.success(text)
        navigate('/dashboard/building-managing')
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }finally{
        setProcessing(false)
      }

      setProcessing(false)
    }
  }

  return (
    <>
      <form className='my-2' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex mt-2 justify-around'>
          <button
            type='button'
            onClick={closeModal}
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={!stripe || !clientSecret || processing}
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {processing ? (
              <ImSpinner9 className='m-auto animate-spin' size={24} />
            ) : (
              `Pay ${payPrice}$`
            )}
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  )
}

// props validation
CheckoutForm.propTypes = {
    closeModal: PropTypes.func,
    payPrice: PropTypes.integer,
  };


export default CheckoutForm