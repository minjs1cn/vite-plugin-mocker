const config = {
  dir: '/mock',
  pattern: '/api',
  delay: [0, 100]
}

export type MockConfig = {
  dir?: string
  pattern?: string
  delay?: [number, number]
}

export default config