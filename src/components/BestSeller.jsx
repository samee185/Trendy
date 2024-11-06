// Import necessary React hooks and components
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  // Access products from ShopContext
  const { products } = useContext(ShopContext);
  // State to store best seller products
  const [bestSeller, setBestSeller] = useState([]);

  // Effect to filter and set best seller products
  // useEffect(() => {
    // Filter products marked as bestseller
    // const bestProduct = products.filter((item) => item.bestseller);
    // console.log('Best Sellers:', bestProduct);
    // Set up to 5 best seller products
  //   setBestSeller(bestProduct.slice(0, 5));
  // }, [products]);


  useEffect(() => {
    setBestSeller(products.slice(0, 5));
    // console.log("Latest Products:", products.slice(0, 10)); // for debugging purposes
  }, [products]);

  return (
    <div className="my-10 ">
      {/* Title and description section */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
        Shop the Styles That Stand Out: Our Best Sellers Collection, Packed with the Season’s Top Choices and Classic Favorites.
        </p>
      </div>
      {/* Grid layout for best seller products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            title={item.title}
            image={item.images?.[0] || "default-image-url.jpg"} // Fallback if `images` is empty
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;

