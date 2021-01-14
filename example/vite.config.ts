import { defineConfig } from 'vite'
import viteMocker from '../src/index'

export default defineConfig({
  plugins: [
    viteMocker()
  ]
})