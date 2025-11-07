import { VinylGenre } from "./constants";

export interface Vinyl {
  id: string;
  title: string;
  artist: string;
  price: number;
  stock: number;
  year: number;
  genres: string[];
  cover_url: string;
  description?: string;
}

export interface VinylFilters {
  q?: string;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
}

