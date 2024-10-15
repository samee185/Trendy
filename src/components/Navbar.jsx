import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  // State to control sidebar visibility
  const [visible, setVisible] = useState(false);
  // Context to control search bar visibility
  const {setShowSearch} = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to={'/'}>
        <img src={logo} className="w-10 bg-black " alt="Logo" />
      </Link>

      {/* Navigation links for larger screens */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {/* NavLink components for different pages */}
        {/* ... */}
      </ul>

      {/* Icons section */}
      <div className="flex items-center gap-6">
        {/* Search icon */}
        <img onClick={()=> setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        
        {/* Profile dropdown */}
        <div className="group relative">
          {/* ... */}
        </div>

        {/* Cart icon with item count */}
        <Link to={"/cart"} className="relative">
          {/* ... */}
        </Link>

        {/* Menu icon for smaller screens */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden "
          alt=""
        />
      </div>

      {/* Sidebar menu for smaller screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } `}
      >
        {/* Sidebar content */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Navbar;

