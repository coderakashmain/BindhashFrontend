import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useState } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "./MyTextEditor.css";

const GOOGLE_FONTS_API = `https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONT_API}`;

const users = [
    { id: "1", name: "Akash" },
    { id: "2", name: "Rahul" },
    { id: "3", name: "Priya" },
];

const MentionSuggestion = ({ items, command }) => (
    <div className="mention-dropdown">
        {items.length ? items.map(user => (
            <div key={user.id} className="mention-item" onClick={() => command(user)}>
                @{user.name}
            </div>
        )) : <div className="mention-item">No users found</div>}
    </div>
);

const MentionExtension = Mention.configure({
    HTMLAttributes: { class: "mention" },
    suggestion: {
        items: ({ query }) => users.filter(user => user.name.toLowerCase().includes(query.toLowerCase())),
        render: () => {
            let component;
            let popup;
            return {
                onStart: props => {
                    component = new ReactRenderer(MentionSuggestion, { props, editor: props.editor });
                    popup = tippy("body", {
                        getReferenceClientRect: props.clientRect,
                        appendTo: document.body,
                        content: component.element,
                        interactive: true,
                        trigger: "manual",
                        placement: "bottom-start",
                    })[0];
                    popup.show();
                },
                onUpdate(props) {
                    component.updateProps(props);
                    popup.setProps({ getReferenceClientRect: props.clientRect });
                },
                onExit() {
                    popup.destroy();
                    component.destroy();
                },
            };
        },
    },
});

const MyTextEditor = ({ textContent, setTextContent }) => {
    const [googleFonts, setGoogleFonts] = useState([]);
    const [selectedFont, setSelectedFont] = useState("Arial");
    const [showLinkButton, setShowLinkButton] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        fetch(GOOGLE_FONTS_API)
            .then(res => res.json())  // Ensure the response is JSON
            .then(data => {
                if (data.items) {
                    setGoogleFonts(data.items.map(font => font.family));
                } else {
                    console.error("Google Fonts API returned an unexpected structure:", data);
                }
            })
            .catch(err => console.error("Failed to load Google Fonts:", err));
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write a caption', // Your custom placeholder
            }),
            Link.configure({
                openOnClick: true,  // Ensures links are clickable
                autolink: true,     // Auto-detects links when typed
                HTMLAttributes: {
                    rel: "noopener noreferrer",
                    target: "_blank",  // Opens links in a new tab
                    class: "editor-link"
                }
            }),
            TextStyle, // ✅ Add this before FontFamily
            FontFamily.configure(),

            MentionExtension,
        ],
        content: textContent,
        onUpdate: ({ editor }) => setTextContent(editor.getHTML()),
        editorProps: {
            handleDOMEvents: {
                mouseup: () => {
                    const selection = window.getSelection();
                    if (selection && selection.toString().length > 0) {
                        const range = selection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        setToolbarPosition({ top: rect.top - 40, left: rect.left });
                        setShowLinkButton(true);
                    } else {
                        setShowLinkButton(false);
                        setShowLinkInput(false);
                    }
                },
                keydown: (view, event) => {
                    if (event.key === " ") {
                        const { from, to } = editor.state.selection;
                        if (from === to) {
                            editor.chain().focus().unsetLink().insertContent(" ").run();
                            return true; // Prevents default space behavior
                        }
                    }
                }
            }
        }
    });

    const applyLink = () => {
        if (linkUrl && editor) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setShowLinkButton(false);
            setShowLinkInput(false);
            setLinkUrl("");
        }
    };

    const changeFont = (font) => {
        setSelectedFont(font);
        editor.chain().focus().setFontFamily(font).run();

        // Load font dynamically
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    };

    useEffect(() => {
        if (editor && textContent !== editor.getHTML()) {
            editor.commands.setContent(textContent);
        }
    }, [textContent, editor]);

    if (!editor) return null;

    return (
        <div className="editor-container">

            {showLinkButton && !showLinkInput && (
                <button
                    className="link-button"
                    style={{ top: toolbarPosition.top, left: toolbarPosition.left }}
                    onClick={() => setShowLinkInput(true)}
                >
                    🔗 Link
                </button>
            )}


            {showLinkInput && (
                <div
                    className="link-toolbar"
                    style={{ top: toolbarPosition.top, left: toolbarPosition.left }}
                >
                    <input
                        type="text"
                        placeholder="Enter URL..."
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                    />
                    <button onClick={applyLink}>Apply</button>
                </div>
            )}

            <div className="editor-toolbar">
                <button className="editor-btn" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                <button className="editor-btn" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>

                <select
                    className="font-selector"
                    value={selectedFont}
                    onChange={(e) => changeFont(e.target.value)}
                >
                    {googleFonts.map(font => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                        </option>
                    ))}
                </select>
                <button className="editor-btn" onClick={() => editor.commands.clearContent()}>🗑 Clear</button>
            </div>
            <EditorContent editor={editor} placeholder="Write a caption" className="editor-content" />
        </div>
    );
};

export default MyTextEditor;
