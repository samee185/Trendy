import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import useAuth to access AuthContext

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const { user, token } = useAuth(); // Access AuthContext states
  const currency = "₦";
  const tax = 500;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartingTerm, setCartingTerm] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products`);
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    const cartData = { ...cartingTerm };
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    toast.success("Added to Cart!");
    setCartingTerm(cartData);
  };

  const getCartCount = () => {
    return Object.values(cartingTerm).reduce((count, sizes) => {
      return count + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartingTerm).reduce((total, [itemId, sizes]) => {
      const itemInfo = products.find((item) => item._id === itemId);
      if (itemInfo) {
        return total + Object.values(sizes).reduce((sum, qty) => sum + qty * itemInfo.price, 0);
      }
      return total;
    }, 0);
  };

  const updateQuantity = (itemId, size, quantity) => {
    const cartData = { ...cartingTerm };
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
      setCartingTerm(cartData);
    }
  };

  const value = {
    products,
    loading,
    currency,
    tax,
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

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
