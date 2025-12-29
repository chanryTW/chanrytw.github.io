import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  noPadding?: boolean;
  title?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = false, noPadding = false, title }) => (
  <div className={`relative bg-[#0a0a12]/80 backdrop-blur-md border border-white/10 ${noPadding ? '' : 'p-8'} clip-corner ${hover ? 'hover:border-cyan-500/50 hover:bg-[#0a0a12]/95 transition-all duration-300' : ''} ${className} pointer-events-auto`}>
    {/* Mecha Decors */}
    <div className="absolute top-0 left-0 w-6 h-[2px] bg-cyan-500" />
    <div className="absolute top-0 left-0 h-6 w-[2px] bg-cyan-500" />
    <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-cyan-500" />
    <div className="absolute bottom-0 right-0 h-6 w-[2px] bg-cyan-500" />
    
    {/* Optional Title Tab */}
    {title && (
      <div className="absolute -top-[1px] right-8 px-4 py-1 bg-white/5 border-b border-x border-white/10 text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
        {title}
      </div>
    )}
    
    {children}
  </div>
);