import React, { useState, useEffect } from 'react'

import { indexOrders } from '../../api/orders'

const OrderHistory = ({ msgAlert, user }) => {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    indexOrders(user, true)
      .then(res => setOrders(res.data.orders))
      .then(() => msgAlert({
        heading: 'Order History Success',
        message: 'All completed orders displayed',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Order History Failure',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  if (orders === null) {
    return 'loading...'
  } else if (orders.length === 0) {
    return 'No orders to display - get shopping!'
  }

  return (
    <ul>
      {orders.map(order => (
        <li key={order._id}>{order.products.length} items - ${order.totalPrice}</li>
      ))}
    </ul>
  )
}

export default OrderHistory
