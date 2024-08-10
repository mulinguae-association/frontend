import React, { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import EditorButtons from "./components/pages/Blogs/EditorButtons";

const TextEditor = ({ value, setFormState, editorRef }) => {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit,
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https'
      }),
      Image
    ]
  });

  const handleContentChange = useCallback(() => {
    if (editor) {
      const content = editor.getHTML();
      setFormState(prev => ({ ...prev, content }));
    }
  }, [editor, setFormState]);

  useEffect(() => {
    if (editor) {
      editor.on('update', handleContentChange);
      if (editorRef && !editor.isDestroyed) {
        editorRef.current = editor
      }
      return () => {
        editor.off('update', handleContentChange);
      };
    }
  }, [editor, handleContentChange]);

  if (!editor) {
    return null;
  }

  return (
    <div className="text-area">
      <EditorButtons editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
