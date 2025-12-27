'use client';

import { motion } from 'framer-motion';
import { Artwork } from '@/types/artwork';
import ArtworkCard from './ArtworkCard';
import styles from './ArtworkGrid.module.css';

interface ArtworkGridProps {
  artworks: Artwork[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>No artworks found</h3>
        <p className={styles.emptyText}>Try adjusting your filters to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {artworks.map((artwork) => (
        <motion.div key={artwork.id} variants={itemVariants}>
          <ArtworkCard artwork={artwork} />
        </motion.div>
      ))}
    </motion.div>
  );
}
