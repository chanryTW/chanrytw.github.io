import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-40 relative z-10 flex items-center justify-center overflow-hidden">
       <div className="text-center relative z-10 max-w-3xl mx-auto px-6">
          {/* Background Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-pulse pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-dashed border-white/5 rounded-full pointer-events-none" />

          <RevealOnScroll>
            <div className="mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                 <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full shadow-[0_0_10px_#22c55e]" />
                 <span className="text-sm font-mono text-green-400 tracking-[0.2em]">{t('contact.link_est')}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-bold font-display text-white mb-8 leading-tight">
                {t('contact.heading').split(' ').slice(0,2).join(' ')} <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  {t('contact.heading').split(' ').slice(2).join(' ')}
                </span>
              </h2>
              <p className="text-slate-400 text-xl max-w-xl mx-auto leading-relaxed">
                {t('contact.text')}
              </p>
            </div>
            
            <button 
              onClick={() => window.location.href = 'mailto:chanrytw@gmail.com'}
              className="relative group inline-block"
            >
               <div className="absolute inset-0 bg-cyan-500 blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
               <div className="relative bg-black border-2 border-cyan-500 text-white px-16 py-8 text-2xl font-bold uppercase tracking-[0.2em] clip-corner hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center gap-6 btn-glitch shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <Zap size={32} />
                  {t('contact.send')}
               </div>
            </button>
          </RevealOnScroll>
       </div>
    </section>
  );
};