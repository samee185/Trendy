import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import {FaShoppingCart, FaSearch, FaUser} from "react-icons/fa"
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <div className="p-2 rounded-full shadow-lg">
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

      <div className="flex items-center gap-6">
        {/* <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        /> */}
        <FaSearch size={24} className="text-purple-500 cursor-pointer" onClick={() => setShowSearch(true)}/>

        <div className="group relative">
          <Link to={"/login"}>
            {/* <img
              src={assets.profile_icon}
              alt=""
              className="w-5 cursor-pointer"
            /> */}
            <FaUser size={24} className="text-purple-500 cursor-pointer" />
          </Link>

          <div className="group-hover:block hidden absolute dropdown-menu  right-0 pt-4">
            <div className="flex flex-col gap-2 w-36  py-3 px-5  bg-slate-100 text-slate-500 ">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          {/* <img src={assets.cart_icon} alt="" className="w-5 min-w-5 " /> */}
          <FaShoppingCart size={24} className="text-purple-500 cursor-pointer"/>
          <p className="absolute right-[-5px]  bottom-[-5px] w-4 text-center leading-4 bg-purple-500 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        {/* <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden "
          alt=""
        /> */}
        <Bars3BottomRightIcon className="w-8 text-purple-500 font-bold" onClick={() => setVisible(true)} />
      </div>
      {/* sidebar menu for smaller screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } `}
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
            className={"py-2 pl-6 border"}
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={"py-2 pl-6 border"}
            to={"/collection"}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={"py-2 pl-6 border"}
            to={"/about"}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={"py-2 pl-6 border"}
            to={"/contact"}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
