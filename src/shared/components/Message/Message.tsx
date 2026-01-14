import { useRef, useEffect } from "react";

type StyleMsg = "normal" | "dangerous" | "success";

export type MessageData = {
  title: string;
  content: string;
  time: number;
  type?: StyleMsg;
};

const Message = ({
  title,
  content,
  time = 12,
  type = "normal",
}: MessageData) => {
  const box = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  const hideMessage = () => {
    if (box.current) box.current.style.display = "none";
    clearActions();
  };

  let intervalId: ReturnType<typeof setInterval>;
  let timeoutId: ReturnType<typeof setTimeout>;

  const clearActions = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    const seconds = time * 1000;
    let percentageProgressBar = 100;

    intervalId = setInterval(() => {
      if (progressBar.current) {
        percentageProgressBar--;
        progressBar.current.style.width = `${percentageProgressBar}%`;
      }
    }, seconds / 100);

    timeoutId = setTimeout(hideMessage, seconds);

    return () => {
      clearActions();
    };
  }, [time]);

  // Función para obtener el color del título según el tipo
  const getTitleColor = (type: StyleMsg): string => {
    switch (type) {
      case "dangerous":
        return "text-red-500";
      case "success":
        return "text-green-500";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div 
      ref={box} 
      className="fixed bottom-0 right-0 w-full sm:w-96 p-4 border border-gray-700 bg-gray-800 text-gray-300 z-50 shadow-2xl overflow-hidden"
    >
      <button 
        className="absolute top-2 right-2 bg-transparent text-gray-400 hover:text-white text-lg leading-none p-1 hover:bg-gray-700 rounded transition-colors"
        onClick={hideMessage}
      >
        ×
      </button>
      
      <h4 className={`m-0 mb-2 font-semibold ${getTitleColor(type)}`}>
        {title}
      </h4>
      
      <p className="m-0 text-sm text-gray-400">
        {content}
      </p>
      
      {/* Progress bar background */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
      
      {/* Progress bar */}
      <div 
        ref={progressBar}
        className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transition-all duration-200 ease-linear"
      ></div>
    </div>
  );
};

export default Message;
