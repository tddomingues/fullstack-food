import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="absolute bg-transparent w-full h-full top-0 left-0">
      <span className="grid place-items-center h-full">
        <AiOutlineLoading size={50} className="text-neutral-50 animate-spin" />
      </span>
    </div>
  );
};

export default Loading;
