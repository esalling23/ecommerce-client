import React from 'react'

const Product = ({ id, title, description, addToCart }) => (
  <div>
    <h4>{title}</h4>
    <p>{description}</p>
    <button onClick={() => addToCart(id)}>Add to cart</button>
  </div>
)

export default Product
