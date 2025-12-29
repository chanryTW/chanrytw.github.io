import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  num: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, num }) => (
  <div className="flex items-center gap-6 mb-16 relative">
    <div className="hidden md:block w-16 h-[2px] bg-cyan-500" />
    <span className="text-xl font-mono text-cyan-500 font-bold">0{num}</span>
    <h2 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tight text-white relative z-10">
      {children}
    </h2>
    {/* Glitch effect behind text (visual only) */}
    <div className="absolute left-32 top-1 text-5xl md:text-7xl font-bold font-display uppercase tracking-tight text-cyan-500/10 blur-[1px] select-none -z-10">
      {children}
    </div>
    
    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent ml-8" />
  </div>
);