function Tooltip({ children, text, position = "top" }) {
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full  mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mb-2 left-1/2 -translate-y-1/2",
    right: "left-full  mt-2 left-1/2 -translate-y-1/2",
  };

  return (
    <>
      <div className="relative inline-block group">
        {children}
        <div
          className={`absolute ${positionClasses[position]} z-10 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          {text}
        </div>
      </div>
    </>
  );
}

export default Tooltip;
