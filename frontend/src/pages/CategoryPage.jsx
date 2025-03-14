import React from "react";
import { useParams } from "react-router-dom";

const products = {
  electronics: [
    { id: 1, name: "Smartphone", image: "/images/products/smartphone.jpg", price: "$299" },
    { id: 2, name: "Headphones", image: "/images/products/headphones.jpg", price: "$99" },
    { id: 3, name: "Laptop", image: "/images/products/laptop.jpg", price: "$899" },
  ],
  clothing: [
    { id: 4, name: "T-Shirt", image: "/images/products/tshirt.jpg", price: "$19" },
    { id: 5, name: "Jeans", image: "/images/products/jeans.jpg", price: "$49" },
  ],
};

function CategoryPage() {
  const { category } = useParams();
  const categoryProducts = products[category] || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{category.toUpperCase()}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
