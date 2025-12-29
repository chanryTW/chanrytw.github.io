import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Cpu, Code, Zap, Database, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { PROJECTS } from '../constants';
import ParticleBackground from '../components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

// --- Shared UI ---

const SectionHeader = ({ title, sub }: { title: string, sub?: string }) => (
    <div className="mb-12 relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500">
            {title}
        </h2>
        {sub && <p className="text-cyan-500/60 font-mono tracking-[0.2em] mt-2 text-sm md:text-base">{sub}</p>}
    </div>
);

// --- Components ---

const LanguageToggle = () => {
    const { i18n } = useTranslation();
    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="fixed top-8 right-8 z-50 flex items-center bg-black/40 border border-white/10 rounded-sm p-1 gap-1 backdrop-blur-md">
            {Object.values(Language).map((lang) => (
                <button
                    key={lang}
                    onClick={() => changeLang(lang)}
                    className={`px-2 py-1 text-[10px] font-mono tracking-wider transition-all rounded-sm ${i18n.language === lang
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

// --- Sections ---

const IntroSection = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".hero-line-1", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
            .from(".hero-line-2", {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            }, "-=0.8")
            .from(".hero-sub", {
                opacity: 0,
                y: 20,
                duration: 1
            }, "-=0.5");
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black/20">
            <ParticleBackground className="!absolute !opacity-100" />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-0"></div>

            <div className="z-10 text-center px-4 flex flex-col items-center">
                <h1 className="font-display font-bold leading-none tracking-tighter mb-6">
                    <span className="hero-line-1 block text-6xl md:text-8xl text-white opacity-90 mb-2">Hello</span>
                    <span className="hero-line-2 block text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
                        I'm CHANRY
                    </span>
                </h1>

                <p className="hero-sub text-xl md:text-2xl text-cyan-400/80 font-mono tracking-widest mt-8">
                    [ {t('hero.role')} ]
                </p>
            </div>

            <motion.div
                className="absolute bottom-10 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronDown className="text-cyan-500/50 w-8 h-8" />
            </motion.div>
        </div>
    );
};

const AboutSection = () => {
    const { t } = useTranslation();
    const ref = useRef(null);

    useGSAP(() => {
        gsap.fromTo(".about-content",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 70%",
                }
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className="min-h-screen flex items-center justify-center relative py-20 bg-zinc-950">
            <div className="max-w-7xl w-full mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Image Side */}
                <div className="relative group perspective-1000 order-2 md:order-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full transform group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                        <img
                            src="/image/me.jpg"
                            alt="Chanry"
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
                    </div>

                    {/* Tech Decor */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* Text Side */}
                <div className="about-content relative z-10 order-1 md:order-2">
                    <SectionHeader title={t('about.title')} sub={t('about.class')} />

                    <div className="space-y-6 text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                        <p className="border-l-4 border-cyan-500 pl-6 py-2 bg-gradient-to-r from-cyan-900/10 to-transparent">
                            {t('about.text')}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <div className="bg-zinc-900 px-6 py-4 rounded border border-zinc-800 flex flex-col items-center min-w-[120px]">
                                <span className="text-3xl font-bold text-white">6+</span>
                                <span className="text-xs text-cyan-500 font-mono mt-1">YEARS</span>
                            </div>
                            <div className="bg-zinc-900 px-6 py-4 rounded border border-zinc-800 flex flex-col items-center min-w-[120px]">
                                <span className="text-3xl font-bold text-white">30+</span>
                                <span className="text-xs text-purple-500 font-mono mt-1">PROJECTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExperienceSlide = ({ item, index }: { item: any, index: number }) => {
    return (
        <div className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[40vw] p-8 md:p-12 border border-white/10 bg-zinc-900/50 backdrop-blur-md rounded-xl relative group hover:bg-zinc-800/50 hover:border-cyan-500/30 transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-8xl font-bold text-white group-hover:text-cyan-500 transition-colors select-none">
                {String(index + 1).padStart(2, '0')}
            </div>

            <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-cyan-950/50 text-cyan-400 text-xs font-mono mb-6 rounded border border-cyan-500/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                    {item.period}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">{item.role}</h3>
                <h4 className="text-lg md:text-xl text-slate-400 mb-6 font-mono text-cyan-500/60">{item.company}</h4>
            </div>

            <div className="mt-8 border-t border-white/5 pt-6 relative z-10">
                <div className="flex items-center gap-2 text-sm font-mono text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    LOGGED
                </div>
            </div>
        </div>
    );
};

const ExperienceSection = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Get experience items
    const expItems = t('experience.items', { returnObjects: true }) as Record<string, any>;
    // Filter out items that might not be actual experience entries if any, usually works fine
    const experiences = Object.values(expItems || {});

    useGSAP(() => {
        if (!sliderRef.current || !containerRef.current) return;

        // Wait for next frame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
            if (!sliderRef.current || !containerRef.current) return;

            const totalWidth = sliderRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;

            const scrollTween = gsap.to(sliderRef.current, {
                x: -(totalWidth - viewportWidth + 100),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + totalWidth,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });

            // Force refresh after a short delay to recalculate after fonts/styles load
            const timeoutId = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                scrollTween.kill();
            };
        });
    }, { scope: containerRef, dependencies: [experiences.length] });

    return (
        <div ref={containerRef} className="h-screen flex flex-col justify-center bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/image/bg-glitch.png')] opacity-10 bg-cover bg-center"></div>

            <div className="container mx-auto px-6 mb-12 relative z-10">
                <SectionHeader title={t('experience.title')} sub="Timeline" />
            </div>

            <div ref={sliderRef} className="flex gap-8 px-6 md:px-24 w-max relative z-10">
                {experiences.map((item, i) => (
                    <ExperienceSlide key={i} item={item} index={i} />
                ))}
            </div>
        </div>
    );
};

const SkillCard = ({ icon: Icon, title, desc, color }: any) => {
    const colorClasses: Record<string, { bg: string, text: string, border: string }> = {
        cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'hover:border-cyan-500/50' },
        green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'hover:border-green-500/50' },
        purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'hover:border-purple-500/50' },
        yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'hover:border-yellow-500/50' }
    };

    const theme = colorClasses[color] || colorClasses.cyan;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`p-6 bg-zinc-900/80 border border-white/5 rounded-xl transition-all group ${theme.border}`}
        >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:text-white ${theme.bg} ${theme.text}`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
};

const SkillsSection = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen py-32 bg-zinc-950 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <SectionHeader title={t('skills.title')} sub={t('skills.sys_info')} />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SkillCard
                        icon={Code}
                        color="cyan"
                        title="Frontend"
                        desc={t('skills.cat_frontend')}
                    />
                    <SkillCard
                        icon={Database}
                        color="green"
                        title="Backend"
                        desc={t('skills.cat_backend')}
                    />
                    <SkillCard
                        icon={Cpu}
                        color="purple"
                        title="AI & ML"
                        desc={t('skills.cat_ai')}
                    />
                    <SkillCard
                        icon={Zap}
                        color="yellow"
                        title="Other"
                        desc={t('skills.cat_design')}
                    />
                </div>

                <div className="mt-20 p-8 border border-dashed border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-cyan-500"></span>
                        {t('skills.items.frameworks.name')}
                    </h3>
                    <p className="text-slate-300 whitespace-pre-line leading-loose font-mono text-sm md:text-base">
                        {t('skills.items.frameworks.desc')}
                    </p>
                </div>
            </div>
        </div>
    );
};

const WorksSection = () => {
    const { t } = useTranslation();
    const ref = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.work-card');
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
            }
        });
    }, { scope: ref });

    return (
        <div ref={ref} className="py-32 bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title={t('works.title')} sub="PROJECTS" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="work-card group relative h-[400px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex gap-2 mb-3 flex-wrap">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-slate-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.description}</p>

                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-white font-mono text-xs uppercase tracking-widest hover:text-cyan-400 transition-colors">
                                            View Project <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ContactSection = () => {
    const { t } = useTranslation();
    return (
        <div className="py-40 bg-[#030014] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/image/bg-tech.png')] opacity-10 bg-cover bg-center"></div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-green-500/30 bg-green-900/10 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-mono text-green-400">{t('contact.link_est')}</span>
                </div>

                <h2 className="text-5xl md:text-8xl font-bold font-display text-white mb-8">
                    {t('contact.heading')}
                </h2>
                <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
                    {t('contact.text')}
                </p>

                <a href="mailto:chanrytw@gmail.com" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-xl font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors clip-corner-tr group">
                    <Zap className="group-hover:fill-current" />
                    {t('contact.send')}
                </a>
            </div>
        </div>
    );
};

export const StoryPage: React.FC = () => {
    return (
        <div className="bg-black text-white selection:bg-cyan-500/30 font-sans">
            <LanguageToggle />

            <Link to="/" className="fixed top-8 left-8 z-50 group flex items-center gap-2 text-cyan-500 font-mono text-sm uppercase tracking-widest transition-all hover:text-white bg-black/50 px-4 py-2 rounded-full border border-cyan-500/30 backdrop-blur-md">
                <span className="w-2 h-2 bg-cyan-500 rounded-full group-hover:bg-white transition-colors"></span>
                Back
            </Link>

            <IntroSection />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <WorksSection />
            <ContactSection />

            {/* Simple Footer */}
            <div className="py-8 bg-black text-center border-t border-white/5">
                <Link to="/" className="text-slate-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
                    Return to Console
                </Link>
            </div>

        </div>
    );
};
