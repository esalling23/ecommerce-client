import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexProducts = () => {
  return axios({
    url: apiUrl + '/products'
  })
}

export const showProduct = (id) => {
  return axios({
    url: apiUrl + '/products/' + id
  })
}
