import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const { messages, sendMessage, connected, loading } = useWebSocket(
  "wss://realtime-ai-chatbot-tzw3.onrender.com"
);


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md h-[90vh] bg-white rounded-xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Chatbot</h1>
          <span
            className={`text-sm px-2 py-1 rounded ${
              connected ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {/* Chat */}
        <ChatWindow messages={messages} />

        {/* Loading */}
        {loading && (
          <div className="px-4 py-1 text-sm text-gray-500">
            AI is typing...
          </div>
        )}

        {/* Input */}
        <ChatInput
          sendMessage={sendMessage}
          disabled={!connected || loading}
        />
      </div>
    </div>
  );
}

export default App;
