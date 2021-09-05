import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Product from './Product'
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

const ProductListComponent = ({ addToCart, msgAlert }) => {
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

  return (
    <ProductList>
      {products
        ? products.map(product =>
          <Product
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            addToCart={addToCart}
          />
        )
        : 'Loading...'}
    </ProductList>
  )
}

export default ProductListComponent
