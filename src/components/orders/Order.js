import React from 'react'
import styled from 'styled-components'

import ListGroup from 'react-bootstrap/ListGroup'

import CountForm from '../shared/CountForm'
import { Image } from 'react-bootstrap'

const StyledOrder = styled.div`
  width: 100%;
  max-width: 768px;

  @media (min-width: 768px) {
    min-width: 40%;
  }
`

const RemoveBtn = styled.button`
  position: relative;
  width: fit-content;
  bottom: 0;
  left: 0;
  padding: 0;
  background: none;
  border: 0;
  font-size: 0.75em;
  margin-top: 0.5em;
  color: black;
  font-weight: 500;

  &:hover, &:focus {
    font-weight: bold;
  }
`

const Order = ({
  total,
  products = [],
  removeFromCart = () => {},
  updateProductInCart = () => {},
  displayOnly = false
}) => {
  return (
    <StyledOrder className="p-2">
      <ListGroup>
        {products.map(({ productRef, count }, i) => (
          <ListGroup.Item
            key={i}
            variant='info'
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <Image
                src={productRef.image}
                alt={`${productRef.title} image`}
                style={{ width: '100%', aspectRatio: '1' }}
              />
              <div style={{ padding: '0px 1rem' }}>
                <h3>{productRef.title}</h3>
                <p>${productRef.price} each</p>
                {displayOnly
                  ? <span>x {count}</span>
                  : <CountForm
                    prodId={productRef._id}
                    count={count}
                    updateProductInCart={updateProductInCart}
                  />
                }
              </div>
              <span className="order-price">${(parseFloat(productRef.price) * count).toFixed(2)}</span>
            </div>
            {!displayOnly && <RemoveBtn onClick={() => removeFromCart(productRef._id)}>
              Remove from cart
            </RemoveBtn>}
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="order-price" style={{ fontWeight: 'bold' }} variant='warning'>Total: ${total}</ListGroup.Item>
      </ListGroup>
    </StyledOrder>
  )
}

export default Order
