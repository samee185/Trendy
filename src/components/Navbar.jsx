import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const [showSidebarDropdown, setShowSidebarDropdown] = useState(true); 

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <div className="">
          <img src={logo} className="w-16" alt="Logo" />
        </div>
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-3 md:gap-6">
        <FaSearch
          size={22}
          className="text-gray-700 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        <div className="group relative">
          <Link to={"/login"}>
            <FaUser size={22} className="text-gray-700 cursor-pointer" />
          </Link>
        </div>

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
      {/* Sidebar menu for smaller screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-20 transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-grey-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>

          {/* Sidebar Collection Menu with Sub-Dropdown */}
          <div className="relative">
            <button
              className="text-gray-700 flex items-center justify-between w-full py-2 pl-6 border"
              onClick={() => setShowSidebarDropdown(!showSidebarDropdown)}
            >
              COLLECTION
              <span className="ml-2">{showSidebarDropdown ? "-" : "+"}</span>
            </button>
            {showSidebarDropdown && (
              <div className="ml-4 mt-2">
                <ul className="flex flex-col gap-2">
                  <Link
                    to="/collection/men"
                    className="text-gray-600 hover:text-purple-600"
                    onClick={() => {
                      setVisible(false);
                      setShowSidebarDropdown(false);
                    }}
                  >
                    Men
                  </Link>
                  <Link
                    to="/collection/women"
                    className="text-gray-600 hover:text-purple-600"
                    onClick={() => {
                      setVisible(false);
                      setShowSidebarDropdown(false);
                    }}
                  >
                    Women
                  </Link>
                  <Link
                    to="/collection/kids"
                    className="text-gray-600 hover:text-purple-600"
                    onClick={() => {
                      setVisible(false);
                      setShowSidebarDropdown(false);
                    }}
                  >
                    Kids
                  </Link>
                </ul>
              </div>
            )}
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
