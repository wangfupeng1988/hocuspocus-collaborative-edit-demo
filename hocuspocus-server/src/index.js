const Koa = require('koa')
const websocket = require('koa-easy-ws')
const { Server } = require('@hocuspocus/server')
const { Logger } = require('@hocuspocus/extension-logger')
const { Database } = require('@hocuspocus/extension-database')
const { TiptapTransformer } = require('@hocuspocus/transformer')
// const Router = require('koa-router')

// Configure Hocuspocus
const server = Server.configure({
  onConnect: async (data) => {
    console.log('New connection')
  },
  onDisconnect: async (data) => {
    console.log('Disconnected')
  },
  onStoreDocument: async (data) => {
    const json = TiptapTransformer.fromYdoc(data.document, 'default')
    console.log('Document stored .... ', data.documentName, json)
  },
  onLoadDocument: async (data) => {
    console.log('Document loaded')
  },
  extensions: [
    new Database({
      store: async ({ documentName, state }) => {
        console.log('Store db ... ', documentName, state)
      },
    }),
  ],
})

const app = new Koa()

// Setup your koa instance using the koa-easy-ws extension
app.use(websocket())

// Add a websocket route for Hocuspocus
// You can set any contextual data like in the onConnect hook
// and pass it to the handleConnection method.
app.use(async (ctx, next) => {
  const ws = await ctx.ws()
  // console.log('ws....', ws)

  server.handleConnection(
    ws,
    ctx.request,
    // additional data (optional)
    {
      // user_id: 1234,
    }
  )
})

// const router = new Router()
// router.get('/', async (ctx) => {
//   ctx.body = 'Hello World'
// })
// router.get('/collaborate', async (ctx) => {
//   const ws = await ctx.ws()

//   server.handleConnection(
//     ws,
//     ctx.request,
//     // additional data (optional)
//     {
//       // user_id: 1234,
//     }
//   )
// })
// app.use(router.routes()).use(router.allowedMethods())

// Start the server
app.listen(1234)
