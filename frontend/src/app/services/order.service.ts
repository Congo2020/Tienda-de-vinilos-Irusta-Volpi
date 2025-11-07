import api from './api';
import { Order, CreateOrderRequest } from '../types/order.types';

export const orderService = {
  async create(order: CreateOrderRequest): Promise<Order> {
    const { data } = await api.post<Order>('/orders', order);
    return data;
  },

  async getMyOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>('/orders');
    return data;
  },
};

