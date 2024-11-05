import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products, loading } = useContext(ShopContext); // Access loading state
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title text1={"LATEST "} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ad
          dolores quas libero magni! Ex officiis at corrupti ratione suscipit
        </p>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
          {latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.images?.[0]} // Safely access first image if exists
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default LatestCollection;
