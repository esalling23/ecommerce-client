import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Order from './Order'
import { paymentIntent } from '../../api/stripe'
import { checkoutOrder } from '../../api/orders'

const Cart = ({ order, user, msgAlert, completeOrder, history }) => {
  const [clientSecret, setClientSecret] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (order.products.length > 0) {
      paymentIntent(order._id, user)
        .then(res => setClientSecret(res.data))
        .catch(err => msgAlert({
          heading: 'Payment intent failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        }))
    }
  }, [])

  const paymentError = (error) => {
    msgAlert({
      heading: 'Payment Error',
      message: 'Something went wrong: ' + error.message,
      variant: 'danger'
    })
  }

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
      paymentError(payload.error)
    } else {
      checkoutOrder(order._id, user)
        .then(res => {
          completeOrder()
          history.push('/')
          msgAlert({
            heading: 'Payment success',
            message: 'Thanks for the money ;) Buy more things now',
            variant: 'success'
          })
        })
        .catch(paymentError)
    }
  }

  return (
    <>
      <h2>Current Cart:</h2>
      {order && (
        <Order products={order.products} />
      )}
      {clientSecret && <form onSubmit={handleCheckout}>
        <CardElement/>
        <button>Checkout</button>
      </form>}
    </>
  )
}

export default withRouter(Cart)
