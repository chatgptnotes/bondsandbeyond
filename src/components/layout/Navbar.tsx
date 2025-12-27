'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const menuItems = {
    paintings: {
        title: 'Paintings',
        href: '/shop?category=paintings',
        items: [
            { name: 'All Paintings', href: '/shop?category=paintings' },
            { name: 'Oil Paintings', href: '/shop?category=paintings&type=oil' },
            { name: 'Modern Art', href: '/shop?category=paintings&type=modern' },
            { name: 'Abstract Art', href: '/shop?category=paintings&type=abstract' },
            { name: 'Texture Painting', href: '/shop?category=paintings&type=texture' },
            { name: 'Portraits', href: '/shop?category=paintings&type=portraits' },
            { name: 'Lippan Art', href: '/shop?category=paintings&type=lippan' },
            { name: 'Wall Art', href: '/shop?category=paintings&type=wall-art' },
        ]
    },
    sculptures: {
        title: 'Sculptures',
        href: '/shop?category=sculptures',
        items: [
            { name: 'All Sculptures', href: '/shop?category=sculptures' },
            { name: 'FRP Mural', href: '/shop?category=sculptures&type=frp-mural' },
            { name: '3D Sculptures', href: '/shop?category=sculptures&type=3d' },
            { name: 'Metal Sculptures', href: '/shop?category=sculptures&type=metal' },
            { name: 'Custom Installations', href: '/shop?category=sculptures&type=installations' },
        ]
    },
    drawings: {
        title: 'Drawings',
        href: '/shop?category=drawings',
        items: [
            { name: 'All Drawings', href: '/shop?category=drawings' },
            { name: 'Furniture Painting', href: '/shop?category=drawings&type=furniture' },
            { name: 'Fabric Painting', href: '/shop?category=drawings&type=fabric' },
            { name: 'Pencil Sketches', href: '/shop?category=drawings&type=sketches' },
            { name: 'Custom Artwork', href: '/shop?category=drawings&type=custom' },
        ]
    }
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    <span>bondsANDbeyond</span>
                    <span className={styles.byline}>--by krishi</span>
                </Link>

                <nav className={styles.navLinks}>
                    {Object.entries(menuItems).map(([key, menu]) => (
                        <div
                            key={key}
                            className={styles.dropdownWrapper}
                            onMouseEnter={() => setActiveDropdown(key)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link href={menu.href} className={styles.dropdownTrigger}>
                                {menu.title}
                                <ChevronDown size={14} className={styles.chevron} />
                            </Link>

                            <div className={clsx(
                                styles.dropdown,
                                activeDropdown === key && styles.dropdownActive
                            )}>
                                <div className={styles.dropdownContent}>
                                    {menu.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={styles.dropdownItem}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link href="/clients" className={styles.link}>Clients</Link>
                    <Link href="/gallery" className={styles.link}>Gallery</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/contact" className={styles.ctaButton}>
                        Get in Touch
                    </Link>
                </nav>
            </div>
        </header>
    );
}
