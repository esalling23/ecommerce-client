import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { AddToCartButton } from '../styled/Buttons'
import { showProduct } from '../../api/products'

import Image from 'react-bootstrap/Image'

const StyledPage = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: row;
  flex-grow: 0;
  justify-content: center;
  margin: 2em;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

const PageSection = styled.div`
  flex: auto;
  margin: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
  }
`

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
    <StyledPage>
      <PageSection>
        <Image
          fluid
          className="w-100"
          src="https://res.cloudinary.com/esalling/image/upload/v1518704988/few_dots.jpg"
        />
        <p className="py-4">{product.description}</p>
      </PageSection>
      <PageSection>
        <h3 className="text-display">{product.title}</h3>
        <h4>Price: ${product.price}</h4>
        <AddToCartButton onClick={() => addToCart(match.params.id)}>Add to cart</AddToCartButton>
      </PageSection>
    </StyledPage>
  )
}

export default withRouter(ProductPage)
