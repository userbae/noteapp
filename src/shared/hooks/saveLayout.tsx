import { Layout } from "react-grid-layout";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface SaveLayoutProps {
  md: Layout[];
}

export const SaveLayout = atom<SaveLayoutProps>({
  key: "SaveLayout",
  default: {
    md: [],
  },

  effects_UNSTABLE: [persistAtom],
});
