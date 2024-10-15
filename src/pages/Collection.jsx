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
