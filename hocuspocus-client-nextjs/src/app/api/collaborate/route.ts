import { Server } from '@hocuspocus/server'
import { TiptapTransformer } from '@hocuspocus/transformer'
import { Database } from '@hocuspocus/extension-database'

const hocuspocusServer = Server.configure({
  // config
  onConnect: async (payload) => {
    console.log('New connection')
  },
  onDisconnect: async (payload) => {
    console.log('Disconnected')
  },
  onStoreDocument: async (data) => {
    const json = TiptapTransformer.fromYdoc(data.document, 'default')
    console.log('Document stored .... ', data.documentName, json)
  },
  extensions: [
    new Database({
      store: async ({ documentName, state }) => {
        console.log('Store db ... ', documentName, state)
      },
    }),
  ],
})

export function GET() {
  const headers = new Headers()
  headers.set('Connection', 'Upgrade')
  headers.set('Upgrade', 'websocket')
  return new Response('Upgrade Required', { status: 426, headers })
}

export function SOCKET(
  client: import('ws').WebSocket,
  _request: import('http').IncomingMessage,
  server: import('ws').WebSocketServer
) {
  // console.log('headers....', _request.headers)

  console.log('A client connected')

  client.on('message', (message) => {
    // console.log('Received message:', message)
    // client.send(message);
  })

  client.on('close', () => {
    console.log('A client disconnected')
  })

  hocuspocusServer.handleConnection(client, _request, {})
}
