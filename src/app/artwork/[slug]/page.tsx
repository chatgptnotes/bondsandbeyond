import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArtworkDetail from '@/components/shop/ArtworkDetail';
import { mockArtworks } from '@/data/mockArtworks';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = mockArtworks.find((a) => a.slug === slug);

  if (!artwork) {
    return {
      title: 'Artwork Not Found - bondsANDbeyond',
    };
  }

  return {
    title: `${artwork.title} by ${artwork.artist} - bondsANDbeyond`,
    description: artwork.description,
  };
}

export async function generateStaticParams() {
  return mockArtworks.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export default async function ArtworkPage({ params }: PageProps) {
  const { slug } = await params;
  const artwork = mockArtworks.find((a) => a.slug === slug);

  if (!artwork) {
    notFound();
  }

  // Get related artworks (same category, excluding current)
  const relatedArtworks = mockArtworks
    .filter((a) => a.category === artwork.category && a.id !== artwork.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <ArtworkDetail artwork={artwork} relatedArtworks={relatedArtworks} />
      <Footer />
    </>
  );
}
