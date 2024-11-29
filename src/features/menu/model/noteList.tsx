import { db, User } from "@/shared";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface ListProps {
  uid: string;
  title: string;
  content: string;
  createAt: string;
}
export const NoteList = () => {
  let [list, setList] = useState<ListProps[]>([]);
  const user = useRecoilValue(User);
  const navigate = useNavigate();
  //데이터 만들기
  const newNote = async () => {
    await addDoc(collection(db, "notes"), {
      uid: user.uid,
      title: "",
      content: "",
      createAt: new Date()?.toLocaleDateString(),
    }).then((res) => {
      console.log(res.path);
      navigate(`/${res.path}`);
    });
  };

  //데이터 가져오기
  const getPosts = async () => {
    const data = query(collection(db, "notes"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(data);
    setList([]);
    querySnapshot.forEach((doc) => {
      const dataObj = { ...doc.data(), uid: doc.id };
      setList((prev) => [...prev, dataObj as ListProps]);
    });
  };

  //문서 삭제
  const deletePosts = async (uid: string) => {
    await deleteDoc(doc(db, "notes", uid)).then(() => console.log("삭제성공"));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <nav className="flex justify-between  items-center w-full h-full bg-white rounded-lg p-3 gap-2 ">
      <div
        className="drag-handle cursor-grab 
        h-full pt-2"
        children={<RxDragHandleDots2 />}
      />
      <div className="flex-1 scrollbar-hide overflow-scroll h-full @container ">
        <div className="flex-1 scroll-x-none">
          <div className="flex items-center w-full text-xl text-gray-400 p-2 border-b-2 justify-between">
            <div className="flex-1" children="Note" />
            <div
              className="cursor-pointer"
              children="+"
              onClick={() => newNote()}
            />
          </div>
          {/*note list*/}

          {list?.length > 0 ? (
            list.map((list) => {
              return (
                <div
                  key={list.uid}
                  className="hover:bg-slate-200  hidden @[150px]:flex  justify-between items-center p-2 cursor-pointer"
                  onClick={() => navigate(`/notes/${list.uid}`)}
                >
                  <div className="">
                    <div>{list.title ? list.title : "제목없음"}</div>
                    <div className="text-sm text-gray-400">{list.createAt}</div>
                  </div>

                  <div
                    className="text-xl hover:text-red-400 cursor-pointer"
                    children={<AiOutlineDelete />}
                    onClick={(event) => {
                      event.stopPropagation();
                      deletePosts(list.uid);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div>note가 없습니다.</div>
          )}
        </div>
      </div>
    </nav>
  );
};
