import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandle = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center p-6">
      <p className="text-2xl font-medium text-gray-700">Subscribe now & get 20% off</p>
      <p className="mb-4 text-gray-700">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
        architecto?
      </p>
      <form
        onSubmit={onSubmitHandle}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6"
      >
        <input
          type="email"
          className="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 shadow-md outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs font-medium px-6 py-3 rounded-md shadow-md hover:bg-gray-800 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;

