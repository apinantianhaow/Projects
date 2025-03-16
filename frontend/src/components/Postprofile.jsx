import React, { useState } from "react";
import { GoHeart } from "react-icons/go";

function Postprofile() {
  const [products] = useState([
    { title: "Father's Day Card", img: "src/assets/images/P1.png", likes: 64 },
    { title: "2x Neoprene Hand Weights, 8lbs", img: "src/assets/images/P2.png", likes: 7 },
    { title: "Super Soaker XP 75 (1993, Larami)", img: "src/assets/images/P3.png", likes: 45 },
    { title: "Original Pastel Snow Scene, 1980...", img: "src/assets/images/P4.png", likes: 81 },
    { title: "Kate Domina Art", img: "src/assets/images/P5.png", likes: 56 },
    { title: "Brand New and Sealed, Carcassonn...", img: "src/assets/images/P6.png", likes: 0 }, // ไม่มีไลก์
    { title: "Brand New, 36 Golf Balls", img: "src/assets/images/P7.png", likes: 0 }, // ไม่มีไลก์
    { title: "Boho Woven Purse Basket", img: "src/assets/images/P8.png", likes: 7 },
    { title: "Bauer Knee HockeyStick, Total One Min...", img: "src/assets/images/P9.png", likes: 0 }, // ไม่มีไลก์
    { title: "Sorel Winter Snow Boots Tivoli, Grey...", img: "src/assets/images/P10.png", likes: 1 },
    { title: "Inca Freestyle Snowboard Dual...", img: "src/assets/images/P11.png", likes: 9 },
    { title: "Ride Snowboard (154-158 cm) w/ K2...", img: "src/assets/images/P12.png", likes: 5 },
    { title: "Valvardad Ikea Dish Drainer,...", img: "src/assets/images/P13.png", likes: 3 },
    { title: "Lock Installation Kit", img: "src/assets/images/P14.png", likes: 6 },
    { title: "Long Oak Floating Shelf, 56 inch X 7 in...", img: "src/assets/images/P15.png", likes: 20 },
  ]);

  return (
    <div className="w-full min-h-auto h-fit bg-cover bg-center flex flex-col py-[25px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-[40px] px-[25px] max-w-[1900px] mx-auto">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg p-[15px] w-full max-w-[300px] flex flex-col h-[450px] ">
            
            <div className="w-full h-[300px] rounded-2xl overflow-hidden">
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