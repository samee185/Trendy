import React from "react";

const CategoryForm = ({ selectedCategories, toggleCategory }) => {
  return (
    <div className="border border-gray-300 pl-5 py-3 mt-6">
      <p className="mb-3 text-sm font-medium">CATEGORIES</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        <p className="flex gap-2">
          <input
            type="checkbox"
            className="w-3"
            value={"men"}
            onChange={toggleCategory}
            checked={selectedCategories.includes("men")}
          />
          Men
        </p>
        <p className="flex gap-2">
          <input
            type="checkbox"
            className="w-3"
            value={"women"}
            onChange={toggleCategory}
            checked={selectedCategories.includes("women")}
          />
          Women
        </p>
        <p className="flex gap-2">
          <input
            type="checkbox"
            className="w-3"
            value={"kids"}
            onChange={toggleCategory}
            checked={selectedCategories.includes("kids")}
          />
          Kids
        </p>
      </div>
    </div>
  );
};

export default CategoryForm;