'use client';

import { SortOption, SORT_OPTIONS } from '@/types/artwork';
import styles from './SortDropdown.module.css';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="sort-select">
        Sort by:
      </label>
      <select
        id="sort-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
