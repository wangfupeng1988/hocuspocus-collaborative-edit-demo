const Koa = require('koa')
const websocket = require('koa-easy-ws')
const { Server } = require('@hocuspocus/server')
const { Logger } = require('@hocuspocus/extension-logger')
const { Database } = require('@hocuspocus/extension-database')
const { TiptapTransformer } = require('@hocuspocus/transformer')

// Configure Hocuspocus
const server = Server.configure({
  onConnect: async (ws, req, data) => {
    console.log('New connection')
  },
  onDisconnect: async (ws, code, reason) => {
    console.log('Disconnected')
  },
  onError: async (ws, err) => {
    console.log('Error')
  },
  onStoreDocument: async (doc) => {
    const json = TiptapTransformer.fromYdoc(doc.document, 'default')
    console.log('Document stored .... ', doc.documentName, json)
  },
  onLoadDocument: async (doc) => {
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

  server.handleConnection(
    ws,
    ctx.request,
    // additional data (optional)
    {
      // user_id: 1234,
    }
  )
})

// Start the server
app.listen(1234)
