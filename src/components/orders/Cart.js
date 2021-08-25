import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Order from './Order'
import { paymentIntent } from '../../api/stripe'

const Cart = ({ order, user, msgAlert }) => {
  const [clientSecret, setClientSecret] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    paymentIntent(order._id, user)
      .then(res => setClientSecret(res.data))
      .catch(err => msgAlert({
        heading: 'Payment intent failed',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleCheckout = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      msgAlert({
        heading: 'Stripe not loaded',
        message: 'Try again in a few seconds',
        variant: 'info'
      })
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })

    if (payload.error) {
      msgAlert({
        heading: 'Payment Error',
        message: 'Something went wrong: ' + payload.error.message,
        variant: 'danger'
      })
    } else {
      msgAlert({
        heading: 'Payment success',
        message: 'Thanks for the money ;)',
        variant: 'success'
      })
    }
  }

  return (
    <>
      <h2>Current Cart:</h2>
      {order && (
        <Order products={order.products} />
      )}
      <form onSubmit={handleCheckout}>
        <CardElement/>
        <button>Checkout</button>
      </form>
    </>
  )
}

export default Cart
