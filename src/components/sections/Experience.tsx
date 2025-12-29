import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { SectionTitle } from '../ui/SectionTitle';
import { EXPERIENCES } from '../../constants';

export const Experience: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
         <SectionTitle num="02">{t('experience.title')}</SectionTitle>
         
         {/* Zigzag Timeline */}
         <div className="relative max-w-6xl mx-auto mt-12">
            {/* Center Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent md:-translate-x-1/2" />

            <div className="relative">
               {EXPERIENCES.map((exp, i) => (
                  <motion.div 
                    key={exp.id} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                    style={{ zIndex: i }}
                    className={`relative flex flex-col md:flex-row items-center pointer-events-none mb-10 ${i > 0 ? 'md:-mt-20' : ''} ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                     {/* Spacer for layout balance on desktop */}
                     <div className="hidden md:block flex-1" />
                     
                     {/* Timeline Dot */}
                     <div className="absolute left-[15px] md:left-1/2 w-2.5 h-2.5 bg-[#030014] border-2 border-cyan-500 rotate-45 transform md:-translate-x-1/2 z-10 group-hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.5)] top-0 md:top-1/2 md:-mt-1.5" />

                     {/* Content Card */}
                     <div className={`w-[calc(100%-50px)] ml-auto md:ml-0 md:w-[calc(50%-40px)] md:py-4 ${i % 2 === 0 ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}`}>
                        <GlassCard className="group hover:border-cyan-500/40 transition-colors relative pointer-events-auto" noPadding>
                           {/* Connector Line (Desktop only) */}
                           <div className={`hidden md:block absolute top-1/2 w-10 h-[1px] bg-cyan-500/30 ${i % 2 === 0 ? 'left-full' : 'right-full'}`} />

                           <div className="p-6">
                              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 mb-4">
                                 <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{t(exp.role)}</h3>
                                    <h4 className="text-base text-purple-400 font-mono mt-1">{t(exp.company)}</h4>
                                 </div>
                                 <div className="px-3 py-1 border border-white/10 bg-white/5 text-xs font-mono text-slate-400 rounded w-fit whitespace-nowrap">
                                    {t(exp.period)}
                                 </div>
                              </div>
                              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6">
                                {t(exp.description)}
                              </p>

                              {/* Image Grid for Experience */}
                              {exp.images && (
                                <div className="grid grid-cols-3 gap-3 mt-4">
                                  {exp.images.map((img, idx) => (
                                    <div key={idx} className="aspect-video bg-black/50 border border-white/10 rounded-sm overflow-hidden relative group/img">
                                      <div className="absolute inset-0 bg-cyan-500/10 group-hover/img:bg-transparent transition-colors z-10" />
                                      <img 
                                        src={img} 
                                        alt="Work preview" 
                                        className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-500" 
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                           </div>
                        </GlassCard>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};