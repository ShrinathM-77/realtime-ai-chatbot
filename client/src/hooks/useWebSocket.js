import { useState, useEffect, useRef, useCallback } from "react";
export const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const wsRef = useRef(null);
    // Connect to WebSocket
    useEffect(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;
        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);
        ws.onerror = () => setConnected(false);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "start") {
                setLoading(true);
            }
            else if (data.type === "chunk") {
                setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg && lastMsg.sender === "ai") {
                        // Append to existing AI message
                        return [
                            ...prev.slice(0, prev.length - 1),
                            { ...lastMsg, content: lastMsg.content + data.content },
                        ];
                    }
                    // Add new AI message
                    return [...prev, { id: Date.now().toString(), sender: "ai", content: data.content }];
                });
            }
            else if (data.type === "end") {
                setLoading(false);
            }
            else if (data.type === "error") {
                setLoading(false);
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now().toString(), sender: "ai", content: "⚠️ Error: " + data.message },
                ]);
            }
        };
        return () => ws.close();
    }, [url]);
    const sendMessage = useCallback((content) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
            return;
        // Add user message
        setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", content }]);
        wsRef.current.send(JSON.stringify({ content }));
    }, []);
    return { messages, sendMessage, connected, loading };
};
