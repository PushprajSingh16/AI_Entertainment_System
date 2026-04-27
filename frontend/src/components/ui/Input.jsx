import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

const Input = forwardRef(({ className, type = 'text', placeholder, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      <div className={cn(
        'glass pl-12 pr-4 py-3 rounded-xl w-full border-2 border-glassBorder focus-within:border-blue-500/50 focus-within:bg-glass transition-all duration-300 shadow-lg',
        className
      )}>
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full text-white placeholder-gray-400 font-medium"
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export { Input };

