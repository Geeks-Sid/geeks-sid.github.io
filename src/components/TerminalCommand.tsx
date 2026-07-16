import React, { useEffect, useState, useRef } from 'react';

interface TerminalCommandProps {
  prefix?: string;
  command: string;
}

export const TerminalCommand: React.FC<TerminalCommandProps> = ({ prefix = "$", command }) => {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries && entries.length > 0 && entries[0].isIntersecting) {
          setIsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < command.length) {
        setDisplayText(command.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40 + Math.random() * 20); // Dynamic character-by-character typing speed

    return () => clearInterval(interval);
  }, [isStarted, command]);

  return (
    <span className="terminal-command-container" ref={elementRef}>
      <span className="terminal-prompt">{prefix} </span>
      <span className="terminal-command-text">{displayText}</span>
      <span className="terminal-cursor-blink">▮</span>
    </span>
  );
};
export default TerminalCommand;
