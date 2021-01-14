import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(response => response.data)

axios.get('/a').then(res => {
  console.log('a: ', res)
})

axios.get('/b').then(res => {
  console.log('b: ', res)
})

axios.get('/c').then(res => {
  console.log('c: ', res)
})

axios.get('/d').then(res => {
  console.log('d: ', res)
})

axios.get('/e').then(res => {
  console.log('e: ', res)
})
