import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const vinylSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  artist: z.string().min(1, 'El artista es requerido'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  year: z.number().int().min(1900).max(currentYear, `El año debe estar entre 1900 y ${currentYear}`),
  genres: z.array(z.string()).min(1, 'Debe seleccionar al menos un género'),
  cover_url: z.string().url('Debe ser una URL válida'),
  description: z.string().optional(),
});

export type VinylFormData = z.infer<typeof vinylSchema>;

