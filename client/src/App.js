import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { useWebSocket } from "./hooks/useWebSocket";
function App() {
    const { messages, sendMessage, connected, loading } = useWebSocket("wss://realtime-ai-chatbot-tzw3.onrender.com");
    return (_jsx("div", { className: "h-screen flex items-center justify-center bg-gray-100", children: _jsxs("div", { className: "w-full max-w-md h-[90vh] bg-white rounded-xl shadow-lg flex flex-col", children: [_jsxs("div", { className: "p-4 border-b flex justify-between items-center", children: [_jsx("h1", { className: "text-xl font-bold", children: "AI Chatbot" }), _jsx("span", { className: `text-sm px-2 py-1 rounded ${connected ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`, children: connected ? "Connected" : "Disconnected" })] }), _jsx(ChatWindow, { messages: messages }), loading && (_jsx("div", { className: "px-4 py-1 text-sm text-gray-500", children: "AI is typing..." })), _jsx(ChatInput, { sendMessage: sendMessage, disabled: !connected || loading })] }) }));
}
export default App;
