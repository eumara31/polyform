import { create } from 'zustand';

type SearchStore = {
  searchQuery: string;
  categories: string[];
  features: string[];
  materials: string[];
  licenses: string;
  minPrice: number;
  maxPrice: number;

  setSearchQuery: (q: string) => void;
  setCategories: (c: string[]) => void;
  setFeatures: (f: string[]) => void;
  setMaterials: (m: string[]) => void;
  setLicenses: (l: string) => void;
  setMinPrice: (p: number) => void;
  setMaxPrice: (p: number) => void;

  getJsonQuery: () => Record<string, any>;
  reset: () => void;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchQuery: '',
  categories: [],
  features: [],
  materials: [],
  licenses: '',
  minPrice: 0,
  maxPrice: 0,

  setSearchQuery: (q) => set({ searchQuery: q }),
  setCategories: (c) => set({ categories: c }),
  setFeatures: (f) => set({ features: f }),
  setMaterials: (m) => set({ materials: m }),
  setLicenses: (l) => set({ licenses: l }),
  setMinPrice: (p) => set({ minPrice: p }),
  setMaxPrice: (p) => set({ maxPrice: p }),

  getJsonQuery: () => {
    const {
      searchQuery,
      categories,
      features,
      materials,
      licenses,
      minPrice,
      maxPrice,
    } = get();

    return {
      ...(searchQuery && { searchQuery }),
      ...(categories.length > 0 && { categories }),
      ...(features.length > 0 && { features }),
      ...(materials.length > 0 && { materials }),
      ...(licenses && { licenses }),
      ...(minPrice > 0 && { minPrice }),
      ...(maxPrice > 0 && { maxPrice }),
    };
  },

  reset: () =>
    set({
      searchQuery: '',
      categories: [],
      features: [],
      materials: [],
      licenses: '',
      minPrice: 0,
      maxPrice: 0,
    }),
}));
