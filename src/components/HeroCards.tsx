import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Box, Layers, Zap, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CardContent {
  id: number;
  key: string; // translation key suffix
  type: 'arch' | 'perf' | 'style' | 'webgl' | 'mobile' | 'ai';
  color: string;
  icon: React.ReactNode;
}

const ConfettiPiece = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100 - 50; // -50 to 50
  const randomY = Math.random() * -100 - 50; // Upward movement
  const randomRotate = Math.random() * 360;
  const color = ['#ef4444', '#22c55e', '#eab308', '#3b82f6', '#a855f7'][Math.floor(Math.random() * 5)];

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-sm z-50"
      style={{ backgroundColor: color, left: '50%', top: '50%' }}
      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
      animate={{
        scale: [1, 1],
        x: randomX,
        y: randomY,
        rotate: randomRotate,
        opacity: [1, 0],
      }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    />
  );
};

const HeroCards: React.FC = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [isIntro, setIsIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Performance score state
  const [perfScore, setPerfScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Start with spread, then collapse after delay to show interactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Loop performance score 0 -> 100 -> confetti -> pause -> 0
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    const runCounter = () => {
       setPerfScore(0);
       setShowConfetti(false);
       let current = 0;
       interval = setInterval(() => {
          current += 1;
          if (current <= 100) {
             setPerfScore(current);
          } else {
             clearInterval(interval);
             setShowConfetti(true); // Trigger confetti
             setTimeout(runCounter, 3000); // Pause 3s (longer for confetti) then restart
          }
       }, 30); // Speed of counting
    };

    runCounter();
    return () => clearInterval(interval);
  }, []);

  const getPerfColor = (score: number) => {
     if (score < 50) return '#ef4444'; // Red
     if (score < 80) return '#eab308'; // Yellow
     return '#22c55e'; // Green
  };

  const isExpanded = isHovered || isIntro;

  // Define base cards
  const cards: CardContent[] = [
    { 
      id: 1, key: 'arch', type: 'arch', color: 'text-cyan-400', 
      icon: <Code size={18} />
    },
    { 
      id: 2, key: 'perf', type: 'perf', color: 'text-green-400', 
      icon: <Zap size={18} />
    },
    { 
      id: 3, key: 'style', type: 'style', color: 'text-pink-400', 
      icon: <Layers size={18} />
    },
    { 
      id: 4, key: 'webgl', type: 'webgl', color: 'text-purple-400', 
      icon: <Box size={18} />
    },
    { 
      id: 5, key: 'mobile', type: 'mobile', color: 'text-orange-400', 
      icon: <Smartphone size={18} />
    },
    { 
      id: 6, key: 'ai', type: 'ai', color: 'text-blue-400', 
      icon: <BrainCircuit size={18} />
    },
  ];

  // Calculate Position based on index and device
  const getPosition = (index: number) => {
    if (isMobile) {
      // Mobile: Tight 2 columns grid
      const col = index % 2;
      const row = Math.floor(index / 2);
      return {
        x: col === 0 ? -90 : 90,
        y: (row - 1) * 120
      };
    } else {
      const positions = [
        { x: -240, y: -130 }, // Arch
        { x: 0, y: -150 },    // Perf
        { x: 240, y: -130 },  // Style
        { x: -240, y: 130 },  // WebGL
        { x: 0, y: 150 },     // Mobile
        { x: 240, y: 130 }    // AI
      ];
      return positions[index];
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tech decorative ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className={`w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-cyan-500/10 rounded-full transition-all duration-700 ${isExpanded ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
         <div className={`absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]`} />
      </div>

      {cards.map((card, index) => {
        const pos = getPosition(index);
        // Stacked state: slightly offset cards so they look like a deck
        const stackOffset = (index - 2.5) * 4; 
        const isThisCardHovered = hoveredCardId === card.id;
        
        return (
          <motion.div
            key={card.id}
            className="absolute w-[170px] md:w-[200px] h-[200px] md:h-[240px] rounded-xl border border-white/10 backdrop-blur-xl bg-[#0a0a12]/90 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer group z-10"
            onMouseEnter={() => setHoveredCardId(card.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            onClick={() => setHoveredCardId(card.id)} // Handle tap on mobile
            initial={false}
            animate={{
              rotateZ: isExpanded ? 0 : -10 + index * 4,
              rotateY: isExpanded ? 0 : -20 + index * 2,
              rotateX: isExpanded ? 0 : 10,
              x: isExpanded ? pos.x : stackOffset, 
              y: isExpanded ? pos.y : stackOffset * -1,
              scale: isThisCardHovered ? 1.15 : 1, // Scale up if hovered
              zIndex: isThisCardHovered ? 200 : (isExpanded ? 100 : cards.length - index) // Bring to front if hovered
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            {/* Mecha Corner Decors */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-lg" />

            {/* Header */}
            <div className="h-8 border-b border-white/10 bg-black/60 flex items-center px-3 justify-between">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-red-500 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-yellow-500 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors" />
              </div>
              <div className="text-[8px] md:text-[9px] font-mono text-cyan-500/50 uppercase tracking-widest">MOD.0{card.id}</div>
            </div>

            {/* Content Body */}
            <div className="p-3 md:p-4 flex flex-col h-full relative">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[200%] w-full animate-[scan_3s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100" />
              
              <div className="flex items-center gap-3 mb-4 relative z-10">
                 <div className={`p-2 rounded-md bg-white/5 ring-1 ring-white/10 ${card.color}`}>
                   {card.icon}
                 </div>
                 <div>
                    <div className="text-xs md:text-sm font-bold text-white tracking-wide whitespace-nowrap">{t(`hero.cards.${card.key}.title`)}</div>
                 </div>
              </div>

              {/* Visuals Container */}
              <div className="flex-1 relative z-10 w-full flex items-center justify-center">
                
                {/* Architecture: Mini Code Editor */}
                {card.type === 'arch' && (
                   <div className="w-full space-y-1 opacity-80 group-hover:opacity-100 transition-opacity bg-black/40 p-2 rounded border border-white/5 text-[7px] md:text-[8px] font-mono leading-tight">
                     <div className="flex gap-2 text-purple-400">
                        <span>import</span> <span className="text-yellow-300">{'{ App }'}</span>
                     </div>
                     <div className="flex gap-1">
                        <span className="text-purple-400">const</span> <span className="text-blue-300">Core</span> <span className="text-white">=</span> <span className="text-yellow-300">()</span> <span className="text-purple-400">{'=>'}</span> <span className="text-yellow-300">{'{'}</span>
                     </div>
                     <div className="pl-2 flex gap-1">
                        <span className="text-purple-400">return</span> <span className="text-cyan-300">{'<System />'}</span>
                     </div>
                     <div className="text-yellow-300">{'}'}</div>
                     <motion.div 
                        animate={{ opacity: [0, 1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }} 
                        className="w-1.5 h-2 bg-cyan-400 inline-block ml-1"
                     />
                   </div>
                )}

                {/* WebGL: Spinning Cube */}
                {card.type === 'webgl' && (
                   <div className="flex items-center justify-center h-full pb-2">
                      <motion.div 
                        animate={{ rotateX: 360, rotateY: 360 }} 
                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        className="w-8 h-8 md:w-10 md:h-10 border border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        style={{ transformStyle: 'preserve-3d' }}
                      />
                   </div>
                )}

                {/* Style: CSS Bars */}
                {card.type === 'style' && (
                   <div className="flex items-end gap-1 h-12 md:h-16 w-full border-b border-white/10 pb-1">
                     {[30, 50, 40, 70, 90].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: [`${h}%`, `${h - 10}%`, `${h}%`] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                          className="flex-1 bg-pink-500/30 hover:bg-pink-500 transition-colors rounded-t-sm"
                        />
                     ))}
                   </div>
                )}
                
                {/* Performance: Looping Gauge + Confetti */}
                 {card.type === 'perf' && (
                   <div className="flex flex-col items-center justify-center w-full h-full relative">
                      <AnimatePresence>
                        {showConfetti && (
                           <>
                             {[...Array(20)].map((_, i) => <ConfettiPiece key={i} delay={i * 0.02} />)}
                           </>
                        )}
                      </AnimatePresence>
                      
                      <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90 overflow-visible">
                             <circle cx="50%" cy="50%" r="22" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                             <circle 
                                cx="50%" cy="50%" r="22" 
                                stroke={getPerfColor(perfScore)}
                                strokeWidth="4" 
                                fill="transparent" 
                                strokeDasharray={138} // 2 * PI * 22 ~= 138
                                strokeDashoffset={138 - (perfScore / 100) * 138}
                                className="transition-all duration-100 ease-linear"
                             />
                         </svg>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-base md:text-lg font-bold" style={{ color: getPerfColor(perfScore) }}>
                               {perfScore}
                            </span>
                         </div>
                      </div>
                   </div>
                )}

                {/* Mobile: 3D Spinning Phone (Replaces Bubble) */}
                {card.type === 'mobile' && (
                    <div className="w-full h-full flex items-center justify-center perspective-500">
                       <motion.div
                         className="w-10 h-20 bg-orange-500/10 border border-orange-400 rounded-lg relative"
                         style={{ transformStyle: 'preserve-3d' }}
                         animate={{ rotateY: 360 }}
                         transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                       >
                          <div className="absolute inset-0 bg-orange-500/10 rounded-lg" style={{ transform: 'translateZ(5px)' }} />
                          <div className="absolute inset-0 bg-orange-500/10 rounded-lg" style={{ transform: 'translateZ(-5px)' }} />
                          {/* Screen content */}
                          <div className="absolute inset-x-1 top-2 bottom-2 bg-black/50 border border-white/10" style={{ transform: 'translateZ(6px)' }}>
                             <div className="w-full h-full flex flex-col gap-1 p-1">
                                <div className="w-full h-2 bg-orange-500/50 rounded-sm" />
                                <div className="w-1/2 h-2 bg-orange-500/30 rounded-sm" />
                                <div className="mt-auto w-full h-1 bg-white/30 rounded-full mx-auto" />
                             </div>
                          </div>
                       </motion.div>
                    </div>
                )}

                {/* AI: Data Processing */}
                 {card.type === 'ai' && (
                    <div className="w-full h-full flex items-center justify-center relative">
                       {/* Central Core */}
                       <div className="relative z-10 bg-blue-500/20 p-1.5 rounded-full border border-blue-400">
                          <BrainCircuit size={20} className="text-blue-400" />
                       </div>
                       
                       {/* Connected Nodes */}
                       {[0, 1, 2, 3].map((i) => (
                          <motion.div
                             key={i}
                             className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full"
                             style={{
                                top: i < 2 ? '10%' : 'auto',
                                bottom: i >= 2 ? '10%' : 'auto',
                                left: i % 2 === 0 ? '10%' : 'auto',
                                right: i % 2 !== 0 ? '10%' : 'auto',
                             }}
                             animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                             transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                          />
                       ))}

                       {/* Connecting Lines */}
                       <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                          <motion.line x1="50%" y1="50%" x2="15%" y2="15%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 2" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                          <motion.line x1="50%" y1="50%" x2="85%" y2="15%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 2" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                          <motion.line x1="50%" y1="50%" x2="15%" y2="85%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 2" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                          <motion.line x1="50%" y1="50%" x2="85%" y2="85%" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 2" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                       </svg>
                    </div>
                )}
              </div>
              
              {/* Footer Info */}
              <div className="mt-auto pt-2 border-t border-white/5">
                 <div className="text-[8px] md:text-[9px] text-slate-400 font-mono uppercase truncate">{t(`hero.cards.${card.key}.sub`)}</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroCards;