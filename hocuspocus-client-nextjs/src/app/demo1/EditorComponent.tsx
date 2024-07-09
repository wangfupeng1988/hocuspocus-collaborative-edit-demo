'use client'

// import { Editor } from '@tiptap/core'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'

export default function EditorComponent() {
  const ydoc = new Y.Doc()

  const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:1234',
    name: 'example-document',
    document: ydoc,
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // 禁用默认的 history 扩展
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: { name: 'John Doe', color: '#ffcc00' },
      }),
    ],
  })

  return (
    <div className="border">
      <EditorContent editor={editor} />
    </div>
  )
}
