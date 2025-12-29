import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { PROJECTS } from '../../constants';

export const Works: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="works" className="py-32 relative z-10">
       <div className="max-w-7xl mx-auto px-6">
         <SectionTitle num="04">{t('works.title')}</SectionTitle>
         <RevealOnScroll>
           <p className="text-slate-400 font-mono text-sm mb-10 max-w-2xl">
              // {t('works.disclaimer')}
           </p>
         </RevealOnScroll>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {PROJECTS.map((project, idx) => (
             <RevealOnScroll key={project.id} delay={idx * 0.1} className={project.size === 'md' ? 'lg:col-span-2' : ''}>
               <div className="group relative h-full">
                 <GlassCard noPadding className="h-[400px] overflow-hidden group-hover:border-cyan-500/60 transition-all duration-500 bg-[#05050a]">
                    {/* Image Container */}
                    <div className="absolute inset-0 overflow-hidden">
                       <img 
                         src={project.imageUrl} 
                         alt={project.title} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-50" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                        <div className="flex flex-wrap gap-2 mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                           {project.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-mono font-bold text-black uppercase bg-cyan-400 px-2 py-1">
                               {tag}
                             </span>
                           ))}
                        </div>
                        
                        <div className="flex justify-between items-end">
                           <div className="max-w-[85%]">
                              <h3 className="text-3xl font-bold text-white font-display uppercase tracking-wide mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                              <p className="text-base text-slate-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                {project.description}
                              </p>
                           </div>
                           
                           {project.link && <a 
                             href={project.link} 
                             target="_blank"
                             rel="noreferrer"
                             className="w-14 h-14 bg-white/5 border border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all rounded-full group/btn"
                           >
                             <ArrowUpRight size={28} className="group-hover/btn:rotate-45 transition-transform" />
                           </a>}
                        </div>
                    </div>
                 </GlassCard>
               </div>
             </RevealOnScroll>
           ))}
         </div>
       </div>
    </section>
  );
};