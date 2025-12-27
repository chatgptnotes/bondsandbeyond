export type Category = 'paintings' | 'sculptures' | 'drawings';

export type PaintingType = 'oil' | 'modern' | 'abstract' | 'texture' | 'portraits' | 'lippan' | 'wall-art';
export type SculptureType = 'frp-mural' | '3d' | 'metal' | 'installations';
export type DrawingType = 'furniture' | 'fabric' | 'sketches' | 'custom';

export type ArtworkType = PaintingType | SculptureType | DrawingType;

export type PriceRange = 'under-10k' | '10k-50k' | '50k-1l' | '1l-5l' | 'above-5l';

export type ArtworkSize = 'small' | 'medium' | 'large' | 'extra-large';

export type ArtworkStyle = 'abstract' | 'modern' | 'traditional' | 'contemporary' | 'minimalist';

export type ArtworkColor = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'pink' | 'brown' | 'black' | 'white' | 'gold' | 'silver' | 'neutral';

export type ArtworkMaterial = 'canvas' | 'paper' | 'metal' | 'frp' | 'wood' | 'mixed-media' | 'fabric';

export type SortOption = 'recommended' | 'newest' | 'price-low-high' | 'price-high-low';

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  artist: string;
  category: Category;
  type: ArtworkType;
  price: number;
  images: string[];
  thumbnail: string;
  size: ArtworkSize;
  dimensions: {
    width: number;
    height: number;
    depth?: number;
  };
  style: ArtworkStyle;
  colors: ArtworkColor[];
  material: ArtworkMaterial;
  description: string;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: string;
  tags: string[];
}

export interface FilterState {
  category: Category | null;
  types: ArtworkType[];
  priceRanges: PriceRange[];
  sizes: ArtworkSize[];
  styles: ArtworkStyle[];
  colors: ArtworkColor[];
  materials: ArtworkMaterial[];
  sort: SortOption;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  paintings: 'Paintings',
  sculptures: 'Sculptures',
  drawings: 'Drawings',
};

export const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  'under-10k': 'Under ₹10,000',
  '10k-50k': '₹10,000 - ₹50,000',
  '50k-1l': '₹50,000 - ₹1,00,000',
  '1l-5l': '₹1,00,000 - ₹5,00,000',
  'above-5l': 'Above ₹5,00,000',
};

export const SIZE_LABELS: Record<ArtworkSize, string> = {
  small: 'Small (< 24")',
  medium: 'Medium (24" - 48")',
  large: 'Large (48" - 72")',
  'extra-large': 'Extra Large (> 72")',
};

export const STYLE_LABELS: Record<ArtworkStyle, string> = {
  abstract: 'Abstract',
  modern: 'Modern',
  traditional: 'Traditional',
  contemporary: 'Contemporary',
  minimalist: 'Minimalist',
};

export const COLOR_HEX: Record<ArtworkColor, string> = {
  red: '#E53935',
  blue: '#1E88E5',
  green: '#43A047',
  yellow: '#FDD835',
  orange: '#FB8C00',
  purple: '#8E24AA',
  pink: '#D81B60',
  brown: '#6D4C41',
  black: '#212121',
  white: '#FAFAFA',
  gold: '#C5A059',
  silver: '#9E9E9E',
  neutral: '#A1887F',
};

export const MATERIAL_LABELS: Record<ArtworkMaterial, string> = {
  canvas: 'Canvas',
  paper: 'Paper',
  metal: 'Metal',
  frp: 'FRP (Fiberglass)',
  wood: 'Wood',
  'mixed-media': 'Mixed Media',
  fabric: 'Fabric',
};

export const CATEGORY_TYPES: Record<Category, { value: ArtworkType; label: string }[]> = {
  paintings: [
    { value: 'oil', label: 'Oil Paintings' },
    { value: 'modern', label: 'Modern Art' },
    { value: 'abstract', label: 'Abstract Art' },
    { value: 'texture', label: 'Texture Painting' },
    { value: 'portraits', label: 'Portraits' },
    { value: 'lippan', label: 'Lippan Art' },
    { value: 'wall-art', label: 'Wall Art' },
  ],
  sculptures: [
    { value: 'frp-mural', label: 'FRP Mural' },
    { value: '3d', label: '3D Sculptures' },
    { value: 'metal', label: 'Metal Sculptures' },
    { value: 'installations', label: 'Custom Installations' },
  ],
  drawings: [
    { value: 'furniture', label: 'Furniture Painting' },
    { value: 'fabric', label: 'Fabric Painting' },
    { value: 'sketches', label: 'Pencil Sketches' },
    { value: 'custom', label: 'Custom Artwork' },
  ],
};

export const ALL_TYPES: { value: ArtworkType; label: string }[] = [
  ...CATEGORY_TYPES.paintings,
  ...CATEGORY_TYPES.sculptures,
  ...CATEGORY_TYPES.drawings,
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
];
