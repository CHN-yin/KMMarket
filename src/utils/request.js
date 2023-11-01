import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'http://120.79.21.14',
  // baseURL: 'https://www.fastmock.site/mock/cceb699e37e38582b5bffb76a1cb2d8d/jd',
  withCredentials: true, // 跨域带 cookie
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export const del = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.delete(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
