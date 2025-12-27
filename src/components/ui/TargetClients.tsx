'use client';

import styles from './TargetClients.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

const targetIndustries = [
  {
    id: 1,
    title: 'Hotels',
    description: 'Elevate your hospitality spaces with premium furniture that combines comfort with elegant design.',
    image: '/images/industries/hotels.jpg',
  },
  {
    id: 2,
    title: 'Hospitals',
    description: 'Healthcare furniture designed for durability, hygiene, and patient comfort.',
    image: '/images/industries/hospitals.jpg',
  },
  {
    id: 3,
    title: 'Resorts',
    description: 'Bespoke furniture that captures the essence of luxury and relaxation.',
    image: '/images/industries/resorts.jpg',
  },
  {
    id: 4,
    title: 'Banquets',
    description: 'Versatile banquet furniture for intimate gatherings to grand celebrations.',
    image: '/images/industries/banquets.jpg',
  },
  {
    id: 5,
    title: 'Architects',
    description: 'Custom furniture solutions that complement your design philosophy.',
    image: '/images/industries/architects.jpg',
  },
  {
    id: 6,
    title: 'Interior Designers',
    description: 'Curated collection of premium pieces for your design projects.',
    image: '/images/industries/interior-designers.jpg',
  },
];

export default function TargetClients() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.stickyContent}>
            <h2 className={styles.title}>Who We Serve</h2>
            <p className={styles.description}>
              From luxury hotels to healthcare facilities, we partner with diverse industries
              to deliver exceptional furniture solutions tailored to their unique needs and vision.
            </p>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {targetIndustries.map((industry) => (
            <motion.div
              key={industry.id}
              className={styles.card}
              initial={{ opacity: 0.6, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className={styles.imageWrapper}
                whileInView={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{industry.title}</h3>
                <p className={styles.cardDescription}>{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
