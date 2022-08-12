import fs from 'fs'
import path from 'path'
import express from 'express'
import { port } from './config/server'
import { fileURLToPath } from 'node:url'
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
      base: '/test/',
      root: process.cwd(),
      logLevel: 'error',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: port
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
    try {
      const { originalUrl: url } = req

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/server.ts')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/server.ts')).render
      }

      const [appHtml, preloadLinks] = await render(url, manifest)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

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
