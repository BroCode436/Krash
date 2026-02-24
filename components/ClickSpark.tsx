import React, { useEffect, useState } from 'react';

interface Spark {
    id: number;
    x: number;
    y: number;
}

const ClickSpark: React.FC = () => {
    const [sparks, setSparks] = useState<Spark[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newSpark: Spark = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };

            setSparks((prev) => [...prev, newSpark]);

            // Remove spark after animation completes
            setTimeout(() => {
                setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id));
            }, 600);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {sparks.map((spark) => (
                <div
                    key={spark.id}
                    className="absolute"
                    style={{
                        left: spark.x,
                        top: spark.y,
                    }}
                >
                    {/* Spark particles */}
                    {[...Array(8)].map((_, i) => {
                        const angle = (i * 360) / 8;
                        const distance = 20;
                        const x = Math.cos((angle * Math.PI) / 180) * distance;
                        const y = Math.sin((angle * Math.PI) / 180) * distance;

                        return (
                            <div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-accent-primary rounded-full"
                                style={{
                                    animation: `sparkParticle 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                                    animationDelay: `${i * 0.02}s`,
                                    transform: 'translate(-50%, -50%)',
                                    '--spark-x': `${x}px`,
                                    '--spark-y': `${y}px`,
                                } as React.CSSProperties}
                            />
                        );
                    })}
                </div>
            ))}
            <style>{`
        @keyframes sparkParticle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--spark-x)), calc(-50% + var(--spark-y))) scale(0);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default ClickSpark;
