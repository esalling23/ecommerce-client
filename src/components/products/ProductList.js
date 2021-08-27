import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import ProductComponent from './Product'
import { updateOrder } from '../../api/orders'
import { indexProducts } from '../../api/products'

const ProductList = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 2rem auto;
  width: 80%;

  &:after {
    content: "";
    flex-basis: 24%;
    flex-grow: 0;
  }

  @media (max-width: 768px) {
    &:after {
      flex-basis: 49%;
    }
  }
`

const ProductListComponent = ({ order, setOrder, user, msgAlert, history }) => {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    indexProducts()
      .then(res => setProducts(res.data.products))
      .then(() => msgAlert({
        heading: 'Index Products Success',
        message: 'Check em out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Index Products Failure',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const addToCart = (prodId) => {
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

    updateOrder(order._id, prodId, user)
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

  return (
    <ProductList>
      {products
        ? products.map(product =>
          <ProductComponent
            key={product._id}
            id={product._id}
            title={product.title}
            description={product.description}
            price={product.price}
            addToCart={addToCart}
          />
        )
        : 'Loading...'}
    </ProductList>
  )
}

export default withRouter(ProductListComponent)
