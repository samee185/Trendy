import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// ProductItem component for displaying individual product details
const ProductItem = ({ id, image, name, price }) => {
  // Access currency from ShopContext
  const { currency } = useContext(ShopContext);

  return (
    // Link to individual product page
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      {/* Image container with hover effect */}
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      {/* Product name */}
      <p className="pt-3 pb-1 text-sm">{name}</p>
      {/* Product price with currency */}
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;

