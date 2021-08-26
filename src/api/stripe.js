import axios from 'axios'
import apiUrl from '../apiConfig'

export const paymentIntent = (orderId, user) => {
  return axios({
    url: apiUrl + '/stripe/payment-intent/' + orderId,
    method: 'post',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
