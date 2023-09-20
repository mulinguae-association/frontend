import React, { useEffect } from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

console.warn = function () { };
const TextEditor = ({ content, setContent }) => {
  var modules = {
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

      ['clean'],

    ]
  };


  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", 'background', 'font', 'script', 'code-block', "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    setContent(content);
  };

  return (
    <div className="text-area">
      <ReactQuill
        // theme="snow"
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