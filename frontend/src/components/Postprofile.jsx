import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Postprofile({ category: propCategory }) {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams(); // รับจาก URL ถ้าไม่มี props

  const category = propCategory || routeCategory; // ใช้ props ก่อน, fallback เป็น route
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5001/items");
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item._id,
          category: item.category?.toLowerCase(),
          title: item.title,
          img: item.images?.[0] || "src/assets/images/default.png",
        }));

        const filteredData = category
          ? formattedData.filter(
              (item) => item.category === category.toLowerCase()
            )
          : formattedData;

        setProducts(filteredData);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchImages();
  }, [category]);

  return (
    <div className="w-full min-h-auto h-fit bg-cover bg-center flex flex-col py-[25px] px-4 mt-6.5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-[40px] gap-x-[25px] max-w-[1900px] mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="p-[15px] w-full max-w-[300px] flex flex-col h-[450px]"
          >
            <div
              className="w-full h-[300px] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/${product.category}/${product.title}`)}
            >
              <img
                src={product.img || "src/assets/images/default.png"}
                className="w-full h-full object-cover"
                alt={product.title}
              />
            </div>

            <div className="flex flex-col mt-3 px-2">
              <h6 className="text-[18px] font-bold leading-tight line-clamp-2">
                {product.title}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Postprofile;
