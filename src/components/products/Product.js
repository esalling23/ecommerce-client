import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AddToCartButton } from '../styled/Buttons'
import Card from 'react-bootstrap/Card'

const ProductCard = styled(Card)`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  padding: 1em 0.5em;
  text-align: center;

  width: 49%;

  &:nth-child(1) {
    margin-left: 0;
  }

  &:nth-child(4n) {
    margin-right: 0;
  }

  @media (min-width: 768px) {
    width: 24%;
  }
`

const Product = ({ id, title, price, addToCart }) => {
  return (
    <ProductCard>
      <Link to={`/details/${id}`} className="d-flex" style={{
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Img
          variant="top"
          src="https://res.cloudinary.com/esalling/image/upload/v1518704988/few_dots.jpg"
        />
        </div>
        <Card.Title style={{ marginTop: '0.5em' }}>{title}</Card.Title>
      </Link>
      <Card.Text>${price}</Card.Text>
      <AddToCartButton onClick={() => addToCart(id, 1)}>Add to cart</AddToCartButton>
    </ProductCard>
  )
}

export default Product
