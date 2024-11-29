import { User } from "@/shared";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const PrivateRoute = () => {
  const user = useRecoilValue(User);

  return !!user.displayName ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
