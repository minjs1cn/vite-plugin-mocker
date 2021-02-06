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
      // mock文件目录地址
      dir: '/mocks',
      // mock请求统一开头
      pattern: '/api',
      // 返回延迟随机区间
      delay: [0, 200]
    })
  ]
})
```

**MockConfig**

```ts
{
  dir?: string;
  pattern?: string;
  delay?: [number, number];
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
// 请求响应延迟时间，单位ms
mocker.delay = 3000

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

## 高级用法

```js
const mocker = function(req) {
  if (req.method === 'POST') {
    return {
      code: 0,
      success: true,
      data: req.body // post请求参数
    }
  }

  if (req.method === 'GET') {
    return {
      code: 0,
      success: true,
      data: req.query // get请求参数
    }
  }
}

mocker.methods = 'GET|POST'

module.export = mocker
```