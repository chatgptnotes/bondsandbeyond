'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ServiceGrid.module.css';

const services = [
    {
        title: "Oil Paintings",
        description: "Modern, Abstract, & Textured",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=paintings&type=oil"
    },
    {
        title: "Portraits",
        description: "Bespoke commissioned portraits",
        image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=paintings&type=portraits"
    },
    {
        title: "Wall Murals",
        description: "FRP & Hand-painted Wall Art",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=sculptures&type=frp-mural"
    },
    {
        title: "Sculptures",
        description: "3D & Lippan Art",
        image: "https://images.unsplash.com/photo-1553531580-652231dae097?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=sculptures"
    },
    {
        title: "Furniture Art",
        description: "Hand-painted bespoke furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=drawings&type=furniture"
    },
    {
        title: "Site Work",
        description: "On-location installations",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=sculptures&type=installations"
    }
];

export default function ServiceGrid() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Our Expertise</h2>
                <p className={styles.description}>
                    From canvas to concrete, we transform surfaces into expressions of art.
                </p>
            </div>

            <div className={styles.grid}>
                {services.map((service, index) => (
                    <Link key={index} href={service.href} className={styles.card}>
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.cardImage}
                        />
                        <div className={styles.overlay}>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDesc}>{service.description}</p>
                        </div>
                    </Link>
                ))}

                {/* Shop All Card */}
                <Link href="/shop" className={styles.shopAllCard}>
                    <div className={styles.shopAllContent}>
                        <h3 className={styles.shopAllTitle}>Shop All</h3>
                        <p className={styles.shopAllDesc}>Browse our complete collection</p>
                        <div className={styles.shopAllArrow}>
                            <ArrowRight size={24} />
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
