import { motion } from 'framer-motion';

const Loader = ({ message = 'Typing...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 p-4 glass rounded-2xl"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-[1px]"
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-[1px]"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-[1px]"
      />
      <span className="text-sm text-gray-400 font-medium">{message}</span>
    </motion.div>
  );
};

export { Loader };

