import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext"; 
import { FaShoppingCart, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const [showSidebarDropdown, setShowSidebarDropdown] = useState(true); 
  const { token, logout } = useAuth();

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={logo} className="w-16" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">HOME</NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">COLLECTION</NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">ABOUT</NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">CONTACT</NavLink>
      </ul>

      <div className="flex items-center gap-3 md:gap-6">
        <FaSearch size={22} className="text-gray-700 cursor-pointer" onClick={() => setShowSearch(true)} />

      
        {token ? (
          <FaSignOutAlt 
            size={22} 
            className="text-gray-700 cursor-pointer" 
            onClick={logout} 
            title="Logout"
          />
        ) : (
          <Link to={"/login"}>
            <FaUser size={22} className="text-gray-700 cursor-pointer" title="Login" />
          </Link>
        )}

        <Link to={"/cart"} className="relative">
          <FaShoppingCart size={22} className="text-gray-700 cursor-pointer" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-700 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <Bars3BottomRightIcon
          className="w-7 text-gray-800 font-bold sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
