import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const StoryPage: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.story-section');

        sections.forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'top 25%',
                        toggleActions: 'play reverse play reverse',
                        scrub: 1
                    }
                }
            );
        });

    }, { scope: mainRef });

    return (
        <div ref={mainRef} className="bg-black text-white min-h-screen font-sans selection:bg-purple-500/30">
            <Link to="/" className="fixed top-8 left-8 z-50 text-cyan-500 hover:text-cyan-300 font-mono text-sm border border-cyan-500/50 px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-sm transition-all hover:bg-cyan-950/30">
                ← Back to Reality
            </Link>

            <div className="min-h-screen flex items-center justify-center story-section">
                <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-center px-4">
                    The Journey
                </h1>
            </div>

            <div className="min-h-screen flex items-center justify-center story-section max-w-4xl mx-auto px-6">
                <p className="text-2xl md:text-5xl text-center leading-relaxed text-slate-300 font-light">
                    It started with a single line of code. <br />
                    <span className="text-cyan-400 font-mono mt-4 block">console.log("Hello World");</span>
                </p>
            </div>

            <div className="min-h-screen flex items-center justify-center story-section max-w-4xl mx-auto px-6">
                <p className="text-2xl md:text-5xl text-center leading-relaxed text-slate-300 font-light">
                    From the depths of <span className="text-red-400">syntax errors</span> and <span className="text-red-400">infinite loops</span>,<br />
                    a developer was forged.
                </p>
            </div>

            <div className="min-h-screen flex items-center justify-center story-section max-w-4xl mx-auto px-6">
                <p className="text-2xl md:text-5xl text-center leading-relaxed text-slate-300 font-light">
                    Crafting digital experiences,<br />
                    <span className="text-purple-400">one pixel at a time.</span>
                </p>
            </div>

            <div className="min-h-screen flex items-center justify-center story-section max-w-4xl mx-auto px-6">
                <div className="text-center">
                    <p className="text-3xl md:text-6xl font-bold mb-8">To be continued...</p>
                    <Link to="/" className="text-cyan-500 hover:text-white transition-colors text-xl underline decoration-cyan-500/30 underline-offset-8">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
