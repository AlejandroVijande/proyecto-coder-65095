import { cartContext } from "./cartContext";
import { useState, useEffect } from "react";

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((prod) => prod.id === item.id);
      if (existingProduct) {
        return prevCart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + item.quantity }
            : prod
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
  };
  const emptyCart = () => setCart([]);
  const getTotal = () => {
    const pricesOnly = cart.map((prod) => prod.price * prod.quantity);
    const total = pricesOnly.reduce((acc, current) => acc + current, 0);
    return total;
  };
  return (
    <cartContext.Provider value={{ cart, addToCart, emptyCart, getTotal }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
