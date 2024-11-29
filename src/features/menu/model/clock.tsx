import { useEffect, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center w-full h-full bg-white rounded-lg p-3 gap-2 @container">
      <div
        className="drag-handle cursor-grab 
    h-full items-center flex "
        children={<RxDragHandleDots2 />}
      />
      <div className="flex items-center justify-center h-full w-full">
        <h1 className="@[200px]:text-4xl @[400px]:text-6xl font-mono">
          {formatTime(time)}
        </h1>
      </div>
    </div>
  );
};
