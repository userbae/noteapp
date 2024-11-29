import { RouterProvider } from "react-router-dom";
import { Routing } from "./routing";

export default function App() {
  return (
    <div className="max-w-[600px] mx-auto box-border  h-screen ">
      <RouterProvider router={Routing} />
    </div>
  );
}
