'use client';

import {
  Category,
  ArtworkType,
  PriceRange,
  ArtworkSize,
  ArtworkStyle,
  ArtworkColor,
  ArtworkMaterial,
  FilterState,
  CATEGORY_LABELS,
  CATEGORY_TYPES,
  PRICE_RANGE_LABELS,
  SIZE_LABELS,
  STYLE_LABELS,
  MATERIAL_LABELS,
  ALL_TYPES,
} from '@/types/artwork';
import FilterGroup from './FilterGroup';
import ColorFilter from './ColorFilter';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  filters: FilterState;
  onCategoryChange: (category: Category | null) => void;
  onTypeToggle: (type: ArtworkType) => void;
  onPriceToggle: (range: PriceRange) => void;
  onSizeToggle: (size: ArtworkSize) => void;
  onStyleToggle: (style: ArtworkStyle) => void;
  onColorToggle: (color: ArtworkColor) => void;
  onMaterialToggle: (material: ArtworkMaterial) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  filters,
  onCategoryChange,
  onTypeToggle,
  onPriceToggle,
  onSizeToggle,
  onStyleToggle,
  onColorToggle,
  onMaterialToggle,
  onClearAll,
}: FilterSidebarProps) {
  const categories = Object.keys(CATEGORY_LABELS) as Category[];
  const priceRanges = Object.keys(PRICE_RANGE_LABELS) as PriceRange[];
  const sizes = Object.keys(SIZE_LABELS) as ArtworkSize[];
  const artworkStyles = Object.keys(STYLE_LABELS) as ArtworkStyle[];
  const materials = Object.keys(MATERIAL_LABELS) as ArtworkMaterial[];

  const availableTypes = filters.category
    ? CATEGORY_TYPES[filters.category]
    : ALL_TYPES;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button className={styles.clearBtn} onClick={onClearAll}>
          Clear All
        </button>
      </div>

      <div className={styles.filters}>
        <FilterGroup
          title="Category"
          count={filters.category ? 1 : 0}
        >
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="category"
              checked={filters.category === null}
              onChange={() => onCategoryChange(null)}
              className={styles.radio}
            />
            <span>All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className={styles.radioLabel}>
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onCategoryChange(cat)}
                className={styles.radio}
              />
              <span>{CATEGORY_LABELS[cat]}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup
          title="Type"
          count={filters.types.length}
        >
          {availableTypes.map((typeOption) => (
            <label key={typeOption.value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.types.includes(typeOption.value)}
                onChange={() => onTypeToggle(typeOption.value)}
                className={styles.checkbox}
              />
              <span>{typeOption.label}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup
          title="Price Range"
          count={filters.priceRanges.length}
        >
          {priceRanges.map((range) => (
            <label key={range} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.priceRanges.includes(range)}
                onChange={() => onPriceToggle(range)}
                className={styles.checkbox}
              />
              <span>{PRICE_RANGE_LABELS[range]}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup
          title="Size"
          count={filters.sizes.length}
        >
          {sizes.map((size) => (
            <label key={size} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => onSizeToggle(size)}
                className={styles.checkbox}
              />
              <span>{SIZE_LABELS[size]}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup
          title="Style"
          count={filters.styles.length}
        >
          {artworkStyles.map((style) => (
            <label key={style} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.styles.includes(style)}
                onChange={() => onStyleToggle(style)}
                className={styles.checkbox}
              />
              <span>{STYLE_LABELS[style]}</span>
            </label>
          ))}
        </FilterGroup>

        <FilterGroup
          title="Color"
          count={filters.colors.length}
        >
          <ColorFilter
            selected={filters.colors}
            onChange={onColorToggle}
          />
        </FilterGroup>

        <FilterGroup
          title="Material"
          count={filters.materials.length}
        >
          {materials.map((material) => (
            <label key={material} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.materials.includes(material)}
                onChange={() => onMaterialToggle(material)}
                className={styles.checkbox}
              />
              <span>{MATERIAL_LABELS[material]}</span>
            </label>
          ))}
        </FilterGroup>
      </div>
    </aside>
  );
}
