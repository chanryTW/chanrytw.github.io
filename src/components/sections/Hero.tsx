import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Instagram, Facebook, MessageCircle, ChevronDown } from 'lucide-react';
import HeroCards from '../HeroCards';

const SOCIAL_LINKS = [
    { icon: Github, url: 'https://github.com/chanryTW' },
    { icon: Linkedin, url: 'http://www.linkedin.com/in/Chanry' },
    { icon: Instagram, url: 'https://www.instagram.com/chanryx' },
    { icon: Facebook, url: 'https://www.facebook.com/chanryx' },
    { icon: MessageCircle, url: 'https://line.me/ti/p/9i77rX0VNH' },
    { icon: Mail, url: 'mailto:chanrytw@gmail.com' }
];

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-24 pb-10 z-10">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center flex-1">
        
        {/* Hero Content - Mobile: Order 1 (Top), Desktop: Order 1 (Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-1 relative"
        >
          {/* Decorative Label with GREEN DOT */}
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-green-500/30 bg-green-900/10 mb-10 backdrop-blur-sm">
             <span className="w-2 h-2 bg-green-500 animate-pulse rounded-full shadow-[0_0_10px_#22c55e]" />
             <span className="text-xs font-mono text-green-400 tracking-[0.2em]">{t('hero.greeting')}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-display leading-[0.9] mb-8 tracking-tighter">
            Hello <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 text-glow block mt-2">I'm CHANRY</span>
          </h1>
          
          <div className="flex items-center gap-4 mb-8 text-xl md:text-2xl font-mono text-cyan-300/80">
            <span>[ {t('hero.role')} ]</span>
          </div>

          <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed mb-12 pl-6 border-l-4 border-cyan-500/50">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-8 items-center">
             <button 
               onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
               className="hidden md:block btn-glitch px-10 py-5 bg-white text-black font-bold text-sm md:text-base uppercase tracking-[0.2em] clip-corner hover:bg-cyan-400 hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
             >
               {t('hero.cta')}
             </button>
             
             <div className="flex gap-6">
                {SOCIAL_LINKS.map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                    <item.icon size={24} />
                  </a>
                ))}
             </div>
          </div>

          {/* Mobile Scroll Hint - Placed here to be below Content but before Cards on mobile */}
          <motion.div 
            className="flex flex-col items-center gap-2 md:hidden opacity-70 z-20 mt-16 mb-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
             <span className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase">{t('hero.scroll')}</span>
             <ChevronDown className="text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* Hero Visual - Mobile: Order 2 (Bottom), Desktop: Order 2 (Right) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="order-2 lg:order-2 flex flex-col items-center justify-center perspective-1000"
        >
          <HeroCards />
        </motion.div>
      </div>
    </section>
  );
};