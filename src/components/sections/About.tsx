import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const About: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="py-40 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle num="01">{t('about.title')}</SectionTitle>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8">
             <RevealOnScroll>
               <GlassCard className="h-full flex flex-col justify-center" title={t('about.card_title')}>
                  <div className="flex flex-col sm:flex-row items-start gap-8 mb-8 border-b border-white/10 pb-8">
                     {/* Mecha Photo Frame */}
                     <div className="relative w-32 h-32 flex-shrink-0">
                        <div className="absolute inset-0 clip-corner bg-cyan-500/20 animate-pulse" />
                        <div className="absolute -inset-1 border border-cyan-500/30 clip-corner" />
                        <img 
                           src="/image/me2.png" 
                           alt="Chanry" 
                           className="w-full h-full object-cover clip-corner transition-all duration-500 relative z-10" 
                        />
                        {/* HUD Overlay on photo */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400 z-20" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-400 z-20" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />
                     </div>

                     <div className="pt-2">
                        <h3 className="text-3xl font-bold text-white font-display tracking-wider mb-2">Chanry 廖詮睿</h3>
                        <div className="flex flex-wrap gap-4 font-mono text-xs text-cyan-500/80 mb-4">
                           <span>{t('about.class')}</span>
                           <span>{t('about.exp')}</span>
                           <span>{t('about.base')}</span>
                        </div>
                        {/* Education Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-900/20 border border-purple-500/30 rounded-sm">
                           <GraduationCap size={14} className="text-purple-400" />
                           <span className="text-xs font-mono text-purple-200">{t('about.edu')}</span>
                        </div>
                     </div>
                  </div>
                  <p className="text-slate-300 leading-loose text-xl font-light">
                    {t('about.text')}
                  </p>
               </GlassCard>
             </RevealOnScroll>
           </div>
           
           {/* Stats - Adjusted Layout (2 items) */}
           <div className="lg:col-span-4 flex lg:flex-col flex-row gap-4 md:gap-6">
              <RevealOnScroll delay={0.2} className="flex-1">
                <GlassCard className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-[#0a0a12] to-cyan-900/20 border-cyan-500/30">
                   <span className="text-7xl font-bold font-display text-white drop-shadow-lg">6<span className="text-cyan-500 text-4xl align-top">+</span></span>
                   <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest mt-4 border-t border-cyan-500/30 pt-2 w-full text-center">{t('about.stats.exp_label')}</span>
                </GlassCard>
              </RevealOnScroll>
              <RevealOnScroll delay={0.4} className="flex-1">
                <GlassCard className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-[#0a0a12] to-purple-900/20 border-purple-500/30">
                   <span className="text-7xl font-bold font-display text-white drop-shadow-lg">30<span className="text-purple-500 text-4xl align-top">+</span></span>
                   <span className="text-sm font-mono text-purple-400 uppercase tracking-widest mt-4 border-t border-purple-500/30 pt-2 w-full text-center">{t('about.stats.proj_label')}</span>
                </GlassCard>
              </RevealOnScroll>
           </div>
        </div>
      </div>
    </section>
  );
};