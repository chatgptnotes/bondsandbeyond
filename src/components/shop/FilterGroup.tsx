'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './FilterGroup.module.css';

interface FilterGroupProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function FilterGroup({
  title,
  count = 0,
  defaultOpen = true,
  children,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.group}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>
          {title}
          {count > 0 && <span className={styles.count}>{count}</span>}
        </span>
        <ChevronDown
          size={16}
          className={clsx(styles.chevron, isOpen && styles.open)}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={styles.contentWrapper}
          >
            <div className={styles.content}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
