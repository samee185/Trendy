import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, title, price }) => {
  const { currency } = useContext(ShopContext); 

  return (
    <Link
      className="text-gray-700 cursor-pointer flex flex-col items-center p-3 border border-gray-600 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 bg-purple-300"
      to={`/product/${id}`}
    >
      {/* Image container centered and with padding */}
      <div className="w-full flex justify-center items-center h-48 overflow-hidden rounded-md">
        <img
          className="w-52 h-52 object-contain transition-transform duration-300 ease-in-out"
          src={image}
          alt={title}
        />
      </div>
      <p className="mt-3 text-sm font-semibold text-center">{title}</p>
      <p className="text-sm font-medium text-center">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
