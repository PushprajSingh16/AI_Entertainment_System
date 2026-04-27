import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

const Button = forwardRef(
  ({ className, variant = 'default', size = 'default', isLoading = false, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl active:scale-95 backdrop-blur-lg border border-white/20',

          // ✅ default variant
          variant === 'default' &&
            'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',

          // ✅ ghost variant
          variant === 'ghost' &&
            'bg-white/10 text-white hover:bg-white/20',

          // ✅ sizes
          size === 'default' && 'text-lg',
          size === 'sm' && 'px-4 py-2 text-sm',

          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };