import React from 'react'

const Order = ({ products }) => (
  <ul>
    {products.length > 0
      ? products.map((product, i) => (
        <li key={i}>
          {product.title}
        </li>
      ))
      : 'No products yet, go add some to the cart!'}
  </ul>

)

export default Order
