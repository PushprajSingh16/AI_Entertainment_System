import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Loader } from "./ui/Loader";
import { cn } from "../utils/cn";
import { chatService } from "../services/api";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      content: "Hello! Welcome to AI Entertainment System 🚀",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    console.log("[CHATBOX] Sending message:", input);

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      console.log("[CHATBOX] Calling chatService.sendMessage()");
      const response = await chatService.sendMessage(input);
      console.log("[CHATBOX] Got response:", response);

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content:
          response ||
          "⚠️ AI couldn't generate response. Try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("[CHATBOX] Error:", err);

      const errorMsg =
        err.message ||
        "❌ Backend not connected (check port 8001)";

      setError(errorMsg);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "system",
          content: errorMsg,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto space-y-6 overflow-hidden">

      {/* ERROR */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-xs px-6 py-3 rounded-2xl",
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : msg.role === "system"
                    ? "bg-red-500/10 text-red-400 border border-red-500/30"
                    : "bg-white/10 text-white border border-white/20"
                )}
              >
                <p>{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <Loader message="AI is thinking..." />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="glass p-4 rounded-xl border border-white/10">
        <div className="flex gap-3">
          <Input
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <Button onClick={sendMessage} disabled={isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ChatBox };