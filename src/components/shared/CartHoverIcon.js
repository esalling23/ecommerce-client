import React, { useState } from 'react'
import { Fade } from 'react-bootstrap'
import { Cart, CartFill } from 'react-bootstrap-icons'

const CartHoverIcon = () => {
  const baseSize = 1.4
  const iconSize = baseSize + 'em'
  const containerSize = (baseSize + 0.1) + 'em'
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{ width: containerSize }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Fade className="position-absolute" timeout={800} in={!hover}>
        <Cart size={iconSize}/>
      </Fade>
      <Fade className="position-absolute" in={hover}>
        <CartFill size={iconSize}/>
      </Fade>
    </div>
  )
}

export default CartHoverIcon
