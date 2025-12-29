import { Suspense } from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShopContent from '@/components/shop/ShopContent';
import { mockArtworks } from '@/data/mockArtworks';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Shop - bondsNbeyond | Original Art & Sculptures',
  description:
    'Browse our collection of original paintings, sculptures, and custom artwork. Filter by category, style, price, and more.',
};

function ShopLoading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner} />
      <p>Loading artworks...</p>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Shop Original Art</h1>
            <p className={styles.subtitle}>
              Discover unique paintings, sculptures, and custom artwork crafted by talented artists
            </p>
          </div>
        </header>

        <section className={styles.content}>
          <Suspense fallback={<ShopLoading />}>
            <ShopContent artworks={mockArtworks} />
          </Suspense>
        </section>
      </div>
      <Footer />
    </>
  );
}
