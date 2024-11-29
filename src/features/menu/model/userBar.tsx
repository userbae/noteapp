import { User } from "@/shared";
import { RxDragHandleDots2 } from "react-icons/rx";

import { useRecoilValue } from "recoil";

export const UserBar = () => {
  const user = useRecoilValue(User);

  return (
    <nav className="flex justify-between  items-center w-full h-full bg-white rounded-lg p-3 overflow-hidden gap-2">
      {/* user modal -> logout... */}
      <div
        className="drag-handle cursor-grab "
        children={<RxDragHandleDots2 />}
      />
      <div className="flex-1">
        <label
          htmlFor="my_modal_7"
          className="flex gap-3 items-center cursor-pointer "
        >
          <img src={`${user.photoURL}`} className="w-12" />
          <div className="@container w-full h-full">
            <div className="hidden @[50px]:block ">{user.displayName}</div>
            <div className="hidden text-gray-400 @[200px]:block">
              {user.email}
            </div>
          </div>
        </label>
      </div>
    </nav>
  );
};
