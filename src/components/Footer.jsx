import React from "react";
import { assets } from "../assets/assets";
import logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <div>
      {/* Main footer content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Logo and description */}
        <div>
        <img src={logo} className="w-10 mb-5 " alt="Logo" />
          {/* <img src={assets.logo} className="mb-5 w-32" alt="" /> */}
          <p className="w-full md:w-2/3 text-gray-600">
          All the Essentials in One Place – Browse Our Footer for Contact Info, FAQs, and Exclusive Member Resources.
          </p>
        </div>
        {/* Company links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/* Contact information */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
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

