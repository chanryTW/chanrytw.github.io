import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Globe3D from '../Globe3D';
import ParticleBackground from '../ParticleBackground';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Skills } from '../sections/Skills';
import { Works } from '../sections/Works';
import { Contact } from '../sections/Contact';

export const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 selection:text-cyan-100 overflow-hidden">

            {/* Backgrounds */}
            <Suspense fallback={null}>
                <Globe3D />
            </Suspense>
            <ParticleBackground />

            {/* Decorative Grid Lines & HUD Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            <div className="fixed left-8 bottom-8 z-40 hidden lg:flex flex-col gap-2 font-mono text-[9px] text-cyan-500/50 tracking-widest pointer-events-none">
                <span>{t('sys.status')}</span>
                <span>{t('sys.loc')}</span>
                <span>{t('sys.fps')}</span>
            </div>

            <NavBar />

            <Hero />
            <About />
            <Experience />
            <Skills />
            <Works />
            <Contact />

            <Footer />
        </div>
    );
};
