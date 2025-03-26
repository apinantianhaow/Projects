import React, { useState, useEffect } from "react"; 
import { useNavigate} from "react-router-dom";

function Postprofile() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // ✅ ดึงข้อมูลจาก API เมื่อโหลดหน้า
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5001/items");
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item._id,
          category: item.category,
          title: item.title,
          img: item.images.length > 0 ? item.images[0] : "src/assets/images/default.png", // ใช้รูปแรก หรือรูป default
          likes: Math.floor(Math.random() * 100), // **จำลองจำนวนไลก์**
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full min-h-auto h-fit bg-cover bg-center flex flex-col py-[25px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-[40px] px-[25px] max-w-[1900px] mx-auto ">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg p-[15px] w-full max-w-[300px] flex flex-col h-[450px] ">
            
            <div className="w-full h-[300px] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/${product.category}/${product.title}`)}
            >
              <img src={product.img} className="w-full h-full object-cover" alt={product.title} />
            </div>

            <div className="flex flex-col flex-grow  mt-3 px-2">
              <h6 className="text-[18px] font-bold">{product.title}</h6>           
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Postprofile;