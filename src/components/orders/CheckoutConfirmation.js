import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Order from './Order'
import LinkButton from '../shared/LinkButton'
import { indexOrders } from '../../api/orders'

const ViewContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-wrap: wrap;
  }
`

const CheckoutConfirmation = ({
  user,
  msgAlert,
  history
}) => {
  const [recentOrder, setRecentOrder] = useState(null)

  useEffect(() => {
    indexOrders(user, true)
      .then(res => setRecentOrder(res.data.orders[0]))
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
  return (
    <>

      <ViewContainer>
        <h2>Your recent order:</h2>
        {recentOrder && (
          <div>
            {recentOrder.products.length > 0
              ? <Order
                products={recentOrder.products}
                total={recentOrder.totalPrice}
                displayOnly
              />
              : 'Hmmm nothing in this order...'
            }
          </div>
        )}
        <div className="flex-center mt-5">
          <LinkButton
            to="/"
          >Check out more awesome products</LinkButton>
        </div>
      </ViewContainer>
    </>
  )
}

export default withRouter(CheckoutConfirmation)
