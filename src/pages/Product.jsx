import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import { ShopContext } from "../context/ShopContext";
import RelatedProduct from "../components/RelatedProduct";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, loading, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const availableSizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    if (!loading && products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.images[0]); 
      }
    }
  }, [loading, products, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return productData ? (
    <div className="border-t-2 transition-opacity ease-in duration-500 opacity-100">
      {/* Back to Collection Button */}
      <div className="mt-5 mb-5">
        <Link to="/collection" className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
          &larr; Back to Collection
        </Link>
      </div>

      {/* Product Data Rendering */}
      <div className="mt-10 flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData?.title || "Product Name Not Available"}
          </h1>

          <div className="flex items-center gap-1 mt-2">
            {/* Rating stars here */}
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">{112}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
          
            <div className="flex gap-2">
              {availableSizes.map((item) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      
      {/* Description and review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-small text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProduct
        category={productData.category}
        subcategory={productData.subcategory}
      />
    </div>
  ) : (
    <div>No product found.</div>
  );
};

export default Product;