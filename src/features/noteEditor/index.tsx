import { BubbleMenu, Editor, EditorContent, FloatingMenu } from "@tiptap/react";

export const NoteEditor = ({ editor }: { editor: Editor | null }) => {
  return (
    <div
      className="w-full flex-1"
      onContextMenu={(e) => {
        e.preventDefault(); // 기본 컨텍스트 메뉴 비활성화
      }}
    >
      {editor && (
        <>
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bubble-menu flex bg-slate-50 gap-2  rounded-md shadow-md text-sm">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${
                  editor.isActive("bold") ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${
                  editor.isActive("italic") ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`${
                  editor.isActive("strike") ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                Strike
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`${
                  editor.isActive("code") ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                Toggle code
              </button>
            </div>
          </BubbleMenu>

          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="floating-menu flex bg-slate-50 gap-2  rounded-md shadow-md text-sm">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`${
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                H1
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`${
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                H2
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${
                  editor.isActive("bulletList") ? "is-active" : ""
                } hover:bg-slate-400 p-2 rounded-md`}
              >
                Bullet list
              </button>
            </div>
          </FloatingMenu>
        </>
      )}
      <EditorContent
        editor={editor}
        className="prose m-0 p-0  h-full max-w-full w-full prose-tiptap:h-full
        prose-p:m-0 prose-h1:mt-0 prose-h2:mt-0"
      />
    </div>
  );
};
