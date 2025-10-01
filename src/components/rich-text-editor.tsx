"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Toolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null

    return (
        <div className="border border-input bg-transparent rounded-t-md p-2 flex items-center gap-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'bg-gray-200 p-2 rounded-md' : 'p-2 rounded-md hover:bg-gray-100'}
            >
                <strong>B</strong>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'bg-gray-200 p-2 rounded-md' : 'p-2 rounded-md hover:bg-gray-100'}
            >
                <em>I</em>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'bg-gray-200 p-2 rounded-md' : 'p-2 rounded-md hover:bg-gray-100'}
            >
                <s>S</s>
            </button>
        </div>
    )
}

export const RichTextEditor = ({
                                   value,
                                   onChange,
                               }: {
    value: string
    onChange: (value: string) => void
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
        ],
        content: value,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    'prose dark:prose-invert min-h-[150px] w-full rounded-b-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    return (
        <div>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
