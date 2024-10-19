import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartingTerm, updateQuantity,navigate } =
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
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex  gap-6 items-start">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="w-16 sm:h-16"
                />
              </div>
              <p className="text-xs sm:text-lg font-medium">
                {productData.name}
              </p>
              <div className="flex items-center gap-5 mt-2">
                <p>
                  {currency}
                  {productData.price}
                </p>
                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                  {item.size}
                </p>
              </div>
              <input
                onClick={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                type="number"
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                alt=""
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end ">
            <button onClick={()=> navigate("/place-order")} className="bg-black text-white text-sm my-8  px-8 py-3">PROCEED TO  CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
