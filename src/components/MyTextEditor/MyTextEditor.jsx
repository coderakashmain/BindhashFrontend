import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useState } from "react";
import "./MyTextEditor.css";

const MyTextEditor = ({ textContent, setTextContent }) => {
    const [filter, setFilter] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
            }),
            Link,
            BulletList,
            OrderedList,
        ],
        content: textContent,
        onUpdate: ({ editor }) => {
            setTextContent(editor.getHTML());
        },
    });

    if (!editor) return null;

    // Filter function
    const applyFilter = (type) => {
        setFilter(type);
    };

    return (
        <div className="editor-container">
            {/* Toolbar */}
            <div className="editor-toolbar">
                <button className="editor-btn" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                <button className="editor-btn" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
                <button className="editor-btn" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
                <button className="editor-btn" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
                <button
                    className="editor-btn"
                    onClick={() => {
                        const url = prompt("Enter link URL:");
                        if (url && editor.can().setLink({ href: url })) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                >🔗 Link</button>
            </div>

            {/* Filter Options */}
            <div className="editor-filters">
                <button className="filter-btn" onClick={() => applyFilter(null)}>All</button>
                <button className="filter-btn" onClick={() => applyFilter("bold")}>Bold</button>
                <button className="filter-btn" onClick={() => applyFilter("italic")}>Italic</button>
                <button className="filter-btn" onClick={() => applyFilter("link")}>Links</button>
                <button className="filter-btn" onClick={() => applyFilter("list")}>Lists</button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="editor-content" />

            {/* Filtered Content Display */}
            <div className="editor-output">
                <h3>Filtered Output:</h3>
                <p>
                    {filter === "bold" && "Showing only bold text..."}
                    {filter === "italic" && "Showing only italic text..."}
                    {filter === "link" && "Showing only links..."}
                    {filter === "list" && "Showing only lists..."}
                    {!filter && "Showing all text..."}
                </p>
            </div>
        </div>
    );
};

export default MyTextEditor;
