import React, { useState, useEffect } from 'react';

interface TerminalProps {
  lines: string[];
  speed?: number;
  onComplete?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ lines, speed = 30, onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentFullLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentFullLine.length) {
        const timer = setTimeout(() => {
          const newVisibleLines = [...visibleLines];
          if (currentCharIndex === 0) {
            newVisibleLines.push(currentFullLine[0]);
          } else {
            newVisibleLines[currentLineIndex] = currentFullLine.substring(0, currentCharIndex + 1);
          }
          setVisibleLines(newVisibleLines);
          setCurrentCharIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 200);
        return () => clearTimeout(timer);
      }
    } else if (onComplete) {
      onComplete();
    }
  }, [currentLineIndex, currentCharIndex, lines, speed, visibleLines, onComplete]);

  return (
    <div className="font-mono text-sm space-y-1">
      {visibleLines.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-neon-cyan mr-2 opacity-70">[{i.toString().padStart(2, '0')}]</span>
          <span className={i === currentLineIndex ? "after:content-['_'] after:animate-pulse" : ""}>
            {line}
          </span>
        </div>
      ))}
    </div>
  );
};
