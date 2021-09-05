import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { withRouter, Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import Account from './components/auth/Account'
import Cart from './components/orders/Cart'
import ProductListComponent from './components/products/ProductList'
import ProductPage from './components/products/ProductPage'

import Container from 'react-bootstrap/Container'

import { createOrder, addProductOrder, removeProductOrder, updateProductOrder } from './api/orders'

const stripePromise = loadStripe('pk_test_51HtHLTIILRHGeAn02ibfcqyDtGe4EAD0Qubsd3jPzOrIg5fnYSwaMDNDHaDsUx3XQZUgbq67UhLraMjpOQIWXfex0064HXxmqF')

const MainContainer = styled(Container)`
  margin-top: 2rem;
`

const App = ({ history }) => {
  const [user, setUserState] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (user) {
      // user sign in, get current order
      getCreateOrder()
    }
  }, [user])

  const setUser = (user) => setUserState(user)

  const clearUser = () => setUserState(null)

  const deleteAlert = (id) => {
    setMsgAlerts(alerts => alerts.filter((msg) => msg.id !== id))
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(alerts => [...alerts, { heading, message, variant, id }])
  }

  const addToCart = (prodId, count) => {
    // if no order or user, send user to sign in
    if (!order || !user) {
      history.push('/sign-in')
      msgAlert({
        heading: 'Please sign in',
        message: 'Login or create an account to start shopping',
        variant: 'info'
      })
      return
    }

    addProductOrder(order._id, prodId, count, user)
      .then(res => setOrder(res.data.order))
      .then(() => msgAlert({
        heading: 'Added product to the cart',
        message: 'Check out your cart to see the product',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Could not add product to the cart',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  const removeFromCart = (prodId) => {
    if (signInFirst()) return

    removeProductOrder(order._id, prodId, user)
      .then(res => setOrder(res.data.order))
      .then(() => msgAlert({
        heading: 'Product successfully removed from cart',
        message: 'Better replace it with something else ;)',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Product not removed from cart',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  const updateProductInCart = (prodId, data) => {
    if (signInFirst()) return

    updateProductOrder(order._id, prodId, data, user)
      .then(res => setOrder(res.data.order))
      .then(() => msgAlert({
        heading: 'Product count successfully updated',
        message: 'Hope you got more!',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Product count not updated',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  const signInFirst = () => {
    if (!order) {
      history.push('/sign-in')
      msgAlert({
        heading: 'Please sign in',
        message: 'Login or create an account first',
        variant: 'info'
      })
      return true
    }

    return false
  }

  const getCreateOrder = () => {
    createOrder(user)
      .then(res => setOrder(res.data.order))
      .catch(err => msgAlert({
        heading: 'Error loading cart.',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  return (
    <Fragment>
      <Header user={user} />
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
      <MainContainer fluid>
        <Route
          path='/sign-up'
          render={() => (
            <SignUp msgAlert={msgAlert} setUser={setUser} />
          )}
        />
        <Route
          path='/sign-in'
          render={() => (
            <SignIn msgAlert={msgAlert} setUser={setUser} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/sign-out'
          render={() => (
            <SignOut
              msgAlert={msgAlert}
              clearUser={clearUser}
              user={user}
            />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/account'
          render={() => (
            <Account msgAlert={msgAlert} user={user} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/cart'
          render={() => (
            <Elements stripe={stripePromise}>
              <Cart
                msgAlert={msgAlert}
                user={user}
                order={order}
                completeOrder={getCreateOrder}
                removeFromCart={removeFromCart}
                updateProductInCart={updateProductInCart}
              />
            </Elements>
          )}
        />
        <Route
          path='/'
          exact
          render={() => (
            <ProductListComponent
              msgAlert={msgAlert}
              user={user}
              addToCart={addToCart}
              order={order}
            />
          )}
        />
        <Route
          path='/details/:id'
          exact
          render={() => (
            <ProductPage
              msgAlert={msgAlert}
              user={user}
              addToCart={addToCart}
              order={order}
            />
          )}
        />
      </MainContainer>
    </Fragment>
  )
}

export default withRouter(App)
