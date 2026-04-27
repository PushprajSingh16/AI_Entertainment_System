import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import {
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  LogOut,
  Settings,
  History,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { authService } from "../services/api";
import { useNavigate } from "react-router-dom";
import { chatHistory } from "../utils/chatHistory";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      const recents = chatHistory.getRecentChats();
      setRecentChats(recents.slice(0, 5));
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const openRecentChat = (chatId) => {
    const conversation = chatHistory.getConversation(chatId);
    if (conversation) {
      localStorage.setItem("current_chat", JSON.stringify(conversation));
      navigate("/chat");
    }
  };

  if (!user) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const stats = [
    { title: "Conversations", value: recentChats.length.toString(), icon: MessageSquare },
    { title: "System Uses", value: "142", icon: TrendingUp },
    { title: "Tasks Completed", value: "89", icon: LayoutDashboard },
  ];

  const actions = [
    {
      label: "Start Chat",
      icon: MessageSquare,
      onClick: () => navigate("/chat"),
      color: "from-blue-500 to-purple-600",
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => navigate("/settings"),
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "History",
      icon: History,
      onClick: () => navigate("/history"),
      color: "from-indigo-500 to-blue-600",
    },
    {
      label: "Help",
      icon: HelpCircle,
      onClick: () => navigate("/help"),
      color: "from-cyan-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900 pt-24 pb-12">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 space-y-12">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl text-white">
            Welcome, {user.name || "User"} 👋
          </h1>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-xl text-white hover:bg-white/10 transition"
            >
              <stat.icon className="mb-2 h-6 w-6" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* RECENT CHATS */}
        {recentChats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-xl text-white"
          >
            <h2 className="mb-4 text-lg font-semibold">Recent Chats</h2>
            <div className="space-y-2">
              {recentChats.map((chat, idx) => (
                <motion.button
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => openRecentChat(chat.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition flex items-center justify-between group"
                >
                  <span className="truncate">{chat.title}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-4"
        >
          {actions.map((action, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={action.onClick}
              className={`bg-gradient-to-r ${action.color} p-4 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/20 transition font-medium flex flex-col items-center gap-2`}
            >
              <action.icon className="h-6 w-6" />
              {action.label}
            </motion.button>
          ))}
        </motion.div>

        {/* LOGOUT */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/10 transition"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </motion.button>

      </div>
    </div>
  );
};

export default Dashboard;