import React from 'react'
import styled from 'styled-components'

import ListGroup from 'react-bootstrap/ListGroup'

const StyledOrder = styled.div`
  @media (min-width: 768px) {
    min-width: 40%;
  }
`

const Order = ({ total, products }) => (
  <StyledOrder className="p-2">
    {products.length > 0
      ? (<ListGroup>
        {products.map((product, i) => (
          <ListGroup.Item
            key={i}
            variant='info'
          >
            {product.title} - ${product.price}
          </ListGroup.Item>
        ))}
        <ListGroup.Item style={{ fontWeight: 'bold' }} variant='warning'>Total: ${total}</ListGroup.Item>
      </ListGroup>)
      : 'No products yet, go add some to the cart!'}
  </StyledOrder>
)

export default Order
