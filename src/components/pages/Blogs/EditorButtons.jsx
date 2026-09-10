import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BiImageAdd, BiLink } from "react-icons/bi";
import { notifyError } from "../../Notify";
import { validateImageUrl } from "../../../utils/validateImages";
import { validateUrl } from "../../../utils/validateUrl";

const EditorButtons = ({ editor }) => {
  const { t } = useTranslation("pages/blogs");

  const setLink = useCallback(async () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt(t("editor.promptUrl"), previousUrl);
    if (!validateUrl(url)) {
      return notifyError(t("editor.errorInvalidUrl"));
    }
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor, t]);

  const addImage = async () => {
    const url = window.prompt(t("editor.promptUrl"));

    const isValidImage = await validateImageUrl(url); // validate image URL
    if (!isValidImage) {
      notifyError(t("editor.errorInvalidImage"));
      return;
    }
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  return (
    <div className="button-group">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title={t("editor.bold")}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title={t("editor.italic")}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title={t("editor.underline")}
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title={t("editor.strikethrough")}
      >
        S
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
        title={t("editor.inlineCode")}
      >
        `
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
        title={t("editor.paragraph")}
      >
        P
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        title={t("editor.heading", { level: 2 })}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        title={t("editor.heading", { level: 3 })}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        title={t("editor.heading", { level: 4 })}
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        title={t("editor.heading", { level: 5 })}
      >
        H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        title={t("editor.heading", { level: 6 })}
      >
        H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title={t("editor.bulletList")}
      >
        ••
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title={t("editor.orderedList")}
      >
        1.
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        title={t("editor.codeBlock")}
      >
        {`</>`}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        title={t("editor.blockquote")}
      >
        "
      </button>
      <button
        type="button"
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
        title={t("editor.addLink")}
      >
        <BiLink fontSize={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        title={t("editor.removeLink")}
      >
        🔗x
      </button>
      <button type="button" onClick={addImage} title={t("editor.addImageUrl")}>
        <BiImageAdd fontSize={20} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title={t("editor.horizontalLine")}
      >
        ─
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title={t("editor.lineBreak")}
      >
        ↵
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        title={t("editor.undo")}
      >
        ↶
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        title={t("editor.redo")}
      >
        ↷
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title={t("editor.clearFormatting")}
      >
        X
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setColor("#00008B").run()}
        className={
          editor.isActive("textStyle", { color: "#00008B" }) ? "is-active" : ""
        }
        title={t("editor.setTextColor")}
      >
        🔵
      </button>
      <input
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes("textStyle").color || "#013220"}
        data-testid="setColor"
        title={t("editor.pickTextColor")}
      />
    </div>
  );
};

export default EditorButtons;
