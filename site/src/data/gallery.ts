export type Theme = 'concept' | 'execution' | 'interior' | 'furniture' | 'photography' | 'objects' | 'research' | 'illustration' | 'site';
export type Color = 'yellow' | 'blue' | 'red' | 'green' | 'violet' | 'black';

export interface GalleryItem {
  id: string;
  title: string;
  theme: Theme;
  color: Color;
  project?: string;
  aspectRatio: string;
  image: string;
}

export const COLOR_HEX: Record<Color, string> = {
  yellow: '#F5D547',
  blue: '#2D5BFF',
  red: '#E63946',
  green: '#2A9D8F',
  violet: '#7B2D8E',
  black: '#1D1D1D',
};

export const projects = [
  { slug: 'casa-negra', title: 'Casa Negra' },
  { slug: 'casa-luz', title: 'Casa Luz' },
  { slug: 'pavilion-bcn', title: 'Pavilion BCN' },
];

// picsum.photos — guaranteed to work, unique seed per image
const p = (seed: string, w = 600, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const galleryItems: GalleryItem[] = [
  { id: 'A.01', title: 'Subterranean Hall', theme: 'concept', color: 'black', project: 'casa-negra', aspectRatio: '3/4', image: p('arch01', 600, 800) },
  { id: 'A.02', title: 'Concrete Shell', theme: 'execution', color: 'black', project: 'casa-negra', aspectRatio: '4/3', image: p('arch02', 800, 600) },
  { id: 'A.03', title: 'Raw Surface', theme: 'execution', color: 'black', aspectRatio: '1/1', image: p('arch03', 600, 600) },
  { id: 'A.04', title: 'Tower Form', theme: 'concept', color: 'blue', project: 'pavilion-bcn', aspectRatio: '2/3', image: p('arch04', 600, 900) },
  { id: 'A.05', title: 'Texture Study', theme: 'research', color: 'black', aspectRatio: '4/3', image: p('arch05', 800, 600) },
  { id: 'A.06', title: 'Volume Study', theme: 'concept', color: 'violet', aspectRatio: '16/9', image: p('arch06', 800, 450) },
  { id: 'A.07', title: 'Structural Detail', theme: 'execution', color: 'black', project: 'casa-negra', aspectRatio: '3/4', image: p('arch07', 600, 800) },
  { id: 'A.08', title: 'Ceiling Pattern', theme: 'research', color: 'blue', aspectRatio: '16/9', image: p('arch08', 800, 450) },
  { id: 'A.09', title: 'Lobby Space', theme: 'interior', color: 'yellow', project: 'pavilion-bcn', aspectRatio: '4/3', image: p('arch09', 800, 600) },
  { id: 'A.10', title: 'Colonnade', theme: 'concept', color: 'green', project: 'pavilion-bcn', aspectRatio: '3/4', image: p('arch10', 600, 800) },

  { id: 'A.11', title: 'Living Room', theme: 'interior', color: 'yellow', project: 'casa-luz', aspectRatio: '4/3', image: p('int11', 800, 600) },
  { id: 'A.12', title: 'Staircase Light', theme: 'interior', color: 'yellow', project: 'casa-negra', aspectRatio: '3/4', image: p('int12', 600, 800) },
  { id: 'A.13', title: 'Kitchen Volume', theme: 'interior', color: 'green', project: 'casa-luz', aspectRatio: '16/9', image: p('int13', 800, 450) },
  { id: 'A.14', title: 'Bathroom Light', theme: 'interior', color: 'blue', project: 'casa-luz', aspectRatio: '4/3', image: p('int14', 800, 600) },
  { id: 'A.15', title: 'Dining Space', theme: 'interior', color: 'yellow', project: 'casa-negra', aspectRatio: '3/4', image: p('int15', 600, 800) },
  { id: 'A.16', title: 'Wardrobe Wall', theme: 'interior', color: 'violet', aspectRatio: '1/1', image: p('int16', 600, 600) },
  { id: 'A.17', title: 'Window Seat', theme: 'interior', color: 'green', project: 'casa-negra', aspectRatio: '16/9', image: p('int17', 800, 450) },
  { id: 'A.18', title: 'Reading Corner', theme: 'interior', color: 'red', project: 'pavilion-bcn', aspectRatio: '4/3', image: p('int18', 800, 600) },
  { id: 'A.19', title: 'Bedroom Frame', theme: 'interior', color: 'black', project: 'casa-negra', aspectRatio: '3/4', image: p('int19', 600, 800) },
  { id: 'A.20', title: 'Sofa Detail', theme: 'furniture', color: 'green', aspectRatio: '4/3', image: p('furn20', 800, 600) },

  { id: 'A.21', title: 'Tower Elevation', theme: 'concept', color: 'blue', project: 'pavilion-bcn', aspectRatio: '2/3', image: p('ext21', 600, 900) },
  { id: 'A.22', title: 'Skyline View', theme: 'photography', color: 'blue', aspectRatio: '16/9', image: p('ext22', 800, 450) },
  { id: 'A.23', title: 'Facade Rhythm', theme: 'execution', color: 'yellow', project: 'pavilion-bcn', aspectRatio: '4/3', image: p('ext23', 800, 600) },
  { id: 'A.24', title: 'Entrance Portal', theme: 'concept', color: 'red', project: 'casa-negra', aspectRatio: '3/4', image: p('ext24', 600, 800) },
  { id: 'A.25', title: 'Glass Wall', theme: 'execution', color: 'blue', project: 'pavilion-bcn', aspectRatio: '1/1', image: p('ext25', 600, 600) },
  { id: 'A.26', title: 'Street Corner', theme: 'photography', color: 'black', aspectRatio: '16/9', image: p('ext26', 800, 450) },
  { id: 'A.27', title: 'Roof Detail', theme: 'execution', color: 'black', project: 'casa-negra', aspectRatio: '4/3', image: p('ext27', 800, 600) },
  { id: 'A.28', title: 'Urban Grid', theme: 'site', color: 'green', aspectRatio: '3/4', image: p('ext28', 600, 800) },
  { id: 'A.29', title: 'Bridge Form', theme: 'concept', color: 'red', aspectRatio: '16/9', image: p('ext29', 800, 450) },
  { id: 'A.30', title: 'Foundation Pour', theme: 'execution', color: 'black', project: 'casa-negra', aspectRatio: '4/3', image: p('ext30', 800, 600) },

  { id: 'A.31', title: 'Spiral Stair', theme: 'interior', color: 'violet', project: 'pavilion-bcn', aspectRatio: '3/4', image: p('geo31', 600, 800) },
  { id: 'A.32', title: 'Desk Layout', theme: 'furniture', color: 'blue', aspectRatio: '4/3', image: p('geo32', 800, 600) },
  { id: 'A.33', title: 'Office Light', theme: 'interior', color: 'yellow', aspectRatio: '16/9', image: p('geo33', 800, 450) },
  { id: 'A.34', title: 'Suburban Plan', theme: 'site', color: 'green', project: 'casa-negra', aspectRatio: '4/3', image: p('geo34', 800, 600) },
  { id: 'A.35', title: 'House Front', theme: 'concept', color: 'red', project: 'casa-luz', aspectRatio: '3/4', image: p('geo35', 600, 800) },
  { id: 'A.36', title: 'Courtyard Entry', theme: 'interior', color: 'green', project: 'casa-negra', aspectRatio: '2/3', image: p('geo36', 600, 900) },
  { id: 'A.37', title: 'Gate Detail', theme: 'execution', color: 'red', project: 'casa-negra', aspectRatio: '4/3', image: p('geo37', 800, 600) },
  { id: 'A.38', title: 'Interior Arch', theme: 'interior', color: 'violet', project: 'casa-negra', aspectRatio: '3/4', image: p('geo38', 600, 800) },
  { id: 'A.39', title: 'Balcony View', theme: 'photography', color: 'yellow', project: 'casa-luz', aspectRatio: '16/9', image: p('geo39', 800, 450) },
  { id: 'A.40', title: 'Pool House', theme: 'concept', color: 'blue', project: 'pavilion-bcn', aspectRatio: '4/3', image: p('geo40', 800, 600) },

  { id: 'A.41', title: 'Gallery Wall', theme: 'interior', color: 'black', project: 'pavilion-bcn', aspectRatio: '3/4', image: p('mus41', 600, 800) },
  { id: 'A.42', title: 'Exhibition Space', theme: 'objects', color: 'violet', aspectRatio: '4/3', image: p('mus42', 800, 600) },
  { id: 'A.43', title: 'Museum Corridor', theme: 'interior', color: 'red', project: 'pavilion-bcn', aspectRatio: '16/9', image: p('mus43', 800, 450) },
  { id: 'A.44', title: 'Studio Table', theme: 'furniture', color: 'blue', aspectRatio: '4/3', image: p('mus44', 800, 600) },
  { id: 'A.45', title: 'Hallway Light', theme: 'interior', color: 'yellow', project: 'casa-luz', aspectRatio: '3/4', image: p('mus45', 600, 800) },
  { id: 'A.46', title: 'Object Display', theme: 'objects', color: 'green', project: 'pavilion-bcn', aspectRatio: '1/1', image: p('mus46', 600, 600) },
  { id: 'A.47', title: 'Shelf System', theme: 'furniture', color: 'black', aspectRatio: '16/9', image: p('mus47', 800, 450) },
  { id: 'A.48', title: 'Night Facade', theme: 'photography', color: 'violet', project: 'pavilion-bcn', aspectRatio: '4/3', image: p('mus48', 800, 600) },
  { id: 'A.49', title: 'Plan Drawing', theme: 'illustration', color: 'black', project: 'casa-negra', aspectRatio: '3/4', image: p('mus49', 600, 800) },
  { id: 'A.50', title: 'Detail Section', theme: 'illustration', color: 'red', project: 'casa-negra', aspectRatio: '16/9', image: p('mus50', 800, 450) },

  { id: 'A.51', title: 'Valley Context', theme: 'site', color: 'green', aspectRatio: '4/3', image: p('land51', 800, 600) },
  { id: 'A.52', title: 'Cloud Study', theme: 'photography', color: 'blue', aspectRatio: '16/9', image: p('land52', 800, 450) },
  { id: 'A.53', title: 'River Edge', theme: 'site', color: 'green', project: 'pavilion-bcn', aspectRatio: '3/4', image: p('land53', 600, 800) },
  { id: 'A.54', title: 'Dawn Light', theme: 'photography', color: 'yellow', project: 'casa-luz', aspectRatio: '4/3', image: p('land54', 800, 600) },
  { id: 'A.55', title: 'Forest Path', theme: 'site', color: 'green', aspectRatio: '2/3', image: p('land55', 600, 900) },
  { id: 'A.56', title: 'Mountain View', theme: 'photography', color: 'blue', project: 'casa-negra', aspectRatio: '16/9', image: p('land56', 800, 450) },
  { id: 'A.57', title: 'Canopy Light', theme: 'site', color: 'green', project: 'casa-negra', aspectRatio: '4/3', image: p('land57', 800, 600) },
  { id: 'A.58', title: 'Lake Shore', theme: 'photography', color: 'blue', aspectRatio: '3/4', image: p('land58', 600, 800) },
  { id: 'A.59', title: 'Horizon Line', theme: 'site', color: 'yellow', project: 'pavilion-bcn', aspectRatio: '16/9', image: p('land59', 800, 450) },
  { id: 'A.60', title: 'Cast Form', theme: 'objects', color: 'black', aspectRatio: '1/1', image: p('land60', 600, 600) },
];
