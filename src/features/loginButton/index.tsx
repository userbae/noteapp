import { FcGoogle } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { auth, SaveLayout, User, UserProps } from "@/shared";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { getLayout } from "./model";

export const LoginButton = () => {
  const [, setUser] = useRecoilState<UserProps>(User);
  const [, setLayout] = useRecoilState(SaveLayout);

  const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    return await signInWithPopup(auth, provider)
      .then((result) => {
        let { displayName, email, photoURL, uid } = result.user;
        setUser({
          displayName,
          email,
          photoURL,
          uid,
        });
        getLayout({ uid, setLayout });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={() => {
        GoogleLogin();
      }}
      className="flex items-center gap-2 bg-slate-100 text-white px-4 py-2 rounded-full hover:bg-gray-300 transition-colors text-2xl"
    >
      <FcGoogle />
    </button>
  );
};
