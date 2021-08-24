import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Product from './Product'
import { updateOrder } from '../../api/orders'
import { indexProducts } from '../../api/products'

const ProductList = ({ order, setOrder, user, msgAlert, history }) => {
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
    <>
      {products
        ? products.map(product =>
          <Product
            key={product._id}
            id={product._id}
            title={product.title}
            description={product.description}
            price={product.price}
            addToCart={addToCart}
          />
        )
        : 'Loading...'}
    </>
  )
}

export default withRouter(ProductList)
