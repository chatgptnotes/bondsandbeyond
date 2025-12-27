
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// This would typically come from a CMS or Supabase
const CLIENT_DATA: Record<string, { title: string; description: string; services: string[] }> = {
    hotels: {
        title: "Art for Hotels & Resorts",
        description: "Elevate your guest experience with bespoke art installations that define your brand's unique identity.",
        services: ["Lobby Sculptures", "Room Artwork", "Corridor Murals"]
    },
    hospitals: {
        title: "Art for Healthcare",
        description: "Creating healing environments through soothing, biophilic, and therapeutic art curations.",
        services: ["Waiting Area Art", "Patient Room Serenity", "Wayfinding Murals"]
    },
    architects: {
        title: "Partnerships with Architects",
        description: "We work alongside you to integrate art into the very fabric of your structural designs.",
        services: ["Site-specific Installations", "Integrated Sculptures", "Material Consultation"]
    },
    "interior-designers": {
        title: "For Interior Designers",
        description: "The finishing touch that brings your vision to life. Custom colors, sizes, and textures.",
        services: ["Custom Color Matching", "Texture Painting", "Bespoke Commissions"]
    },
    banquets: {
        title: "Banquet Halls & Events",
        description: "Grand statements for grand events. Durable, impactful art for high-traffic luxury spaces.",
        services: ["Statement Walls", "FRP Murals", "Ceiling Art"]
    }
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const data = CLIENT_DATA[slug];
    if (!data) return { title: 'Client Not Found' };

    return {
        title: `${data.title} | bondsANDbeyond`,
        description: data.description,
    };
}

export default async function ClientPage({ params }: Props) {
    const { slug } = await params;
    const data = CLIENT_DATA[slug];

    if (!data) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>{data.title}</h1>
                        <p className={styles.description}>{data.description}</p>
                    </div>
                </section>

                <section className={styles.content}>
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>Tailored Services</h2>
                        <ul className={styles.serviceList}>
                            {data.services.map((service, index) => (
                                <li key={index} className={styles.serviceItem}>{service}</li>
                            ))}
                        </ul>

                        <div className={styles.cta}>
                            <Link href="/contact" className={styles.button}>Request Consultation</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
