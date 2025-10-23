import React from "react";
import "./CategoryFilter.css";

const categories = ["All", "Roses", "Tulips", "Sunflowers", "Mixed Bouquets", "Luxury"];

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
