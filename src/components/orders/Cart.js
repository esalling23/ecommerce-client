import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Order from './Order'
import Button from '../styled/Buttons'
import { paymentIntent } from '../../api/stripe'
import { checkoutOrder } from '../../api/orders'

import Form from 'react-bootstrap/Form'

const CheckoutForm = styled(Form)`
  min-height: 100%;
  position: relative;
`

const CheckoutButton = styled(Button)`
  bottom: 0px;
  position: absolute;
  width: 100%;
`

const CheckoutBackground = styled.div`
  border-radius: 0.25em;
  border: 1px solid rgba(0, 0, 0, 0.125);
  height: 10em;
  width: 100%;

  @media (max-width: 768px) {
    min-width: 40%;
  }
`

const ViewContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

const Cart = ({ order, user, msgAlert, completeOrder, history }) => {
  const [clientSecret, setClientSecret] = useState(null)
  const [total, setTotal] = useState(0)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (order.products.length > 0) {
      paymentIntent(order._id, user)
        .then(res => {
          setClientSecret(res.data.clientSecret)
          setTotal(res.data.totalPrice)
        })
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
      <ViewContainer>
        {order && (
          <>
            <Order products={order.products} total={total}/>
          </>
        )}
        {clientSecret && (
          <CheckoutBackground className="bg-accent m-2 p-3">
            <CheckoutForm onSubmit={handleCheckout}>
              <CardElement />
              <CheckoutButton type="submit">Checkout</CheckoutButton>
            </CheckoutForm>
          </CheckoutBackground>
        )}
      </ViewContainer>
    </>
  )
}

export default withRouter(Cart)
