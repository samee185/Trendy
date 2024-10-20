import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartingTerm, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    // console.log("cartItems:", cartItems);
    // console.log("products:", products);

    const tempData = [];
    for (const items in cartingTerm) {
      for (const size in cartingTerm[items]) {
        if (cartingTerm[items][size] > 0) {
          tempData.push({
            _id: items,
            size: size,
            quantity: cartingTerm[items][size],
          });
        }
      }
    }
    setCartDetails(tempData); // Update state with `tempData`
  }, [cartingTerm, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartDetails.map((item, index) => {
          // Find the product by ID
          const productData = products.find(
            (product) => product._id === item._id
          );

          // Check if productData exists before accessing its properties
          if (!productData) {
            return (
              <div key={index} className="py-4 text-red-500">
                Product not found
              </div>
            );
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-3 items-center gap-6"
            >
              <div className="flex gap-6 items-center">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="w-20 sm:w-24"
                />
                <div className="flex flex-col">
                  <p className="text-base sm:text-xl font-semibold">
                    {productData.name}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    Size: {item.size}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-4">
                <div className="flex items-center gap-5">
                  <p className="text-lg sm:text-xl font-medium">
                    {currency}
                    {productData.price}
                  </p>
                  <input
                    type="number"
                    defaultValue={item.quantity}
                    min="1"
                    onChange={(e) =>
                      e.target.value > 0
                        ? updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                        : null
                    }
                    className="border rounded-md max-w-[60px] sm:max-w-[80px] text-center py-1 px-2"
                  />
                </div>
              </div>

              <div className="flex justify-end sm:justify-center">
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt="Remove item"
                  className="w-5 sm:w-6 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end ">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8  px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
