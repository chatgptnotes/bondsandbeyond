'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './MobileFilterDrawer.module.css';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  children,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Filters</h2>
              <button
                onClick={onClose}
                className={styles.closeBtn}
                aria-label="Close filters"
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.content}>{children}</div>
            <div className={styles.footer}>
              <button className={styles.applyBtn} onClick={onClose}>
                Apply Filters
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
