import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const ChatInput = ({ sendMessage, disabled }) => {
    const [input, setInput] = useState("");
    const handleSend = () => {
        if (!input.trim() || disabled)
            return;
        sendMessage(input.trim());
        setInput("");
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter")
            handleSend();
    };
    return (_jsxs("div", { className: "flex gap-2 p-3 border-t", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, disabled: disabled, placeholder: "Type your message...", className: "flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("button", { onClick: handleSend, disabled: disabled, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50", children: "Send" })] }));
};
export default ChatInput;
