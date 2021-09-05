import React from 'react'
import styled from 'styled-components'

import ListGroup from 'react-bootstrap/ListGroup'
import Link from '../styled/Links'

import CountForm from '../shared/CountForm'

const StyledOrder = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    min-width: 40%;
  }
`

const RemoveLink = styled(Link)`
  display: block;
  font-size: 0.75em;
  margin-top: 0.5em;
`

const Order = ({ total, products, removeFromCart, updateProductInCart }) => {
  return (
    <StyledOrder className="p-2">
      <h2>Current Cart:</h2>
      <ListGroup>
        {products.map(({ productRef, count }, i) => (
          <ListGroup.Item
            key={i}
            variant='info'
          >
            <span>{productRef.title} - ${productRef.price} each</span>
            <CountForm
              prodId={productRef._id}
              count={count}
              updateProductInCart={updateProductInCart}
            />
            <span className="order-price">${(parseFloat(productRef.price) * count).toFixed(2)}</span>
            <RemoveLink onClick={() => removeFromCart(productRef._id)}>Remove from cart</RemoveLink>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="order-price" style={{ fontWeight: 'bold' }} variant='warning'>Total: ${total}</ListGroup.Item>
      </ListGroup>
    </StyledOrder>
  )
}

export default Order
