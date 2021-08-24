import React from 'react'

import Order from './Order'

const Cart = ({ order }) => {
  return (
    <>
      <h2>Current Cart:</h2>
      {order && (
        <Order products={order.products} />
      )}
    </>
  )
}

export default Cart
