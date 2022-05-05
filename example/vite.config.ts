import { defineConfig } from 'vite'
import viteMocker from '../src/index'

export default defineConfig({
  plugins: [
    viteMocker({
      delay: [0, 10000]
    })
  ]
})