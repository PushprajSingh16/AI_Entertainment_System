import { motion, AnimatePresence } from 'framer-motion';
import { Home, LayoutDashboard, History, LogOut, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn.js';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/', active: true },
    { icon: MessageCircle, label: 'Chat', path: '/', active: false },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'History', path: '/history' },
  ];

  const navClass = (item) =>
    cn(
      'p-4 rounded-xl flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer font-medium',
      item.active &&
        'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg'
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed left-0 top-0 h-screen w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 z-40 flex flex-col pt-24 px-6 py-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation */}
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link key={item.path} to={item.path} onClick={onClose}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={navClass(item)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-auto pt-8 border-t border-white/20"
          >
            <Button variant="ghost" className="w-full justify-start h-14">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Sidebar };