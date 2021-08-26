import React from 'react'
import styled from 'styled-components'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ProductCard = styled(Card)`
  display: inline-flex;
  width: 24%;
  margin-top: 1em;

  &:nth-child(1) {
    margin-left: 0;
  }

  &:nth-child(4n) {
    margin-right: 0;
  }
`

const ProductComponent = ({ id, title, description, addToCart }) => (
  <ProductCard>
    <h4>{title}</h4>
    <p>{description}</p>
    <Button onClick={() => addToCart(id)}>Add to cart</Button>
  </ProductCard>
)

export default ProductComponent
