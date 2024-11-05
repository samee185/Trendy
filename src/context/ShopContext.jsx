import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Constants
  const currency = "$";
  const delivery_fee = 10;

  // State for products
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true); // Loading state

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // state for carting functionality
  const [cartingTerm, setCartingTerm] = useState({});

  // ** NEW: User and token states **
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Fetch products from the API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://trendynative-api.onrender.com/api/v1/products"
        );
        setProducts(response.data.data.products);
        console.log("Fetched products:", response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false); // Update loading state here
      }
    };
    fetchProducts();
  }, []);
  //////

  // ** NEW: Fetch user profile if token is available **
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "https://trendynative-api.onrender.com/api/v1/users/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user profile:", error.message);
          toast.error("Failed to load user profile");
        }
      }
    };
    fetchUserProfile();
  }, [token]);

  // ** NEW: Login function **
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://trendynative-api.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      setToken(response.data.token); // Save token
      console.log("Login successful:", response.data); // Console log on successful login
      toast.success("Login successful");
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed");
    }
  };

  // ** NEW: Signup function **
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(
        "https://trendynative-api.onrender.com/api/v1/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      setToken(response.data.token); // Save token
      toast.success("Signup successful");
      console.log("Signup successful:", response.data); // Console log for debugging
      navigate("/dashboard"); // Redirect after successful signup
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error("Signup failed");
    }
  };

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
    // console.log(cartingTerm);
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

  // ** NEW: Logout function **
  const logout = () => {
    setUser(null); // Clear user data
    setToken(null); // Clear token
    toast.info("Logged out");
  };

  // Value object to be provided to context consumers
  const value = {
    products,
    loading, // Expose loading state
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

    // Newly added items
    user,
    token,
    login,
    signup,
    logout,
  };

  // Provide the context value to child components
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
