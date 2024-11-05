import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  // Accessing products from context using the ShopContext
  const { products, searchTerm, setSearchTerm } = useContext(ShopContext);

  // States for managing filter visibility, filtered products, selected categories, subcategories, and sort type
  const [showFilter, setShowfilter] = useState(false); // Show/hide filter section
  const [filterProducts, setFilterProducts] = useState([]); // Products to be displayed after applying filters
  const [category, setCategory] = useState([]); // Selected categories for filtering
  const [subCategory, setSubCategory] = useState([]); // Selected subcategories for filtering
  const [sortType, setSortType] = useState("relevant"); // Sort type (e.g., "low-high", "high-low")

  // Function to toggle category selection for filtering
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // If category is already selected, remove it
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      // Otherwise, add the category to the selection
      setCategory([...category, e.target.value]);
    }
  };

  // Function to toggle subcategory selection for filtering
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // If subcategory is already selected, remove it
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      // Otherwise, add the subcategory to the selection
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  // Apply filters based on selected categories and subcategories
  const applyFilter = () => {
    let filteredProducts = products.slice(); // Create a shallow copy of products

    // Filter by search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name
          ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      );
    }

    // Filter by selected categories
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by selected subcategories
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Update filtered products to display
    setFilterProducts(filteredProducts);
  };

  // This useEffect will apply filters when searchTerm or filter settings change
  useEffect(() => {
    applyFilter(); // Apply filters whenever searchTerm, category, or subCategory changes
  }, [category, subCategory, searchTerm]);

  // Sorting function based on the selected sort type (e.g., price)
  const sortProducts = () => {
    let sortedProducts = [...filterProducts]; // Create a copy of filtered products

    // Sort by price: low to high
    if (sortType === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    // Sort by price: high to low
    else if (sortType === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Update filtered products with the sorted list
    setFilterProducts(sortedProducts);
  };

  // Handle sort type change when the user selects a different option
  const handleSortChange = (e) => {
    setSortType(e.target.value); // Update sort type state, which will trigger re-sorting
  };

  // Use effect to apply sorting whenever the sort type changes
  useEffect(() => {
    if (sortType !== "relevant") {
      sortProducts(); // Sort products based on the current sort type
    }
  }, [sortType]); // Dependency on sortType ensures sorting happens when it changes

  // Use effect to apply filters whenever the selected category or subcategory changes
  useEffect(() => {
    applyFilter(); // Apply filters whenever category or subcategory state changes
  }, [category, subCategory, searchTerm, setSearchTerm]); // Dependency on category and subCategory ensures filtering happens when they change

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t h-full">
      {/* Filter section on the left */}
      <div className="min-w-60">
        <p
          onClick={() => setShowfilter(!showFilter)} // Toggle filter section visibility on click
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          {/* Dropdown icon that rotates when filter section is shown */}
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Category filter section */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {/* Checkbox options for categories */}
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"men"}
                onChange={toggleCategory} // Toggle category when checkbox changes
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Subcategory filter section */}
        {/* <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        > */}
          {/* <p className="mb-3 text-sm font-medium">TYPE</p> */}
          {/* <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory} 
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div> */}
        {/* </div> */}
      </div>

      {/* Right side: Product list and sorting */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          {/* Title component to display "ALL COLLECTION" */}
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Dropdown to select sort option */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={handleSortChange} // Call the handler when the user changes the sort type
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Display products in a responsive grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index} // Unique key for each product
              id={item._id}
              name={item.title}
              price={item.price}
              image={item.images?.[0] || "default-image-url.jpg"} // Fallback if `images` is empty
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
