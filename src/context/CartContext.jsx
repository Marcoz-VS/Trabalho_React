/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD", payload: product });
  };

  const removeFromCart = (id) => {
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
