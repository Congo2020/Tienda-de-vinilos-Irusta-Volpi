import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vinyl } from '../types/vinyl.types';

interface CartItem {
  vinyl: Vinyl;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (vinyl: Vinyl, quantity?: number) => void;
  removeItem: (vinylId: string) => void;
  updateQuantity: (vinylId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (vinyl: Vinyl, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.vinyl.id === vinyl.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.vinyl.id === vinyl.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { vinyl, quantity }];
    });
  };

  const removeItem = (vinylId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.vinyl.id !== vinylId));
  };

  const updateQuantity = (vinylId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(vinylId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.vinyl.id === vinylId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.vinyl.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

