import { db, SaveLayoutProps } from "@/shared";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";

export const getLayout = async ({
  uid,
  setLayout,
}: {
  uid: string;
  setLayout: SetterOrUpdater<SaveLayoutProps>;
}) => {
  const docRef = doc(db, "layouts", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    // 문자열로 저장된 데이터를 JSON 파싱
    const restoredMd = JSON.parse(data.md);

    console.log("Restored layout:", restoredMd);

    setLayout({ md: restoredMd });
  } else {
    // 기본 레이아웃 추가
    const md = [
      { i: "UserBar", x: 0, y: 0, w: 2, h: 2, minH: 2, minW: 1 },
      { i: "NoteList", x: 0, y: 1, w: 2, h: 3, minH: 2, minW: 2 },
      { i: "Clock", x: 0, y: 2, w: 2, h: 3, minH: 2, minW: 2 },
      { i: "Weather", x: 0, y: 2, w: 3, h: 5, minH: 5, minW: 1 },
    ];

    try {
      // JSON.stringify로 문자열로 저장
      await setDoc(docRef, { md: JSON.stringify(md) });

      console.log("Default layout saved successfully");
      setLayout({ md: md });
    } catch (error) {
      console.error("Error saving default layout:", error);
    }
  }

  // 로그인 완료 후 홈으로 이동
  window.location.href = "/";
};
