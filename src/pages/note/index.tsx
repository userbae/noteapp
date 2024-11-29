import { NoteEditor } from "@/features/noteEditor";
import { db } from "@/shared";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Note = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createAt, setCreateAt] = useState("");
  const params = useParams();

  // Firestore에 문서 저장 함수
  const saveToFirestore = async (data: any) => {
    const docRef = doc(db, "notes/" + params.note); // Firestore의 문서 참조
    try {
      await setDoc(docRef, data, { merge: true }); // Firestore에 데이터 저장
      console.log("자동 저장 완료:", data);
    } catch (error) {
      console.error("Firestore 저장 중 오류:", error);
    }
  };

  // 디바운스된 저장 함수 생성 (500ms 후 저장)
  const debouncedSave = useCallback(
    debounce((data) => saveToFirestore(data), 500),
    []
  );

  // Firebase에서 데이터 가져오기
  const getPosts = async () => {
    const data = doc(db, "notes/" + params.note);
    const querySnapshot = await getDoc(data);
    return querySnapshot.data();
  };

  // Editor 초기화
  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // 초기 content는 비워둠
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent); // 상태 업데이트
      debouncedSave({ title, content: newContent }); // title과 content 저장
    },
  });

  // Firestore에서 초기 데이터 가져오기
  useEffect(() => {
    getPosts().then((data) => {
      setTitle(data?.title || "");
      setContent(data?.content || "");
      setCreateAt(data?.createAt || "");
      if (editor) {
        editor.commands.setContent(data?.content || "");
      }
    });
  }, [editor]);

  // Title 변경 시 디바운싱을 활용한 Firestore 저장
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSave({ title: newTitle, content });
  };

  return (
    <div className="p-2 h-full lg:border flex flex-col">
      <input
        placeholder="제목을 입력하세요"
        className="w-full outline-none text-2xl"
        value={title}
        onChange={handleTitleChange} // 제목 변경 감지
      />
      <div children={createAt} />
      <NoteEditor editor={editor} />
    </div>
  );
};
