/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import {
  getCartFor,
  saveCartFor,
  getGuestCart,
  saveGuestCart
} from "../services/storage";

const CartContext = createContext();

const initialState = {
  items: []
};

function mergeCarts(a = [], b = []) {
  const map = new Map();
  [...a, ...b].forEach(item => {
    const existing = map.get(item.id);
    if (existing) {
      map.set(item.id, { ...existing, quantity: existing.quantity + (item.quantity || 1) });
    } else {
      map.set(item.id, { ...item, quantity: item.quantity || 1 });
    }
  });
  return Array.from(map.values());
}

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

    case "CLEAR": {
      return {
        ...state,
        items: []
      };
    }

    // set completo (usado ao trocar usuário / carregar do storage)
    case "SET": {
      return {
        ...state,
        items: action.payload || []
      };
    }

    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Carrega/mescla o carrinho ao iniciar e ao mudar de usuário
  useEffect(() => {
    if (user) {
      const userCart = getCartFor(user.id) || [];
      const guestCart = getGuestCart() || [];

      if (guestCart.length > 0) {
        // mescla guest -> usuário e limpa guest
        const merged = mergeCarts(userCart, guestCart);
        dispatch({ type: "SET", payload: merged });
        saveCartFor(user.id, merged);
        saveGuestCart([]);
      } else {
        dispatch({ type: "SET", payload: userCart });
      }
    } else {
      // usuário deslogado -> carrega guest
      const guest = getGuestCart() || [];
      dispatch({ type: "SET", payload: guest });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Persiste sempre que items mudam (salva para user ou guest)
  useEffect(() => {
    if (user) {
      saveCartFor(user.id, state.items);
    } else {
      saveGuestCart(state.items);
    }
  }, [state.items, user]);

  const addToCart = product => {
    dispatch({ type: "ADD", payload: product });
  };

  const removeFromCart = id => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}