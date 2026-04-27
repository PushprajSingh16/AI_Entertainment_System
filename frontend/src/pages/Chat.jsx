import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, ArrowLeft, Copy, Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Loader } from "../components/ui/Loader";
import { Navbar } from "../components/Navbar";
import { FormattedMessage } from "../components/FormattedMessage";
import { ScriptDisplay } from "../components/ScriptDisplay";
import { cn } from "../utils/cn";
import { chatService } from "../services/api";
import { formatMessage } from "../utils/messageFormatter";
import { chatHistory } from "../utils/chatHistory";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      content: "Hello! 👋 Welcome to AI Entertainment System. I can help you with creative writing, scripts, entertainment ideas, and more. What would you like to create today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatId] = useState(`chat_${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save chat on unmount or when messages change
  useEffect(() => {
    if (messages.length > 1) {
      const firstUserMsg = messages.find((m) => m.role === "user");
      const title = firstUserMsg
        ? firstUserMsg.content.substring(0, 50) + "..."
        : "New Chat";
      chatHistory.saveConversation(chatId, messages, title);
    }
  }, [messages, chatId]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

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
      const response = await chatService.sendMessage(input);

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: response || "⚠️ AI couldn't generate response. Try again.",
        timestamp: new Date(),
        formatted: formatMessage(response),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMsg = err.message || "❌ Backend not connected (check port 8001)";
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

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const renderMessage = (msg) => {
    if (msg.formatted?.type === "script") {
      return <ScriptDisplay content={msg.formatted.content} />;
    } else if (msg.formatted?.type === "text") {
      return <FormattedMessage elements={msg.formatted.content} />;
    }
    return <p className="text-white/90">{msg.content}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-24 pb-12">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 h-[calc(100vh-10rem)] flex flex-col gap-4">
        {/* HEADER WITH BACK BUTTON */}
        <div className="flex items-center gap-4 pb-4 border-b border-white/10">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-white flex-1">Chat</h1>
          <button
            onClick={() => {
              setMessages([
                {
                  id: 1,
                  role: "ai",
                  content:
                    "Hello! 👋 Welcome to AI Entertainment System. I can help you with creative writing, scripts, entertainment ideas, and more. What would you like to create today?",
                  timestamp: new Date(),
                },
              ]);
            }}
            className="px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
            title="Clear chat"
          >
            New Chat
          </button>
        </div>

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
        <div className="flex-1 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "rounded-2xl px-6 py-4 max-w-2xl",
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : msg.role === "system"
                      ? "bg-red-500/10 text-red-400 border border-red-500/30"
                      : "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                  )}
                >
                  <div className="prose prose-invert max-w-none">
                    {renderMessage(msg)}
                  </div>

                  {/* Actions for AI messages */}
                  {msg.role === "ai" && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-white/10 transition opacity-70 hover:opacity-100"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-white/10 transition opacity-70 hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-4 py-3 rounded-xl">
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
              placeholder="Ask me anything... (Shift+Enter for new line)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={isLoading} className="gap-2">
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          scrollbar-width: thin;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Chat;
