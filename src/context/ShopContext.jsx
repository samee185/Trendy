import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Constants
  const currency = "$";
  const delivery_fee = 10;

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // state for carting functionality
  const [cartingTerm, setCartingTerm] = useState({});

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartingTerm);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {}; // Updated from `cartData[item]` to `cartData[itemId]`
      cartData[itemId][size] = 1; // Initialize size if it doesn't exist yet
    }

    setCartingTerm(cartData);
  };

  useEffect(() => {
    console.log(cartingTerm);
  }, [cartingTerm]);

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
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartingTerm);
    cartData[itemId][size] = quantity;
    setCartingTerm(cartData);
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
    cartingTerm,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  // Provide the context value to child components
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
