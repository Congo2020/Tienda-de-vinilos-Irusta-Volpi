import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const checkoutSchema = z.object({
  full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  postal_code: z.string().regex(/^\d{4,5}$/, 'El código postal debe tener 4 o 5 dígitos'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

