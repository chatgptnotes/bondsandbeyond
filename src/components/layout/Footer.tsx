
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>bondsANDbeyond</h3>
                        <p>
                            Curating exceptional art experiences for hospitality, healthcare, and architectural spaces.
                            Converting walls into masterpieces.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4>Services</h4>
                        <div className={styles.links}>
                            <Link href="/services/oil-paintings">Oil Paintings</Link>
                            <Link href="/services/murals">FRP & Wall Murals</Link>
                            <Link href="/services/sculptures">3D Sculptures</Link>
                            <Link href="/services/portraits">Portraits</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Clients</h4>
                        <div className={styles.links}>
                            <Link href="/clients/hotels">Hotels</Link>
                            <Link href="/clients/hospitals">Hospitals</Link>
                            <Link href="/clients/architects">Architects</Link>
                            <Link href="/clients/designers">Interior Designers</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Connect</h4>
                        <div className={styles.links}>
                            <a href="mailto:hello@bondsandbeyond.com">Contact Us</a>
                            <a href="#">Instagram</a>
                            <a href="#">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <span className={styles.copyright}>© {new Date().getFullYear()} bondsANDbeyond. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
