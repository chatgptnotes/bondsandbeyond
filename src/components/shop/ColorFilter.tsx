'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';
import { ArtworkColor, COLOR_HEX } from '@/types/artwork';
import styles from './ColorFilter.module.css';

interface ColorFilterProps {
  selected: ArtworkColor[];
  onChange: (color: ArtworkColor) => void;
}

export default function ColorFilter({ selected, onChange }: ColorFilterProps) {
  const colors = Object.keys(COLOR_HEX) as ArtworkColor[];

  return (
    <div className={styles.grid}>
      {colors.map((color) => {
        const isSelected = selected.includes(color);
        const hexColor = COLOR_HEX[color];
        const isLight = ['white', 'yellow', 'neutral'].includes(color);

        return (
          <button
            key={color}
            className={clsx(styles.swatch, isSelected && styles.selected)}
            style={{ backgroundColor: hexColor }}
            onClick={() => onChange(color)}
            aria-label={`${color}${isSelected ? ' (selected)' : ''}`}
            title={color.charAt(0).toUpperCase() + color.slice(1)}
          >
            {isSelected && (
              <Check
                size={14}
                className={clsx(styles.check, isLight && styles.checkDark)}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
