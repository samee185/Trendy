import { createContext, useState } from "react";
import { products } from "../assets/assets";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Constants
  const currency = "$";
  const delivery_fee = 10;

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Value object to be provided to context consumers
  const value = {
    products,
    currency,
    delivery_fee,
    searchTerm,
    setSearchTerm,
    showSearch,
    setShowSearch,
  };

  // Provide the context value to child components
  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

