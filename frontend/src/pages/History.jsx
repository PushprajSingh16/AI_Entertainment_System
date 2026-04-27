import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, MessageSquare, Calendar } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { chatHistory } from "../utils/chatHistory";

const History = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConversations = () => {
      const convos = chatHistory.getAllConversations();
      const sorted = Object.values(convos).sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setConversations(sorted);
      setLoading(false);
    };

    loadConversations();
  }, []);

  const handleDeleteConversation = (id) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      chatHistory.deleteConversation(id);
      setConversations((prev) => prev.filter((conv) => conv.id !== id));
    }
  };

  const handleOpenConversation = (conv) => {
    // Store the conversation and navigate to chat
    localStorage.setItem("current_chat", JSON.stringify(conv));
    navigate("/chat");
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all chat history? This cannot be undone."
      )
    ) {
      chatHistory.clearAll();
      setConversations([]);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-24 pb-12">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-white">Chat History</h1>
          </div>
          {conversations.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* CONVERSATIONS LIST */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-white/20 border-t-blue-500 rounded-full" />
            </div>
          </div>
        ) : conversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 rounded-xl border border-white/10 text-center"
          >
            <MessageSquare className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              No conversations yet
            </h2>
            <p className="text-white/60 mb-6">
              Start a new chat to begin your conversation history
            </p>
            <button
              onClick={() => navigate("/chat")}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition"
            >
              Start New Chat
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <AnimatePresence>
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, x: -100 }}
                  className="glass p-4 rounded-xl border border-white/10 hover:border-white/20 transition group cursor-pointer"
                  onClick={() => handleOpenConversation(conv)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-blue-300 transition">
                        {conv.title}
                      </h3>
                      <p className="text-sm text-white/60 truncate mt-1">
                        {conv.preview}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                        <Calendar className="h-3 w-3" />
                        {formatDate(conv.timestamp)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                        {conv.messages.length} messages
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conv.id);
                        }}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;
