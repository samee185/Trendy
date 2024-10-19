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
  const getCartCount = () => {
    let totalCount = 0;
    for (let item in cartingTerm) {
      for (let size in cartingTerm[item]) {
        // Add only once to the total count
        if (cartingTerm[item][size] > 0) {
          totalCount += cartingTerm[item][size];
        }
      }
    }
    return totalCount; // Ensure the count is returned
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartingTerm) {
      let itemInfo = products.find((item) => item._id === items);
      for (const item in cartingTerm[items]) {
        try {
          if (cartingTerm[items][item] > 0) {
            totalAmount += itemInfo.price * cartingTerm[items][item];
          }
        } catch (error) {}
      }
      // if(itemInfo){
      //   totalAmount += itemInfo.price * cartingTerm[items][size];
      // }
    }
    return totalAmount;
  };

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

