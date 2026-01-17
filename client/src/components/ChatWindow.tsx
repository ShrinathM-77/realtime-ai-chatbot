import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../hooks/useWebSocket";

interface Props {
  messages: Message[];
}

const ChatWindow: React.FC<Props> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[75%] px-4 py-2 rounded-xl break-words ${
            msg.sender === "user"
              ? "ml-auto bg-blue-500 text-white"
              : "mr-auto bg-gray-200 text-gray-900"
          }`}
        >
          {/* SAFETY CHECK */}
          <ReactMarkdown>
            {msg.content || ""}
          </ReactMarkdown>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
