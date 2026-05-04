import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const ringX = useSpring(0, { damping: 20, stiffness: 300 });
  const ringY = useSpring(0, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX - 12);
      ringY.set(e.clientY - 12);
    };

    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    
    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [ringX, ringY]);

  return (
    <>
      <div 
        className="cursor-dot hidden md:block" 
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }} 
      />
      <motion.div 
        className="cursor-ring hidden md:block"
        style={{ 
          x: ringX, 
          y: ringY,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'var(--color-accent)' : 'var(--color-primary)'
        }}
      />
    </>
  );
}
