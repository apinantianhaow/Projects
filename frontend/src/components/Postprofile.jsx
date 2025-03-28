import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext"; 

function Postprofile({ category: propCategory }) {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams();
  const category = propCategory || routeCategory;
  const [products, setProducts] = useState([]); // เก็บข้อมูลสินค้า
  const [selectedProductForDelete, setSelectedProductForDelete] = useState(null);

  const { searchTerm } = useSearch(); // ดึง searchTerm จาก context

  // กรองสินค้าโดยใช้ searchTerm
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRightClick = (e, productId) => {
    e.preventDefault();
    setSelectedProductForDelete(productId);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5001/items/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId)); // ลบสินค้าใน state
        setSelectedProductForDelete(null);
        alert("Item deleted successfully");
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5001/items");
        const data = await response.json();

        const formattedData = data.map((item) => ({
          _id: item._id,
          category: item.category?.toLowerCase(),
          title: item.title,
          slug: item.slug,
          img: item.images?.[0] || "src/assets/images/default.png",
        }));

        const filteredData = category
          ? formattedData.filter((item) => item.category === category.toLowerCase())
          : formattedData;

        setProducts(filteredData);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchImages();
  }, [category]);

  return (
    <div className="w-full min-h-auto h-fit bg-cover bg-center flex flex-col py-[25px] px-4 mt-[26px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-[40px] gap-x-[25px] max-w-[1900px] mx-auto">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="p-[15px] w-full max-w-[300px] flex flex-col h-[auto] relative"
            onContextMenu={(e) => handleRightClick(e, product._id)}
          >
            <div
              className="w-full h-[300px] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/items/${product.category}/${product.slug}`)}
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

            {selectedProductForDelete === product._id && (
              <button
                style={{
                  backgroundColor: "#900603",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  position: "absolute",
                  top: "310px",
                  right: "8px",
                  zIndex: 10,
                }}
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Postprofile;
