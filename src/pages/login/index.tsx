import { LoginButton } from "@/features";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-4">
      <h1 className="text-2xl font-bold">MDNote</h1>
      <LoginButton />
    </div>
  );
};
