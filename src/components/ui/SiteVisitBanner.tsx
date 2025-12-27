'use client';

import styles from './SiteVisitBanner.module.css';
import { motion } from 'framer-motion';

export default function SiteVisitBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>Personalized Site Visits</h2>
        <p className={styles.description}>
          Experience our bespoke consultation service. Our expert artists visit your space
          to understand your vision, assess the environment, and create custom artwork
          that perfectly complements your interiors.
        </p>
        <button className={styles.cta}>Schedule a Visit</button>
      </motion.div>
    </section>
  );
}
