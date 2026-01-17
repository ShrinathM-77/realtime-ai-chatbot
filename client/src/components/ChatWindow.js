import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
const ChatWindow = ({ messages }) => {
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50", children: [messages.map((msg) => (_jsx("div", { className: `max-w-[75%] px-4 py-2 rounded-xl break-words ${msg.sender === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-gray-200 text-gray-900"}`, children: _jsx(ReactMarkdown, { children: msg.content || "" }) }, msg.id))), _jsx("div", { ref: endRef })] }));
};
export default ChatWindow;
