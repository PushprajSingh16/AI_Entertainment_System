import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, Palette, Bell, Save } from "lucide-react";
import { Navbar } from "../components/Navbar";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    soundEnabled: true,
    fontSize: "medium",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFontSizeChange = (size) => {
    setSettings((prev) => ({
      ...prev,
      fontSize: size,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-24 pb-12">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>

        {/* SETTINGS CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Notifications */}
          <motion.div
            variants={itemVariants}
            className="glass p-6 rounded-xl border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <p className="text-sm text-white/60">
                    Receive notifications for new messages
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("notifications")}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors",
                  settings.notifications ? "bg-blue-500" : "bg-white/20"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform",
                    settings.notifications && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </motion.div>

          {/* Dark Mode */}
          <motion.div
            variants={itemVariants}
            className="glass p-6 rounded-xl border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Palette className="h-6 w-6 text-purple-400" />
                <div>
                  <h3 className="font-semibold text-white">Dark Mode</h3>
                  <p className="text-sm text-white/60">
                    Use dark theme for the application
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("darkMode")}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors",
                  settings.darkMode ? "bg-purple-500" : "bg-white/20"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform",
                    settings.darkMode && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </motion.div>

          {/* Sound */}
          <motion.div
            variants={itemVariants}
            className="glass p-6 rounded-xl border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Volume2 className="h-6 w-6 text-indigo-400" />
                <div>
                  <h3 className="font-semibold text-white">Sound Effects</h3>
                  <p className="text-sm text-white/60">
                    Play sound when receiving messages
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle("soundEnabled")}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors",
                  settings.soundEnabled ? "bg-indigo-500" : "bg-white/20"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform",
                    settings.soundEnabled && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </motion.div>

          {/* Font Size */}
          <motion.div
            variants={itemVariants}
            className="glass p-6 rounded-xl border border-white/10"
          >
            <h3 className="font-semibold text-white mb-4">Text Size</h3>
            <div className="flex gap-3">
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={cn(
                    "px-6 py-2 rounded-lg font-medium transition-all",
                    settings.fontSize === size
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-white/10 text-white/60 hover:text-white"
                  )}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            variants={itemVariants}
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Save className="h-5 w-5" />
            Save Settings
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// Helper function for classNames
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default Settings;
