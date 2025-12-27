'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Artwork, CATEGORY_LABELS } from '@/types/artwork';
import styles from './ArtworkCard.module.css';

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(artwork.price);

  return (
    <Link href={`/artwork/${artwork.slug}`} className={styles.card}>
      <motion.div
        className={styles.imageWrapper}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={artwork.thumbnail}
          alt={artwork.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <span className={styles.categoryBadge}>
          {CATEGORY_LABELS[artwork.category]}
        </span>
        {artwork.isFeatured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
      </motion.div>
      <div className={styles.info}>
        <h3 className={styles.title}>{artwork.title}</h3>
        <p className={styles.artist}>by {artwork.artist}</p>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
    </Link>
  );
}
