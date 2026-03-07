import React from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        initial={{ opacity: 1 }}
        className="relative z-10"
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: Math.random() * 5
        }}
        className="absolute top-0 left-0 text-neon-cyan z-0 select-none pointer-events-none"
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [2, -2, 1, 0],
          y: [-1, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: Math.random() * 5
        }}
        className="absolute top-0 left-0 text-neon-magenta z-0 select-none pointer-events-none"
      >
        {text}
      </motion.span>
    </div>
  );
};
