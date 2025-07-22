import { useState } from "react";

function Tooltip({ children, text, position = "top" }) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full  mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mb-2 left-1/2 -translate-y-1/2",
    right: "left-full  mt-2 left-1/2 -translate-y-1/2",
  };

  const showTooltip = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  const getArrowClasses = (position) => {
    switch (position) {
      case "top":
        return "absolute w-2.5 h-2.5 bg-gray-700 rotate-45 -bottom-1 left-1/2 -translate-x-1/2 z-[-1]";
      case "bottom":
        return "absolute w-2.5 h-2.5 bg-gray-700 rotate-45 -top-1 left-1/2 -translate-x-1/2 z-[-1]";
      case "left":
        return "absolute w-2.5 h-2.5 bg-gray-700 rotate-45 top-1/2 -right-1 -translate-y-1/2 z-[-1]";
      case "right":
        return "absolute w-2.5 h-2.5 bg-gray-700 rotate-45 top-1/2 -left-1 -translate-y-1/2 z-[-1]";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        onClick={showTooltip}
        className="relative inline-block group"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
        {visible && (
          <div
            className={`absolute ${positionClasses[position]} z-10 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            {text}
            <span className={getArrowClasses(position)}/>
          </div>
        )}
      </div>
    </>
  );
}

export default Tooltip;
