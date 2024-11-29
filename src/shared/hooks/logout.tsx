import { GiCancel } from "react-icons/gi";
import { auth, SaveLayout, User } from "@/shared";
import { signOut } from "firebase/auth";
import { useResetRecoilState } from "recoil";

export const Logout = () => {
  const resetUser = useResetRecoilState(User);
  const resetLayout = useResetRecoilState(SaveLayout);

  const onLogOutClick = async () => {
    await signOut(auth).then(resetUser).then(resetLayout);
  };
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle  " />
      <div className="modal absolute" role="dialog">
        <div className="modal-box p-3 bg-slate-200 flex flex-col  gap-3 ">
          <div className="text-center font-bold ">계정</div>
          <button
            onClick={() => onLogOutClick()}
            className="bg-white text-lg flex w-full items-center gap-5 p-3 rounded-xl text-red-500  "
          >
            <GiCancel />
            로그아웃
          </button>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};
