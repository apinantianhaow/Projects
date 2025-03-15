import { useState } from "react";

function CategorySelector({ selectedCategory, setSelectedCategory, closeModal }) {
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const categories = ["Electronics", "Clothing", "Books", "Home", "Plants", "Art&Handmade", "Collectibles", "Sports", "Kids", "Beauty", "Grocery"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-96">
        <h3 className="font-bold text-lg mb-2">Select Category</h3>
        {categories.map((category, index) => (
          <div key={index} className="p-2 cursor-pointer flex items-center" onClick={() => setTempCategory(category)}>
            <input type="radio" checked={tempCategory === category} readOnly className="mr-2" />
            {category}
          </div>
        ))}
        <button 
          className="w-full bg-[#AC631F] hover:bg-opacity-80 text-white p-2 rounded-md mt-4" 
          onClick={() => { setSelectedCategory(tempCategory); closeModal(); }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CategorySelector;
