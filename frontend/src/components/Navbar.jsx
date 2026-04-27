import { motion } from 'framer-motion';
import { User, Sun } from 'lucide-react';

const Navbar = ({ onThemeToggle }) => {

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-4xl px-8 py-4 rounded-2xl shadow-2xl mx-auto md:w-[calc(100vw-8rem)]"
    >
      <div className="flex items-center justify-between">
        <motion.div 
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          AI Entertainment
        </motion.div>
        
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }}>
            <User className="h-6 w-6 text-gray-300 cursor-pointer hover:text-white transition-colors" />
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onThemeToggle}
            className="p-2 rounded-lg glass hover:bg-glassBorder transition-all"
          >
            <Sun className="h-5 w-5 text-gray-400 rotate-0 group-hover:rotate-180 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export { Navbar };

