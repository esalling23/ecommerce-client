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

export const addProductOrder = (orderId, productId, count, user) => {
  return axios({
    url: `${apiUrl}/orders/${orderId}/products`,
    method: 'post',
    data: { productId, count },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateProductOrder = (orderId, productId, count, user) => {
  return axios({
    url: `${apiUrl}/orders/${orderId}/products`,
    method: 'patch',
    data: { productId, count },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const removeProductOrder = (orderId, productId, user) => {
  return axios({
    url: `${apiUrl}/orders/${orderId}/products`,
    method: 'delete',
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
