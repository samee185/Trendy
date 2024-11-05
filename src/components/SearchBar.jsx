import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  // Access context values
  const { searchTerm, setSearchTerm, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false); // State to control visibility based on route
  const location = useLocation(); // Get current location

  // Effect to update visibility based on route
  useEffect(() => {
    const isCollectionPage = location.pathname.includes("collection");
    setVisible(isCollectionPage);
    setShowSearch(isCollectionPage); // Automatically show search if on collection page
  }, [location, setShowSearch]);
  

  // Render search bar only if showSearch is true and on the collection page
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search for products..."
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img className="w-4" src={assets.search_icon} alt="Search" />
      </div>
      <img
        onClick={() => {
          setShowSearch(false);
          setSearchTerm(""); // Clear search term on close
        }}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close"
      />
    </div>
  ) : null;
};

export default SearchBar;
