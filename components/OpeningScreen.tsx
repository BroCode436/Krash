import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitType from 'split-type';

const OpeningScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [showScreen, setShowScreen] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);

    const rotatingWords = ['Anonymous', 'Dark', 'Unfiltered'];

    useEffect(() => {
        // Initialize SplitType for both text lines
        let split1: SplitType | null = null;
        let split2: SplitType | null = null;

        if (textRef1.current && textRef2.current) {
            split1 = new SplitType(textRef1.current, { types: 'chars' });
            split2 = new SplitType(textRef2.current, { types: 'chars' });

            // Get all characters from both lines
            const chars1 = split1.chars || [];
            const chars2 = split2.chars || [];
            const allChars = [...chars1, ...chars2];

            // Animate each character sequentially
            allChars.forEach((char, index) => {
                if (char) {
                    char.style.display = 'inline-block';
                    char.style.opacity = '0';
                    char.style.transform = 'translateY(50px) scale(0.5)';
                    char.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                    setTimeout(() => {
                        char.style.opacity = '1';
                        char.style.transform = 'translateY(0) scale(1)';
                    }, index * 80); // 80ms delay between each letter
                }
            });
        }

        // Start rotating text
        const rotationInterval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 1600);

        // Calculate total animation time and fade out
        const totalChars = (textRef1.current?.textContent?.length || 0) + (textRef2.current?.textContent?.length || 0);
        const fadeTimer = setTimeout(() => {
            setShowScreen(false);
            setTimeout(onComplete, 600);
        }, totalChars * 80 + 3500);

        return () => {
            clearInterval(rotationInterval);
            clearTimeout(fadeTimer);
            if (split1) split1.revert();
            if (split2) split2.revert();
        };
    }, [onComplete, rotatingWords.length]);

    if (!showScreen) return null;

    // Rotating text variants
    const rotatingVariants = {
        enter: {
            opacity: 0,
            y: 15,
            filter: 'blur(4px)',
        },
        center: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        exit: {
            opacity: 0,
            y: -15,
            filter: 'blur(4px)',
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-primary-dark flex items-center justify-center"
        >
            <div className="text-center space-y-12 px-6">
                {/* Main Text - Split Text Animation */}
                <div className="space-y-4">
                    {/* First Line: SPEAK FREELY */}
                    <div
                        ref={textRef1}
                        className="text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-text-primary"
                    >
                        SPEAK FREELY
                    </div>

                    {/* Second Line: IT MATTERS */}
                    <div
                        ref={textRef2}
                        className="text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-text-primary"
                    >
                        IT MATTERS
                    </div>
                </div>

                {/* Rotating Text Box */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className="h-24 flex items-center justify-center"
                >
                    <div className="border-2 border-accent-primary/50 rounded-xl px-10 py-5 min-w-[280px] flex items-center justify-center bg-accent-primary/5">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentWordIndex}
                                variants={rotatingVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="text-3xl md:text-4xl font-bold text-accent-primary uppercase tracking-wide"
                            >
                                {rotatingWords[currentWordIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OpeningScreen;
