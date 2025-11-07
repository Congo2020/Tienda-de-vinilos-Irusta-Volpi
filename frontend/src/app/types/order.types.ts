export interface OrderItem {
  vinyl_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: string;
  full_name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  created_at: string;
}

export interface CreateOrderRequest {
  items: {
    vinyl_id: string;
    quantity: number;
  }[];
  full_name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
}

