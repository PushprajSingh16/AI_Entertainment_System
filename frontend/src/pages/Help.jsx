import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles, Zap, Users, PenTool } from "lucide-react";
import { Navbar } from "../components/Navbar";

const Help = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(0);

  const sections = [
    {
      icon: Sparkles,
      title: "Getting Started",
      content: [
        "Welcome to AI Entertainment System!",
        "Click 'Start Chat' from the dashboard to begin a conversation.",
        "Ask the AI to help with creative writing, scripts, entertainment ideas, and more.",
        "Your conversations are automatically saved in your chat history.",
      ],
    },
    {
      icon: PenTool,
      title: "Script Writing",
      content: [
        "Ask the AI to write a script by saying things like: 'Write a short comedy script'",
        "The AI will format scripts with:",
        "• Title - The name of the script",
        "• Characters - List of characters in the script",
        "• Scene - Description of the scene setting",
        "• Dialogues - The actual dialogue between characters",
        "Scripts are displayed in a structured format for easy reading.",
      ],
    },
    {
      icon: Zap,
      title: "Chat Features",
      content: [
        "Type your message and press Enter to send (or use Shift+Enter for new lines).",
        "Messages are displayed with different colors for user and AI responses.",
        "Click 'Copy' to copy any AI response to your clipboard.",
        "Click 'Delete' to remove individual messages from the chat.",
        "Click 'New Chat' to start a fresh conversation.",
      ],
    },
    {
      icon: Users,
      title: "Formatting Support",
      content: [
        "AI responses support multiple text formats:",
        "• Headings - Lines starting with # or ##",
        "• Bullet points - Lines starting with - or *",
        "• Numbered lists - Lines starting with numbers (1., 2., etc.)",
        "• Paragraphs - Regular text with proper spacing",
        "These formats are automatically rendered for better readability.",
      ],
    },
    {
      icon: BookOpen,
      title: "Chat History & Settings",
      content: [
        "Visit 'History' to view all your previous conversations.",
        "Click any conversation to continue where you left off.",
        "Delete individual conversations or clear all history.",
        "Visit 'Settings' to customize your experience:",
        "• Toggle notifications",
        "• Enable/disable dark mode",
        "• Control sound effects",
        "• Adjust text size",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Help & Instructions</h1>
        </div>

        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-xl border border-white/10 mb-8"
        >
          <p className="text-white/90 leading-relaxed">
            Need help using the AI Entertainment System? This guide covers all the main features and
            how to get the most out of your experience. Select any section below to learn more.
          </p>
        </motion.div>

        {/* FAQ SECTIONS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === idx ? -1 : idx)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-4 text-left">
                    <Icon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                    <h3 className="font-semibold text-white text-lg">
                      {section.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === idx ? 180 : 0 }}
                    className="text-white/60"
                  >
                    ▼
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedSection === idx ? "auto" : 0,
                    opacity: expandedSection === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-2 border-t border-white/10">
                    <ul className="space-y-2">
                      {section.content.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-white/80 leading-relaxed flex gap-3"
                        >
                          {point.startsWith("•") ? (
                            <>
                              <span className="text-blue-400 font-bold">•</span>
                              <span>{point.substring(2)}</span>
                            </>
                          ) : (
                            <span>{point}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass p-6 rounded-xl border border-white/10 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Ready to get started?
          </h3>
          <p className="text-white/60 mb-6">
            Start a new chat to explore what the AI can do for your entertainment needs!
          </p>
          <button
            onClick={() => navigate("/chat")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition"
          >
            Start Chatting
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
