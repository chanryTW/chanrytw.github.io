import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Language } from '../types';

export const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    ['home', 'about', 'experience', 'skills', 'works', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${scrolled ? 'py-4 bg-[#030014]/95 backdrop-blur-xl border-cyan-900/50' : 'py-8 border-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection('home')}
        >
          <div className="w-10 h-10 border-2 border-cyan-500 flex items-center justify-center relative overflow-hidden bg-black">
            <div className="absolute inset-0 bg-cyan-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="font-display font-bold text-white text-sm relative z-10 group-hover:text-black">TW</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-display tracking-widest text-white leading-none">CHANRY</span>
            <span className="text-[9px] text-cyan-500 font-mono tracking-[0.3em] mt-1">FE_ENGINEER</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['home', 'about', 'experience', 'skills', 'works'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-sm font-medium transition-all uppercase tracking-widest relative group flex items-center ${activeSection === item ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'}`}
            >
              <span className={`mr-1 transition-opacity ${activeSection === item ? 'opacity-100 text-cyan-500' : 'opacity-0 group-hover:opacity-100 text-cyan-800'}`}>/</span>
              {t(`nav.${item}`)}
              {activeSection === item && (
                <motion.div layoutId="activeLine" className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_#00f0ff]" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {/* Language Selector Switch */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-sm p-1 gap-1">
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

          <Link
            to="/story"
            className="hidden sm:block text-white border border-white/20 px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors clip-corner-tr"
          >
            Story Version
          </Link>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:block bg-white text-black px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors clip-corner-tr"
          >
            {t('nav.contact')}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};