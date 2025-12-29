import React from 'react';
import { motion } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: 'fit-content' | '100%';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  width = "100%" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};