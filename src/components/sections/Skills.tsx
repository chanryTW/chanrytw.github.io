import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Palette, Database, Terminal, Award, Hash, Brain } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../../constants';

export const Skills: React.FC = () => {
   const { t } = useTranslation();

   return (
      <section id="skills" className="py-20 relative z-10 bg-[#05050a]/50">
         <div className="max-w-7xl mx-auto px-6">
            <SectionTitle num="03">{t('skills.title')}</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
               {SKILL_CATEGORIES.map((category, idx) => (
                  <RevealOnScroll key={category.id} delay={idx * 0.2}>
                     <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
                           {category.id === 'frontend' && <Code className="text-cyan-500" />}
                           {category.id === 'design' && <Palette className="text-purple-500" />}
                           {category.id === 'backend' && <Database className="text-green-500" />}
                           {category.id === 'ai' && <Brain className="text-rose-500" />}
                           <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">{t(category.titleKey)}</h3>
                        </div>

                        <div className="flex flex-col gap-3">
                           {category.skills.map((skill) => (
                              <div key={skill.key} className="group relative">
                                 <div className="bg-[#0a0a12] border border-white/10 p-4 relative overflow-visible hover:border-cyan-500/40 transition-all duration-300 cursor-default">
                                    {/* Skill Name & Level */}
                                    <div className="flex justify-between items-center relative z-10">
                                       <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors flex-1 mr-4">{t(`skills.items.${skill.key}.name`)}</span>

                                       {/* Level Bar & Percentage */}
                                       <div className="flex items-center gap-3 w-1/2 sm:w-[40%] justify-end">
                                          <span className="font-mono text-cyan-400 text-xs min-w-[3ch] text-right">{skill.level}%</span>
                                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                             <div className="h-full bg-cyan-500 shadow-[0_0_10px_#00f0ff]" style={{ width: `${skill.level}%` }} />
                                          </div>
                                       </div>
                                    </div>

                                    {/* Tooltip - Large Floating Details */}
                                    <div className="absolute left-0 top-full mt-2 w-full md:w-[400px] bg-[#020005] border border-cyan-500/50 p-5 shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50 clip-corner text-sm">
                                       <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-900/50">
                                          <Terminal size={14} className="text-cyan-500" />
                                          <span className="font-mono text-[10px] text-cyan-500 uppercase">DETAILS // {skill.key.toUpperCase()}</span>
                                       </div>
                                       <p className="text-slate-300 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                                          {t(`skills.items.${skill.key}.desc`)}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </RevealOnScroll>
               ))}
            </div>

            {/* Certifications Grid */}
            <div className="mt-20">
               <RevealOnScroll>
                  <div className="flex items-center gap-3 mb-8">
                     <Award className="text-yellow-500" size={28} />
                     <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">{t('skills.certs.title')}</h3>
                     <div className="h-[1px] flex-1 bg-white/10 ml-4" />
                  </div>
               </RevealOnScroll>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {CERTIFICATIONS.map((cert, i) => (
                     <RevealOnScroll key={cert.id} delay={0.05 * (i % 10)}>
                        <div className="bg-white/5 border border-white/5 p-4 flex items-start gap-3 hover:bg-cyan-900/10 hover:border-cyan-500/30 transition-colors group">
                           <Hash className="text-white/20 group-hover:text-cyan-500 mt-1 shrink-0 transition-colors" size={16} />
                           <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-100 leading-relaxed">
                              {t(cert.name)}
                           </span>
                        </div>
                     </RevealOnScroll>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};