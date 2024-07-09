'use client'

import './styles.css'

// import { TiptapCollabProvider } from '@hocuspocus/provider'
import { HocuspocusProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'

import Editor from './Editor'

const appId = '7j9y6m10'
const room = `room.${new Date().getFullYear().toString().slice(-2)}${
  new Date().getMonth() + 1
}${new Date().getDate()}`

// ydoc and provider for Editor A
const ydocA = new Y.Doc()
const providerA = new HocuspocusProvider({
  // appId,
  url: 'ws://127.0.0.1:1234',
  name: room,
  document: ydocA,
})

// ydoc and provider for Editor B
const ydocB = new Y.Doc()
const providerB = new HocuspocusProvider({
  // appId,
  url: 'ws://127.0.0.1:1234',
  name: room,
  document: ydocB,
})

const App = () => {
  return (
    <div className="col-group">
      <Editor provider={providerA} ydoc={ydocA} room={room} />
      <Editor provider={providerB} ydoc={ydocB} room={room} />
    </div>
  )
}

export default App
