import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Enhanced particle system
    const particles: { 
      x: number; y: number; 
      size: number; 
      speedX: number; speedY: number; 
      alpha: number;
      type: 'circle' | 'square';
    }[] = [];
    
    const particleCount = 150; // Increased count

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8, // Slightly faster
        speedY: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.6 + 0.1,
        type: Math.random() > 0.8 ? 'square' : 'circle' // 20% are data packets (squares)
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.type === 'square' 
          ? `rgba(189, 0, 255, ${p.alpha})` // Purple for squares
          : `rgba(0, 240, 255, ${p.alpha})`; // Cyan for circles
        
        ctx.beginPath();
        if (p.type === 'square') {
           ctx.rect(p.x, p.y, p.size * 1.5, p.size * 1.5);
        } else {
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw connections if close enough (Networking effect)
        for (let j = i + 1; j < particles.length; j++) {
           const p2 = particles[j];
           const dx = p.x - p2.x;
           const dy = p.y - p2.y;
           const distance = Math.sqrt(dx * dx + dy * dy);

           if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
           }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
    />
  );
};

export default ParticleBackground;