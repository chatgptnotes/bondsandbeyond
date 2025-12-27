import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  FilterState,
  Artwork,
  SortOption,
  PriceRange,
  ArtworkType,
  ArtworkSize,
  ArtworkStyle,
  ArtworkColor,
  ArtworkMaterial,
  Category,
  PRICE_RANGE_LABELS,
  SIZE_LABELS,
  STYLE_LABELS,
  MATERIAL_LABELS,
  CATEGORY_LABELS,
  ALL_TYPES,
} from '@/types/artwork';

export function parseFiltersFromURL(searchParams: ReadonlyURLSearchParams): FilterState {
  return {
    category: searchParams.get('category') as Category | null,
    types: parseArrayParam(searchParams.get('type')) as ArtworkType[],
    priceRanges: parseArrayParam(searchParams.get('price')) as PriceRange[],
    sizes: parseArrayParam(searchParams.get('size')) as ArtworkSize[],
    styles: parseArrayParam(searchParams.get('style')) as ArtworkStyle[],
    colors: parseArrayParam(searchParams.get('color')) as ArtworkColor[],
    materials: parseArrayParam(searchParams.get('material')) as ArtworkMaterial[],
    sort: (searchParams.get('sort') as SortOption) || 'recommended',
  };
}

export function filtersToURLParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.category) params.set('category', filters.category);
  if (filters.types.length) params.set('type', filters.types.join(','));
  if (filters.priceRanges.length) params.set('price', filters.priceRanges.join(','));
  if (filters.sizes.length) params.set('size', filters.sizes.join(','));
  if (filters.styles.length) params.set('style', filters.styles.join(','));
  if (filters.colors.length) params.set('color', filters.colors.join(','));
  if (filters.materials.length) params.set('material', filters.materials.join(','));
  if (filters.sort !== 'recommended') params.set('sort', filters.sort);

  return params;
}

function parseArrayParam(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').filter(Boolean);
}

export function filterArtworks(artworks: Artwork[], filters: FilterState): Artwork[] {
  return artworks.filter((artwork) => {
    if (filters.category && artwork.category !== filters.category) return false;

    if (filters.types.length && !filters.types.includes(artwork.type)) return false;

    if (filters.priceRanges.length) {
      const matchesPrice = filters.priceRanges.some((range) =>
        isInPriceRange(artwork.price, range)
      );
      if (!matchesPrice) return false;
    }

    if (filters.sizes.length && !filters.sizes.includes(artwork.size)) return false;

    if (filters.styles.length && !filters.styles.includes(artwork.style)) return false;

    if (filters.colors.length) {
      const hasMatchingColor = artwork.colors.some((c) => filters.colors.includes(c));
      if (!hasMatchingColor) return false;
    }

    if (filters.materials.length && !filters.materials.includes(artwork.material)) return false;

    return true;
  });
}

function isInPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case 'under-10k':
      return price < 10000;
    case '10k-50k':
      return price >= 10000 && price < 50000;
    case '50k-1l':
      return price >= 50000 && price < 100000;
    case '1l-5l':
      return price >= 100000 && price < 500000;
    case 'above-5l':
      return price >= 500000;
    default:
      return true;
  }
}

export function sortArtworks(artworks: Artwork[], sort: SortOption): Artwork[] {
  const sorted = [...artworks];

  switch (sort) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'price-low-high':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sorted.sort((a, b) => b.price - a.price);
    case 'recommended':
    default:
      return sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
}

export function getDefaultFilters(): FilterState {
  return {
    category: null,
    types: [],
    priceRanges: [],
    sizes: [],
    styles: [],
    colors: [],
    materials: [],
    sort: 'recommended',
  };
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.category) count++;
  count += filters.types.length;
  count += filters.priceRanges.length;
  count += filters.sizes.length;
  count += filters.styles.length;
  count += filters.colors.length;
  count += filters.materials.length;
  return count;
}

export interface FilterTag {
  type: string;
  value: string;
  label: string;
}

export function buildFilterTags(filters: FilterState): FilterTag[] {
  const tags: FilterTag[] = [];

  if (filters.category) {
    tags.push({
      type: 'category',
      value: filters.category,
      label: CATEGORY_LABELS[filters.category],
    });
  }

  filters.types.forEach((type) => {
    const typeInfo = ALL_TYPES.find((t) => t.value === type);
    tags.push({
      type: 'type',
      value: type,
      label: typeInfo?.label || type,
    });
  });

  filters.priceRanges.forEach((range) => {
    tags.push({
      type: 'price',
      value: range,
      label: PRICE_RANGE_LABELS[range],
    });
  });

  filters.sizes.forEach((size) => {
    tags.push({
      type: 'size',
      value: size,
      label: SIZE_LABELS[size],
    });
  });

  filters.styles.forEach((style) => {
    tags.push({
      type: 'style',
      value: style,
      label: STYLE_LABELS[style],
    });
  });

  filters.colors.forEach((color) => {
    tags.push({
      type: 'color',
      value: color,
      label: color.charAt(0).toUpperCase() + color.slice(1),
    });
  });

  filters.materials.forEach((material) => {
    tags.push({
      type: 'material',
      value: material,
      label: MATERIAL_LABELS[material],
    });
  });

  return tags;
}
