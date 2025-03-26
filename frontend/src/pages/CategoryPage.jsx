import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Background2 from "../components/Background2";
import Postprofile from "../components/Postprofile";

const categoryData = {
  electronics: {
    image: "/images/categorys/electronics.png",
    description:
      "Electronics include a wide range of devices that enhance daily life, from smartphones and laptops to home appliances, gaming gear, and smart gadgets. Whether for work, entertainment, or convenience, these tech essentials keep you connected, productive, and entertained.",
  },
  clothing: {
    image: "/images/categorys/clothing.png",
    description:
      "Clothing refers to garments worn by individuals for comfort, protection, and personal expression. These products are made from various materials such as cotton, wool, leather, and synthetic fibers, and they serve different purposes ranging from everyday wear to special occasions.",
  },
  books: {
    image: "/images/categorys/books.png",
    description:
      "Books are printed or digital materials that contain written, illustrated, or pictorial content designed for reading, learning, or reference. They come in various formats such as hardcover, paperback, and e-books. Books serve multiple purposes, including education, entertainment, research, and professional development.",
  },
  home: {
    image: "/images/categorys/home.png",
    description:
      "Home goods refer to a wide range of household items used for daily living, organization, decoration, and convenience. These products enhance comfort, functionality, and aesthetics within a home. They are commonly categorized based on their purpose and placement in different areas of the house.",
  },
  plants: {
    image: "/images/categorys/plants.png",
    description:
      "Plants are living organisms that are grown for various purposes, including decoration, food production, environmental benefits, and personal well-being. They come in different types, such as indoor and outdoor plants, flowering and non-flowering plants, and edible and ornamental varieties.",
  },
  "art&handmade": {
    image: "/images/categorys/art&handmade.png",
    description:
      "Art and handmade refer to creative works and handmade products that showcase artistic expression, craftsmanship, and cultural heritage. These items are often unique, made with skill and attention to detail, and can serve decorative, functional, or sentimental purposes.",
  },
  collectibles: {
    image: "/images/categorys/collectibles.png",
    description:
      "Collectibles refer to rare, unique, or valuable items that people acquire for personal enjoyment, historical significance, or investment purposes. These items often hold sentimental, artistic, or cultural value and can appreciate in worth over time.",
  },
  sports: {
    image: "/images/categorys/sports.png",
    description:
      "Sports equipment refers to the gear, tools, and accessories used for various sports, fitness activities, and physical training. These products are designed to enhance performance, ensure safety, and support athletes of all levels, from beginners to professionals.",
  },
  kids: {
    image: "/images/categorys/kids.png",
    description:
      "Kids products include a wide range of essential items designed for the care, comfort, and development of infants and young children. These products focus on safety, durability, and functionality to support parenting and child growth.",
  },
  beauty: {
    image: "/images/categorys/beauty.png",
    description:
      "Explore a variety of makeup essentials, from foundations and lipsticks to eyeshadows and more. Find everything you need to enhance your natural beauty or create bold looks effortlessly.",
  },
  grocery: {
    image: "/images/categorys/grocery.png",
    description:
      "Grocery products include a wide variety of food and household essentials used for daily consumption and home necessities. These items are typically sold in supermarkets, convenience stores, and online markets, providing essential ingredients for cooking, snacking, and household management.",
  },
};

function CategoryPage() {
  const { category } = useParams();
  const categoryInfo = categoryData[category] || {
    image: "/images/categorys/default.png",
    description: "Explore our categories to find the best products for you.",
  };

  return (
    <>
      <Navbar />
      <Background2 />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={categoryInfo.image}
              alt={category}
              className="w-full max-w-2xl h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-6xl font-semibold font-nunito text-center pt-[145px]">
              {category.toUpperCase()}
            </h1>
            <p className="text-3xl text-gray-700 leading-relaxed font-inter mt-[35px]">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>
      <Postprofile />
    </>
  );
}

export default CategoryPage;
