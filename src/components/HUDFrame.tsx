import React from 'react';
import { motion } from 'motion/react';

interface HUDFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const HUDFrame: React.FC<HUDFrameProps> = ({ children, title, className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(0, 243, 255, 0.1)' }}
      className={`relative border border-cyber-border bg-cyber-card/50 backdrop-blur-md p-4 sm:p-6 ${title ? 'pt-10 sm:pt-12' : ''} overflow-hidden transition-all duration-300 hover:border-neon-cyan/50 hover:bg-cyber-card/70 group/frame ${className}`}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan group-hover/frame:w-6 group-hover/frame:h-6 transition-all duration-300" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan group-hover/frame:w-6 group-hover/frame:h-6 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan group-hover/frame:w-6 group-hover/frame:h-6 transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan group-hover/frame:w-6 group-hover/frame:h-6 transition-all duration-300" />
      
      {title && (
        <div className="absolute top-0 left-0 bg-neon-cyan px-3 py-1 z-10 group-hover/frame:bg-white transition-colors duration-300">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black">
            {title}
          </span>
        </div>
      )}
      
      {children}
    </motion.div>
  );
};
