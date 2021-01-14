import config, { MockConfig } from './config'
import fs from 'fs'
import { Plugin } from 'vite'

function findPath(dir: string) {
  let url = dir + '.js'
  if(fs.existsSync(url)) {
    return {
      url,
      type: 'js'
    }
  }

  url = dir + '.json'
  if(fs.existsSync(url)) {
    return {
      url,
      type: 'json'
    }
  }

  url = dir + '/index.js'
  if(fs.existsSync(url)) {
    return {
      url,
      type: 'js'
    }
  }

  url = dir + '/index.json'
  if(fs.existsSync(url)) {
    return {
      url,
      type: 'json'
    }
  }

  return undefined
}

function MockPlugin(opts: MockConfig = {}): Plugin {
  const options = {
    ...config,
    ...opts
  }

  // /^\/api(.+)/
  const pattern = new RegExp(`^${options.pattern}(.+)`)
  const dir = process.cwd() + options.dir

  return {
    name: 'vite-plugin-mocker',
    configureServer(server) {
      server.app.use(async (req, res, next) => {
        if (req.url) {
          const match = pattern.exec(req.url)
          const method = req.method?.toLowerCase()
          // 符合mock路由
          if (match) {
            const mockpath = match[1]
            const mock = findPath(dir + mockpath)
            if (mock) {
              delete require.cache[mock.url]

              let data, methods = [], mocker
    
              switch(mock.type) {
                case 'json':
                  try {
                    data = require(mock.url)
                    methods.push('get')
                  } catch (error) {}
                  break
                case 'js':
                  try {
                    mocker = require(mock.url)
                    data = await mocker(req)
                    methods = mocker.method ? mocker.method.split('|').map((item: string) => item.toLowerCase()) : ['get']
                  } catch (error) {}
                  break
                default:
                  break
              }

              if (methods.includes(method)) {
                res.end(JSON.stringify(data))
              } else {
                res.end(JSON.stringify('request method is invalid'))
              }
            } else {
              // 没找到mock数据
              next()
            }
          } else {
            next()
          }
        } else {
          next()
        }
      })
    }
  }
}

export default MockPlugin

export { MockConfig } from './config'