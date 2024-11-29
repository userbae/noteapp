import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { UserBar } from "./userBar";
import { NoteList } from "./noteList";
import { Clock } from "./clock";
import { doc, updateDoc } from "firebase/firestore";
import { db, SaveLayout, User } from "@/shared";
import { useRecoilState, useRecoilValue } from "recoil";

import { Weather } from "./weather";

const ResponsiveGridLayout = WidthProvider(Responsive);

type Layouts = {
  md: Layout[];
};

export const LayoutSetting = () => {
  const user = useRecoilValue(User);
  //const save = useRecoilValue(SaveLayout);
  const [layouts, setLayouts] = useRecoilState<Layouts>(SaveLayout);

  const handleLayoutChange = (layout: Layout[]) => {
    if (!layout || layout.length === 0) return;

    setLayouts({ md: layout });
    const mdString = JSON.stringify(layout);
    console.log(layout);
    updateLayouts(mdString);
  };

  const updateLayouts = async (md: any) => {
    if (!user?.uid) {
      console.error("User UID is not available");
      return;
    }

    const docRef = doc(db, "layouts", user.uid as string);
    try {
      await updateDoc(docRef, {
        md,
      });
      console.log("Layout updated successfully");
    } catch (error) {
      console.error("Error updating layout:", error);
    }
  };

  return (
    <>
      {user.uid && (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ md: 600 }}
          cols={{ md: 3 }}
          rowHeight={30}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".drag-handle" // 드래그 핸들 지정
          isResizable // 크기 조정 활성화
        >
          {layouts.md.map((item) => (
            <div key={item.i}>
              {item.i === "UserBar" && <UserBar />}
              {item.i === "NoteList" && <NoteList />}
              {item.i === "Clock" && <Clock />}
              {item.i === "Weather" && <Weather />}
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </>
  );
};
