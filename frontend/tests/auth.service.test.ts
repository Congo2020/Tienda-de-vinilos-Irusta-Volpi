import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../src/app/services/auth.service';
import api from '../src/app/services/api';

vi.mock('../src/app/services/api');

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      },
      token: 'mock-token',
    };

    vi.mocked(api.post).mockResolvedValue({ data: mockResponse });

    const result = await authService.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual(mockResponse);
  });
});

