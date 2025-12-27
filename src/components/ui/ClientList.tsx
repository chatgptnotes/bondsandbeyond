
import { Building2, Hotel, Stethoscope, PencilRuler, Paintbrush } from 'lucide-react';
import styles from './ClientList.module.css';

const clients = [
    {
        title: "Hotels & Resorts",
        icon: <Hotel size={24} />,
        description: "Creating immersive lobbies and guest experiences through large-scale art."
    },
    {
        title: "Hospitals",
        icon: <Stethoscope size={24} />,
        description: "Healing environments with soothing, therapeutic art installations."
    },
    {
        title: "Architects",
        icon: <Building2 size={24} />,
        description: "Partnering to integrate art directly into the structural design."
    },
    {
        title: "Interior Designers",
        icon: <PencilRuler size={24} />,
        description: "Bespoke pieces that perfectly complement your interior vision."
    },
    {
        title: "Banquets",
        icon: <Paintbrush size={24} />, // Using general art icon for now
        description: "Grand aesthetic statements for event spaces and ballrooms."
    }
];

export default function ClientList() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Industries We Serve</h2>
                    <span className={styles.subtitle}>Our Partners</span>
                </div>

                <div className={styles.list}>
                    {clients.map((client, index) => (
                        <div key={index} className={styles.clientType}>
                            <div className={styles.iconWrapper}>
                                {client.icon}
                            </div>
                            <h3 className={styles.clientTitle}>{client.title}</h3>
                            <p className={styles.clientDesc}>{client.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
