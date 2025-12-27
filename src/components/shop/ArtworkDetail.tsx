'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Eye
} from 'lucide-react';
import {
  Artwork,
  CATEGORY_LABELS,
  SIZE_LABELS,
  STYLE_LABELS,
  MATERIAL_LABELS,
} from '@/types/artwork';
import ArtworkCard from './ArtworkCard';
import styles from './ArtworkDetail.module.css';

interface ArtworkDetailProps {
  artwork: Artwork;
  relatedArtworks: Artwork[];
}

export default function ArtworkDetail({ artwork, relatedArtworks }: ArtworkDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(artwork.price);

  const dimensionsText = artwork.dimensions.depth
    ? `${artwork.dimensions.width}" W x ${artwork.dimensions.height}" H x ${artwork.dimensions.depth}" D`
    : `${artwork.dimensions.width}" W x ${artwork.dimensions.height}" H`;

  // Generate random viewer count for social proof
  const viewerCount = Math.floor(Math.random() * 5) + 2;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbContent}>
          <Link href="/shop" className={styles.backLink}>
            <ChevronLeft size={18} />
            <span>Back to Shop</span>
          </Link>
          <div className={styles.breadcrumbPath}>
            <Link href="/shop">All Artworks</Link>
            <span>/</span>
            <Link href={`/shop?category=${artwork.category}`}>
              {CATEGORY_LABELS[artwork.category]}
            </Link>
            <span>/</span>
            <span className={styles.currentPage}>{artwork.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {artwork.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${index === selectedImage ? styles.thumbnailActive : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${artwork.title} - View ${index + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
            <motion.div
              className={styles.mainImage}
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={artwork.images[selectedImage]}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                priority
              />
              {artwork.isFeatured && (
                <span className={styles.featuredBadge}>Featured</span>
              )}
            </motion.div>
          </div>

          {/* Artwork Info */}
          <div className={styles.info}>
            <div className={styles.infoHeader}>
              <div>
                <h1 className={styles.title}>{artwork.title}</h1>
                <p className={styles.artist}>
                  by <span className={styles.artistName}>{artwork.artist}</span>
                </p>
              </div>
              <div className={styles.actions}>
                <button
                  className={`${styles.actionBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className={styles.actionBtn} aria-label="Share">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Category</span>
                <span className={styles.detailValue}>{CATEGORY_LABELS[artwork.category]}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Medium</span>
                <span className={styles.detailValue}>{MATERIAL_LABELS[artwork.material]}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Size</span>
                <span className={styles.detailValue}>
                  {SIZE_LABELS[artwork.size]} ({dimensionsText})
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Style</span>
                <span className={styles.detailValue}>{STYLE_LABELS[artwork.style]}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className={styles.priceSection}>
              <div className={styles.price}>{formattedPrice}</div>
              <div className={styles.viewerCount}>
                <Eye size={16} />
                <span>{viewerCount} people are viewing this artwork</span>
              </div>
            </div>

            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Enquire Now
              </button>
              <button className={styles.secondaryBtn}>
                Request Custom Size
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <Truck size={18} />
                <span>Free Shipping</span>
              </div>
              <div className={styles.badge}>
                <Shield size={18} />
                <span>Secure Payment</span>
              </div>
              <div className={styles.badge}>
                <RotateCcw size={18} />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* Description */}
            <div className={styles.description}>
              <h3 className={styles.descriptionTitle}>About this Artwork</h3>
              <p className={styles.descriptionText}>{artwork.description}</p>
            </div>

            {/* Tags */}
            {artwork.tags.length > 0 && (
              <div className={styles.tags}>
                {artwork.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Availability */}
            <div className={styles.availability}>
              <Check size={16} />
              <span>{artwork.isAvailable ? 'Available for purchase' : 'Currently unavailable'}</span>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedArtworks.map((related) => (
                <ArtworkCard key={related.id} artwork={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
