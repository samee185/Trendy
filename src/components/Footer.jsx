import React from "react";
import { assets } from "../assets/assets";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Main footer content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Logo and description */}
        <div>
        <Link to={"/"}>
        <img src={logo} className="w-14 h-12 mb-5 " alt="Logo" />
        </Link>
          <p className="w-full md:w-2/3 text-gray-600">
          All the Essentials in One Place – Browse Our Footer for Contact Info, FAQs, and Exclusive Member Resources.
          </p>
        </div>
        {/* Company links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to={"/"}>
            <li>Home</li>
            </Link>
            <Link to ={"/about"}><li>About us</li> </Link>
            <Link to={"/collection"}>Collection</Link>
            <Link to={"/contact"}>Contact</Link>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/* Contact information */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+234-803-896-9978</li>
            <li>trendynativewears@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright notice */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          copyright 2024@ Trendy Native Wears -All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

