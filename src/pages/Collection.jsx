  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // If subcategory is already selected, remove it
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      // Otherwise, add the subcategory to the selection
      setSubCategory([...subCategory, e.target.value]);
    }
  };
  const applyFilter = () => {
    let filteredProducts = products.slice(); // Create a shallow copy of products

    // Filter by search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [category, subCategory,searchTerm, setSearchTerm]); // Dependency on category and subCategory ensures filtering happens when they change

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index} // Unique key for each product
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
