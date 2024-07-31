import React from 'react';

const CategorySelector = ({ selectedCategory, handleCategoryChange, categories }) => {
  return (
    <div className="mb-4">
      <label htmlFor="category-select" className="block text-lg font-bold mb-2">Categories</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="block w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
