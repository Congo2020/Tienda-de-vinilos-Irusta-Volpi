import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { AdminRoute } from './components/shared/AdminRoute';

// Public routes
import { Home } from './routes/public/Home';
import { Catalog } from './routes/public/Catalog';
import { ProductDetail } from './routes/public/ProductDetail';
import { Login } from './routes/public/Login';

// Private routes
import { Cart } from './routes/private/Cart';
import { Checkout } from './routes/private/Checkout';
import { Account } from './routes/private/Account';
import { MyOrders } from './routes/private/MyOrders';

// Admin routes
import { AdminLayout } from './routes/admin/AdminLayout';
import { AdminDashboard } from './routes/admin/AdminDashboard';
import { AdminVinylCreate } from './routes/admin/AdminVinylCreate';
import { AdminVinylForm } from './routes/admin/AdminVinylForm';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/vinyls" element={<AppLayout><Catalog /></AppLayout>} />
      <Route path="/vinyls/:id" element={<AppLayout><ProductDetail /></AppLayout>} />
      <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
      
      <Route
        path="/cart"
        element={
          <AppLayout>
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <AppLayout>
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/account"
        element={
          <AppLayout>
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/orders"
        element={
          <AppLayout>
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      
      <Route
        path="/admin"
        element={
          <AppLayout>
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          </AppLayout>
        }
      />
      <Route
        path="/admin/vinyls/new"
        element={
          <AppLayout>
            <AdminRoute>
              <AdminLayout>
                <AdminVinylCreate />
              </AdminLayout>
            </AdminRoute>
          </AppLayout>
        }
      />
      <Route
        path="/admin/vinyls/:id"
        element={
          <AppLayout>
            <AdminRoute>
              <AdminLayout>
                <AdminVinylForm />
              </AdminLayout>
            </AdminRoute>
          </AppLayout>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

