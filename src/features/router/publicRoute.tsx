import { User } from "@/shared";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const PublicRoute = () => {
  const user = useRecoilValue(User);

  return !!user.displayName ? (
    <Navigate to="/" />
  ) : (
    <>
      <Outlet />
    </>
  );
};
