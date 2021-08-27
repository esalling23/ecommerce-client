import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { AddToCartButton } from '../styled/Buttons'
import { showProduct } from '../../api/products'

const ProductPage = ({ match, msgAlert, addToCart }) => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    showProduct(match.params.id)
      .then(res => setProduct(res.data.product))
      .then(() => msgAlert({
        heading: 'Show Product Success!',
        message: 'Check out the product details on this page.',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Show Product Failed',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  if (product === null) {
    return 'Loading...'
  }

  return (
    <>
      <h3>{product.title}</h3>
      <h4>Price: ${product.price}</h4>
      <img src="https://res.cloudinary.com/esalling/image/upload/v1518704988/few_dots.jpg"/>
      <p>{product.description}</p>
      <div style={{ width: '18rem' }}>
        <AddToCartButton onClick={() => addToCart(match.params.id)}>Add to cart</AddToCartButton>
      </div>
    </>
  )
}

export default withRouter(ProductPage)
