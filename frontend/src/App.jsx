import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Help from "./pages/Help";

import { authService } from "./services/api";


// 🔒 Protected Route
function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// 🚫 Auth Route (login/signup guard)
function AuthRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Pages where navbar/sidebar NOT needed
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className={darkMode ? "dark" : ""}>
      <motion.div className="min-h-screen">

        {/* Navbar + Sidebar only for logged-in pages */}
        {!isAuthPage && (
          <>
            <Navbar onThemeToggle={toggleTheme} />
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          </>
        )}

        <main className={!isAuthPage ? "pt-24" : ""}>
          <Routes>

            {/* DEFAULT ROUTE */}
            <Route
              path="/"
              element={
                authService.isAuthenticated()
                  ? <Navigate to="/dashboard" />
                  : <Navigate to="/login" />
              }
            />

            {/* PUBLIC */}
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
              }
            />

            {/* PROTECTED */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />

            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;