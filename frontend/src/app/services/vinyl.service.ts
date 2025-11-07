import api from './api';
import { Vinyl, VinylFilters } from '../types/vinyl.types';

export const vinylService = {
  async getAll(filters?: VinylFilters): Promise<Vinyl[]> {
    const params = new URLSearchParams();
    if (filters?.q) params.append('q', filters.q);
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    
    const { data } = await api.get<Vinyl[]>(`/vinyls?${params.toString()}`);
    return data;
  },

  async getById(id: string): Promise<Vinyl> {
    const { data } = await api.get<Vinyl>(`/vinyls/${id}`);
    return data;
  },

  async create(vinyl: Omit<Vinyl, 'id'>): Promise<Vinyl> {
    const { data } = await api.post<Vinyl>('/vinyls', vinyl);
    return data;
  },

  async update(id: string, vinyl: Partial<Vinyl>): Promise<Vinyl> {
    const { data } = await api.put<Vinyl>(`/vinyls/${id}`, vinyl);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/vinyls/${id}`);
  },
};

