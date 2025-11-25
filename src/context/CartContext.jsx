/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const product = action.payload;
      const existing = state.items.find(i => i.id === product.id);
    
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }]
      };
    }

    case "REMOVE": {
      const id = action.payload;
      const existing = state.items.find(i => i.id === id);

      if (!existing) return state;

      if (existing.quantity > 1) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === id
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
        };
      }

      return {
        ...state,
        items: state.items.filter(i => i.id !== id)
      };
    }

    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = product => {
    dispatch({ type: "ADD", payload: product });
  };

  const removeFromCart = id => {
    dispatch({ type: "REMOVE", payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
