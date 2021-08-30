import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexOrders = (user, completed = false) => {
  let url = apiUrl + '/orders'
  if (completed) {
    url += '?completed=true'
  }
  return axios({
    url,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createOrder = (user) => {
  return axios({
    url: apiUrl + '/orders',
    method: 'post',
    data: { order: {} },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateOrder = (orderId, productId, user) => {
  return axios({
    url: apiUrl + '/orders/' + orderId,
    method: 'patch',
    data: { productId },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const checkoutOrder = (orderId, user) => {
  return axios({
    url: apiUrl + '/orders/' + orderId + '/checkout',
    method: 'patch',
    data: {},
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
