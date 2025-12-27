'use client';

import { X } from 'lucide-react';
import { FilterState } from '@/types/artwork';
import { buildFilterTags, FilterTag } from '@/lib/filterUtils';
import styles from './ActiveFilters.module.css';

interface ActiveFiltersProps {
  filters: FilterState;
  onRemove: (filterType: string, value: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const tags: FilterTag[] = buildFilterTags(filters);

  if (tags.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <button
            key={`${tag.type}-${tag.value}`}
            className={styles.tag}
            onClick={() => onRemove(tag.type, tag.value)}
            aria-label={`Remove ${tag.label} filter`}
          >
            <span className={styles.tagLabel}>{tag.label}</span>
            <X size={14} className={styles.tagIcon} />
          </button>
        ))}
      </div>
      <button className={styles.clearAll} onClick={onClearAll}>
        Clear All
      </button>
    </div>
  );
}
