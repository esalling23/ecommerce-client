import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Product from './Product'
import { indexProducts } from '../../api/products'

const GRID_SIZE = 4

const ProductList = styled.div`
  align-items: stretch;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 2rem auto;
  width: 80%;

  &:after {
    content: "";
    flex-basis: ${props => (GRID_SIZE - (props.listLen % GRID_SIZE)) * 24}%;
    flex-grow: 0;
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
    <>
      {products
        ? products.length === 0
          ? <p className="text-center">Sorry... looks like we&apos;re out of stock of everything.</p>
          : <ProductList listLen={products ? products.length : 0}>
            {products.map(product =>
              <Product
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                image={product.image}
                addToCart={addToCart}
              />
            )}
          </ProductList>
        : <p className="text-center">Loading...</p>}
    </>
  )
}

export default ProductListComponent
