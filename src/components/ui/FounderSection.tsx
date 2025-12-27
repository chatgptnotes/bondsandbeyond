'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './FounderSection.module.css';

export default function FounderSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.titleWrapper}>
          <div className={styles.accentBar} />
          <div>
            <span className={styles.subtitle}>Meet Our</span>
            <h2 className={styles.title}>Founder Director</h2>
          </div>
        </div>

        <p className={styles.description}>
          Krishi Chouriya is an accomplished artist and the founder of the studio. With
          a passion for creative expression, she brings artistic vision and leadership to
          every project.
        </p>

        <p className={styles.description}>
          Her work spans various mediums and styles, inspiring others to explore their
          own creative potential. As an artist, she believes in the transformative power
          of creativity and strives to make art accessible to everyone.
        </p>

        <Link href="/about" className={styles.knowMore}>
          <span className={styles.knowMoreIcon}>☐</span>
          Know More
        </Link>
      </motion.div>

      <motion.div
        className={styles.imageWrapper}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/images/krishi.jpeg"
          alt="Krishi Chouriya - Founder Director"
          fill
          className={styles.image}
        />
      </motion.div>
    </section>
  );
}
