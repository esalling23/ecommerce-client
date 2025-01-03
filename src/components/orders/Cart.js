import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Spinner from 'react-bootstrap/Spinner'

import Order from './Order'
import Button from '../styled/Buttons'
import { ColoredPanel } from '../styled/Panels'
import { paymentIntent } from '../../api/stripe'
import { checkoutOrder } from '../../api/orders'

import Form from 'react-bootstrap/Form'
import handleBadCreds from '../../lib/handleBadCreds'

const CheckoutForm = styled(Form)`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  position: relative;
  width: 100%;
`

const CheckoutButton = styled(Button)`

`

const CheckoutBackground = styled(ColoredPanel)`
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

const Cart = ({
  order,
  user,
  clearUser,
  msgAlert,
  completeOrder,
  history,
  removeFromCart,
  updateProductInCart
}) => {
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
        .catch(err => {
          handleBadCreds(err, history, clearUser)
          msgAlert({
            heading: 'Payment intent failed',
            message: 'Something went wrong: ' + err.message,
            variant: 'danger'
          })
        })
    }
  }, [order])

  const paymentError = (error) => {
    handleBadCreds(error, history, clearUser)
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
          history.push('/order/confirmation')
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
            {order.products.length > 0
              ? (
                <>
                  <Order
                    products={order.products}
                    total={total}
                    removeFromCart={removeFromCart}
                    updateProductInCart={updateProductInCart}
                  />
                  <CheckoutBackground variant="accent" className="m-2 p-3">
                    {clientSecret
                      ? (<CheckoutForm onSubmit={handleCheckout}>
                        <CardElement />
                        <Form.Text className="text-muted my-2">
                          This is a dummy application. Do not enter real information.<br/> Use test card number <code>4242 4242 4242 4242</code>, any future expiration date, and any numbers for CVC and postal code.
                        </Form.Text>
                        <CheckoutButton type="submit">Checkout</CheckoutButton>
                      </CheckoutForm>)
                      : (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>)
                    }
                  </CheckoutBackground>
                </>
              )
              : 'No items in cart - get to shopping!'
            }
          </>
        )}
      </ViewContainer>
    </>
  )
}

export default withRouter(Cart)
