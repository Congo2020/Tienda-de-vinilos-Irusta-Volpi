import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../src/app/components/shared/ProtectedRoute';
import { AuthProvider } from '../src/app/store/AuthContext';

vi.mock('../src/app/store/AuthContext', async () => {
  const actual = await vi.importActual('../src/app/store/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
      isAdmin: false,
    }),
  };
});

describe('ProtectedRoute', () => {
  it('should redirect to login when not authenticated', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    );

    // Should redirect, so protected content should not be visible
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});

