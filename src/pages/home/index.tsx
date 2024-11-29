import { Menu } from "@/features";
import { Logout } from "@/shared";

export const Home = () => {
  return (
    <div className="h-full flex flex-col p-5 bg-slate-100">
      <Menu />
      <Logout />
    </div>
  );
};
