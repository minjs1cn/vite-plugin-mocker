# vite-plugin-mocker

更加方便的模拟本地 mock 服务

## Install

```
yarn add vite-plugin-mocker
```

## Usage

**vite.config.ts**

```ts
import { defineConfig } from 'vite'
import viteMocker from 'vite-plugin-mocker'

export default defineConfig({
  plugins: [
    viteMocker({
      dir: '/mocks',
      pattern: '/api'
    })
  ]
})
```

**MockConfig**

```ts
{
  dir?: string;
  pattern?: string;
}
```

## Mock file example

`/path/mock/init.js`

```js
const mocker = function(req) {
  return {
    code: 0,
    success: true,
    data: 'success'
  }
}

// 请求类型， 默认为 'GET'
mocker.methods = 'GET'

module.export = mocker
```


`/path/mock/init.json`

```json
{
  "code": 0,
  "success": true,
  "data": "success"
}
```
