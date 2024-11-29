import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface UserProps {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

export const User = atom<UserProps>({
  key: "user",
  default: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  },

  effects_UNSTABLE: [persistAtom],
});
