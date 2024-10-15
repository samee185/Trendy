import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandle = (event) => {
    event.preventDefault()
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
        architecto?
      </p>
      <form onSubmit={onSubmitHandle}
        action=""
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto  my-6 boder pl-3"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
