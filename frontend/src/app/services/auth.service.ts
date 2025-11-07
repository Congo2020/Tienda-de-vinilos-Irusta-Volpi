import api from './api';
import { LoginRequest, LoginResponse } from '../types/user.types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    return data;
  },
};

