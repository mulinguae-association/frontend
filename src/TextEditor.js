import React from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useTranslation } from "react-i18next";

const TextEditor = ({ content, setFormState }) => {
  const { i18n } = useTranslation()

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ]
  };

  const formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", 'background', 'font', 'script', 'code-block', "bullet", "indent",
    "link", "image", "align", "size"
  ];

  const handleProcedureContentChange = (content) => {
    setFormState((prev) => ({ ...prev, content: content }))
  };

  return (
    <div className="text-area">
      <ReactQuill
        key={i18n.language}
        modules={modules}
        formats={formats}
        placeholder="write your content ...."
        onChange={handleProcedureContentChange}
        value={content}
      />
    </div>
  );

}

export default TextEditor;