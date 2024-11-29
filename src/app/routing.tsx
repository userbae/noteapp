import { PrivateRoute, PublicRoute } from "@/features";
import { Home, Login, Note } from "@/pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const Routing = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoute />}>
        {/* 로그인이 필요한 페이지 정의 */}
        <Route path="/" element={<Home />} />
        <Route path="/notes/:note" element={<Note />} />
      </Route>
      <Route element={<PublicRoute />}>
        {/* 로그인 없이 접근하는 페이지 정의 */}
        <Route path="/login" element={<Login />} />
      </Route>
    </>
  )
);
