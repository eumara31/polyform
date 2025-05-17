import { create } from 'zustand';

type SearchStore = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  features: string[];
  materials: string[];
  licenses: string[];

  setCategories: (categories: string[]) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setFeatures: (features: string[]) => void;
  setMaterials: (materials: string[]) => void;
  setLicenses: (licenses: string[]) => void;
  reset: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  categories: [],
  minPrice: 0,
  maxPrice: 0,
  features: [],
  materials: [],
  licenses: [],

  setCategories: (categories) => set({ categories }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setFeatures: (features) => set({ features }),
  setMaterials: (materials) => set({ materials }),
  setLicenses: (licenses) => set({ licenses }),
  reset: () =>
    set({
      categories: [],
      minPrice: 0,
      maxPrice: 0,
      features: [],
      materials: [],
      licenses: [],
    }),
}));
