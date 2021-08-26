import React, { useState, useEffect, Fragment } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Cart from './components/orders/Cart'
import ProductList from './components/products/ProductList'

import { createOrder } from './api/orders'

const stripePromise = loadStripe('pk_test_51HtHLTIILRHGeAn02ibfcqyDtGe4EAD0Qubsd3jPzOrIg5fnYSwaMDNDHaDsUx3XQZUgbq67UhLraMjpOQIWXfex0064HXxmqF')

const App = () => {
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
      <main className='container'>
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
          path='/change-password'
          render={() => (
            <ChangePassword msgAlert={msgAlert} user={user} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/cart'
          render={() => (
            <Elements stripe={stripePromise}>
              <Cart msgAlert={msgAlert} user={user} order={order} completeOrder={getCreateOrder}/>
            </Elements>
          )}
        />
        <Route
          path='/'
          render={() => (
            <ProductList
              msgAlert={msgAlert}
              user={user}
              setOrder={setOrder}
              order={order}
            />
          )}
        />
      </main>
    </Fragment>
  )
}

export default App
