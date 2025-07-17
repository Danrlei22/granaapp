import logo from "../assets/logoName.PNG";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <img src={logo} alt="GranaApp" className="w-40 h-auto mb-4 animate-pulse rounded-xl" />
      <div className="text-3xl font-semibold text-gray-700 flex gap-1">
        Loading
        <span className="animate-bounce [animation-delay:0ms]">.</span>
        <span className="animate-bounce [animation-delay:150ms]">.</span>
        <span className="animate-bounce [animation-delay:300ms]">.</span>
      </div>
    </div>
  );
}

export default Loading;
