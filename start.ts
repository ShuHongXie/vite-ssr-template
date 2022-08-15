import fs from 'fs'
import path from 'path'
import express from 'express'
import { port } from './config/server'
import { fileURLToPath } from 'node:url'
import devalue from '@nuxt/devalue'
const isProd = process.env.NODE_ENV === 'production'

async function createServer() {
  console.log('执行')
  const app = express()

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''
  const manifest = isProd
    ? // @ts-ignore
      (await import('./dist/client/ssr-manifest.json')).default
    : {}

  // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制

  let vite
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      base: '/',
      root: process.cwd(),
      logLevel: 'error',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: 9998
        }
      },
      appType: 'custom'
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      '/',
      // @ts-ignore
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    console.log('进入服务器路由')
    try {
      const { originalUrl: url } = req
      let context = { url, state: {} }

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/server.ts')).default
        console.log(template, render)
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/server.js')).default
      }
      console.log('准备渲染')

      const { appHtml, preloadLinks } = await render(context, manifest)
      console.log(appHtml, template)
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`// --state--outlet`, `window.__INITIAL_STATE__=${devalue(context.state) || {}}`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log(`服务监听于: http://localhost:${port}`)
  })
}

createServer()
