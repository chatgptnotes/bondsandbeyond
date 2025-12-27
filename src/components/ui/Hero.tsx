'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=2670&auto=format&fit=crop",
        title: "Art That",
        titleAccent: "Transforms Spaces",
        subtitle: "Bespoke oil paintings, murals & sculptures crafted for luxury hospitality",
    },
    {
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2670&auto=format&fit=crop",
        title: "Where Vision",
        titleAccent: "Meets Craftsmanship",
        subtitle: "Custom art solutions for hotels, hospitals & architectural spaces",
    },
    {
        image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=2670&auto=format&fit=crop",
        title: "Creating",
        titleAccent: "Timeless Interiors",
        subtitle: "Hand-crafted pieces that tell your unique story",
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                >
                    <div className={styles.imageWrapper}>
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            quality={90}
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles.overlay} />
                    </div>
                </div>
            ))}

            {/* Content */}
            <div className={styles.content}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        className={styles.textContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className={styles.title}>
                            {slides[currentSlide].title}
                            <span className={styles.titleAccent}>{slides[currentSlide].titleAccent}</span>
                        </h1>
                        <p className={styles.subtitle}>{slides[currentSlide].subtitle}</p>
                        <div className={styles.ctaGroup}>
                            <button className={styles.ctaPrimary}>View Our Work</button>
                            <button className={styles.ctaSecondary}>Get in Touch</button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Hint */}
            <div className={styles.scrollHint}>
                <span>Scroll to explore</span>
                <motion.div
                    className={styles.scrollLine}
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </section>
    );
}
