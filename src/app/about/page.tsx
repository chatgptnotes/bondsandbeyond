'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>Where Vision Meets Craftsmanship</p>
        </motion.div>
      </section>

      <section className={styles.studioSection}>
        <motion.div
          className={styles.studioContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.studioTitle}>Our Studio</h2>
          <p className={styles.studioDescription}>
            bondsNbeyond is a premium art studio specializing in custom artwork for
            commercial and residential spaces. We create paintings, sculptures, murals,
            and installations that transform environments and tell unique stories.
          </p>
          <p className={styles.studioDescription}>
            Our team of skilled artists works closely with clients to understand their
            vision and deliver artwork that exceeds expectations. From concept to
            installation, we ensure every piece is crafted with precision and care.
          </p>
        </motion.div>
      </section>

      <section className={styles.founderSection}>
        <motion.div
          className={styles.founderImage}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/krishi.jpeg"
            alt="Krishi Chouriya - Founder Director"
            fill
            className={styles.image}
          />
        </motion.div>

        <motion.div
          className={styles.founderContent}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.titleWrapper}>
            <div className={styles.accentBar} />
            <div>
              <span className={styles.subtitle}>Meet Our</span>
              <h2 className={styles.title}>Founder Director</h2>
            </div>
          </div>

          <h3 className={styles.founderName}>Krishi Chouriya</h3>

          <p className={styles.description}>
            Krishi Chouriya is an accomplished artist and the founder of bondsNbeyond.
            With a passion for creative expression that spans over a decade, she brings
            artistic vision and leadership to every project undertaken by the studio.
          </p>

          <p className={styles.description}>
            Her work spans various mediums and styles, from traditional oil paintings to
            contemporary sculptures and custom installations. Krishi believes in the
            transformative power of art and its ability to elevate spaces and inspire emotions.
          </p>

          <p className={styles.description}>
            Under her guidance, bondsNbeyond has collaborated with leading hotels, hospitals,
            and architectural firms to create bespoke artwork that perfectly complements
            each unique space.
          </p>
        </motion.div>
      </section>

      <section className={styles.valuesSection}>
        <motion.h2
          className={styles.valuesTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Values
        </motion.h2>

        <div className={styles.valuesGrid}>
          {[
            { title: 'Craftsmanship', desc: 'Every piece is handcrafted with meticulous attention to detail and quality.' },
            { title: 'Innovation', desc: 'We blend traditional techniques with contemporary design sensibilities.' },
            { title: 'Collaboration', desc: 'We work closely with clients to bring their unique visions to life.' },
            { title: 'Excellence', desc: 'We are committed to delivering artwork that exceeds expectations.' },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDesc}>{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
