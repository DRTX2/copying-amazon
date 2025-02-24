import { useRef, useEffect } from "react";
import "./style.css";

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

  return (
    <div ref={box} className="box-message">
      <button className="btn" onClick={hideMessage}>
        X
      </button>
      <h4 className={type}>{title}</h4>
      <p>{content}</p>
      <div className="progress-background"></div>
      <div className="progress" ref={progressBar}></div>
    </div>
  );
};

export default Message;
