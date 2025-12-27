'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import {
  Artwork,
  FilterState,
  Category,
  ArtworkType,
  PriceRange,
  ArtworkSize,
  ArtworkStyle,
  ArtworkColor,
  ArtworkMaterial,
  SortOption,
  CATEGORY_LABELS,
  CATEGORY_TYPES,
  PRICE_RANGE_LABELS,
  SIZE_LABELS,
  STYLE_LABELS,
  MATERIAL_LABELS,
  ALL_TYPES,
} from '@/types/artwork';
import {
  parseFiltersFromURL,
  filtersToURLParams,
  filterArtworks,
  sortArtworks,
  getDefaultFilters,
  countActiveFilters,
} from '@/lib/filterUtils';
import FilterSidebar from './FilterSidebar';
import MobileFilterDrawer from './MobileFilterDrawer';
import ArtworkGrid from './ArtworkGrid';
import SortDropdown from './SortDropdown';
import ActiveFilters from './ActiveFilters';
import FilterGroup from './FilterGroup';
import ColorFilter from './ColorFilter';
import styles from './ShopContent.module.css';

interface ShopContentProps {
  artworks: Artwork[];
}

export default function ShopContent({ artworks }: ShopContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams]
  );

  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = filtersToURLParams(newFilters);
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname]
  );

  const handleCategoryChange = useCallback(
    (category: Category | null) => {
      const newFilters: FilterState = {
        ...filters,
        category,
        types: [],
      };
      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  const handleTypeToggle = useCallback(
    (type: ArtworkType) => {
      const newTypes = filters.types.includes(type)
        ? filters.types.filter((t) => t !== type)
        : [...filters.types, type];
      updateURL({ ...filters, types: newTypes });
    },
    [filters, updateURL]
  );

  const handlePriceToggle = useCallback(
    (range: PriceRange) => {
      const newRanges = filters.priceRanges.includes(range)
        ? filters.priceRanges.filter((r) => r !== range)
        : [...filters.priceRanges, range];
      updateURL({ ...filters, priceRanges: newRanges });
    },
    [filters, updateURL]
  );

  const handleSizeToggle = useCallback(
    (size: ArtworkSize) => {
      const newSizes = filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size];
      updateURL({ ...filters, sizes: newSizes });
    },
    [filters, updateURL]
  );

  const handleStyleToggle = useCallback(
    (style: ArtworkStyle) => {
      const newStyles = filters.styles.includes(style)
        ? filters.styles.filter((s) => s !== style)
        : [...filters.styles, style];
      updateURL({ ...filters, styles: newStyles });
    },
    [filters, updateURL]
  );

  const handleColorToggle = useCallback(
    (color: ArtworkColor) => {
      const newColors = filters.colors.includes(color)
        ? filters.colors.filter((c) => c !== color)
        : [...filters.colors, color];
      updateURL({ ...filters, colors: newColors });
    },
    [filters, updateURL]
  );

  const handleMaterialToggle = useCallback(
    (material: ArtworkMaterial) => {
      const newMaterials = filters.materials.includes(material)
        ? filters.materials.filter((m) => m !== material)
        : [...filters.materials, material];
      updateURL({ ...filters, materials: newMaterials });
    },
    [filters, updateURL]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      updateURL({ ...filters, sort });
    },
    [filters, updateURL]
  );

  const handleClearAll = useCallback(() => {
    updateURL(getDefaultFilters());
  }, [updateURL]);

  const handleRemoveFilter = useCallback(
    (filterType: string, value: string) => {
      const newFilters = { ...filters };
      switch (filterType) {
        case 'category':
          newFilters.category = null;
          newFilters.types = [];
          break;
        case 'type':
          newFilters.types = filters.types.filter((t) => t !== value);
          break;
        case 'price':
          newFilters.priceRanges = filters.priceRanges.filter(
            (r) => r !== value
          );
          break;
        case 'size':
          newFilters.sizes = filters.sizes.filter((s) => s !== value);
          break;
        case 'style':
          newFilters.styles = filters.styles.filter((s) => s !== value);
          break;
        case 'color':
          newFilters.colors = filters.colors.filter((c) => c !== value);
          break;
        case 'material':
          newFilters.materials = filters.materials.filter((m) => m !== value);
          break;
      }
      updateURL(newFilters);
    },
    [filters, updateURL]
  );

  const filteredArtworks = useMemo(
    () => filterArtworks(artworks, filters),
    [artworks, filters]
  );

  const sortedArtworks = useMemo(
    () => sortArtworks(filteredArtworks, filters.sort),
    [filteredArtworks, filters.sort]
  );

  const activeFilterCount = countActiveFilters(filters);

  const categories = Object.keys(CATEGORY_LABELS) as Category[];
  const priceRanges = Object.keys(PRICE_RANGE_LABELS) as PriceRange[];
  const sizes = Object.keys(SIZE_LABELS) as ArtworkSize[];
  const artworkStyles = Object.keys(STYLE_LABELS) as ArtworkStyle[];
  const materials = Object.keys(MATERIAL_LABELS) as ArtworkMaterial[];
  const availableTypes = filters.category
    ? CATEGORY_TYPES[filters.category]
    : ALL_TYPES;

  const mobileFilterContent = (
    <>
      <FilterGroup title="Category" count={filters.category ? 1 : 0}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="mobile-category"
            checked={filters.category === null}
            onChange={() => handleCategoryChange(null)}
            className={styles.radio}
          />
          <span>All Categories</span>
        </label>
        {categories.map((cat) => (
          <label key={cat} className={styles.radioLabel}>
            <input
              type="radio"
              name="mobile-category"
              checked={filters.category === cat}
              onChange={() => handleCategoryChange(cat)}
              className={styles.radio}
            />
            <span>{CATEGORY_LABELS[cat]}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Type" count={filters.types.length}>
        {availableTypes.map((typeOption) => (
          <label key={typeOption.value} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.types.includes(typeOption.value)}
              onChange={() => handleTypeToggle(typeOption.value)}
              className={styles.checkbox}
            />
            <span>{typeOption.label}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range" count={filters.priceRanges.length}>
        {priceRanges.map((range) => (
          <label key={range} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.priceRanges.includes(range)}
              onChange={() => handlePriceToggle(range)}
              className={styles.checkbox}
            />
            <span>{PRICE_RANGE_LABELS[range]}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Size" count={filters.sizes.length}>
        {sizes.map((size) => (
          <label key={size} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.sizes.includes(size)}
              onChange={() => handleSizeToggle(size)}
              className={styles.checkbox}
            />
            <span>{SIZE_LABELS[size]}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Style" count={filters.styles.length}>
        {artworkStyles.map((style) => (
          <label key={style} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.styles.includes(style)}
              onChange={() => handleStyleToggle(style)}
              className={styles.checkbox}
            />
            <span>{STYLE_LABELS[style]}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Color" count={filters.colors.length}>
        <ColorFilter selected={filters.colors} onChange={handleColorToggle} />
      </FilterGroup>

      <FilterGroup title="Material" count={filters.materials.length}>
        {materials.map((material) => (
          <label key={material} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.materials.includes(material)}
              onChange={() => handleMaterialToggle(material)}
              className={styles.checkbox}
            />
            <span>{MATERIAL_LABELS[material]}</span>
          </label>
        ))}
      </FilterGroup>
    </>
  );

  return (
    <div className={styles.container}>
      <FilterSidebar
        filters={filters}
        onCategoryChange={handleCategoryChange}
        onTypeToggle={handleTypeToggle}
        onPriceToggle={handlePriceToggle}
        onSizeToggle={handleSizeToggle}
        onStyleToggle={handleStyleToggle}
        onColorToggle={handleColorToggle}
        onMaterialToggle={handleMaterialToggle}
        onClearAll={handleClearAll}
      />

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              className={styles.mobileFilterBtn}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className={styles.filterBadge}>{activeFilterCount}</span>
              )}
            </button>
            <p className={styles.resultCount}>
              {sortedArtworks.length}{' '}
              {sortedArtworks.length === 1 ? 'artwork' : 'artworks'}
            </p>
          </div>
          <SortDropdown value={filters.sort} onChange={handleSortChange} />
        </div>

        <ActiveFilters
          filters={filters}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAll}
        />

        <ArtworkGrid artworks={sortedArtworks} />
      </main>

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        {mobileFilterContent}
      </MobileFilterDrawer>
    </div>
  );
}
