import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets, products } from "../assets/assets";

const Product = () => {
  // Extract productId from URL parameters
  const { productId } = useParams();

  // Access global shop context
  const { Products, currency } = useContext(ShopContext);

  // State for product data, selected image, and size
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Function to fetch and set product data
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  // Fetch product data when productId changes
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 transition-opacity ease-in duration-500 opacity-100">
      <div className="mt-10 flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          {/* Main Product Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          {/* Product Rating */}
          <div className="flex items-center gap-1 mt-2">
            {/* Star rating icons */}
            <p className="pl-2">{112}</p>
          </div>
          {/* Product Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          {/* Product Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  className={`border py-2 px-4 pg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

