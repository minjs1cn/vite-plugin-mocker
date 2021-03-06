import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(response => response.data)

axios.post('/a', {
  c: 'zm'
}).then(res => {
  console.log('a: ', res)
})

axios.get('/b?a=1').then(res => {
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
