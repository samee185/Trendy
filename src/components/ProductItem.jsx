import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
      to={`/product/${id}`}
    >
      {/* Image container centered and with padding */}
      <div className="w-full flex justify-center items-center h-48 overflow-hidden rounded-md bg-gray-100 p-2">
        <img
          className="w-48 h-48 object-contain transition-transform duration-300 ease-in-out"
          src={image}
          alt={name}
        />
      </div>
      <p className="mt-3 text-sm font-semibold text-center">{name}</p>
      <p className="text-sm font-medium text-center">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
