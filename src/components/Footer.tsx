import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

const SOCIAL_LINKS = [
    { icon: Github, url: 'https://github.com/chanryTW' },
    { icon: Linkedin, url: 'http://www.linkedin.com/in/Chanry' },
    { icon: Instagram, url: 'https://www.instagram.com/chanryx' },
    { icon: Facebook, url: 'https://www.facebook.com/chanryx' },
    { icon: MessageCircle, url: 'https://line.me/ti/p/9i77rX0VNH' },
    { icon: Mail, url: 'mailto:chanrytw@gmail.com' }
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-10 border-t border-white/10 bg-[#020005] relative z-10">
       <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-mono text-slate-500 uppercase tracking-widest">
             <span className="text-cyan-500 mr-3">///</span>
             {t('footer.rights')} © 2025
          </div>
          <div className="flex gap-8 text-xs font-mono text-slate-500">
             {SOCIAL_LINKS.map((link, i) => (
               <a key={i} href={link.url} target="_blank" rel="noreferrer" className="hover:text-cyan-500 transition-colors flex items-center gap-2">
                  <link.icon size={16} />
               </a>
             ))}
          </div>
       </div>
    </footer>
  );
};