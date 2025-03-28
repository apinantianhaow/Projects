import React from "react";
// นำเข้า Swiper และ SwiperSlide จากไลบรารี swiper/react สำหรับทำ carousel
import { Swiper, SwiperSlide } from "swiper/react";
// นำเข้า Link จาก react-router-dom เพื่อให้กดลิงก์ไปหน้าหมวดหมู่โดยไม่รีเฟรชหน้า
import { Link } from "react-router-dom";
// นำเข้าไฟล์ CSS พื้นฐานของ Swiper
import "swiper/css";

// สร้างคอมโพเนนต์ Category
function Category() {
  return (
    <section className="text-center mt-[200px]">
      {/* หัวข้อของ section */}
      <h2 className="text-[60px] font-kaisei mb-6">CATEGORY</h2>

      {/* กล่องพื้นหลังสีเทา สำหรับวาง Carousel */}
      <div className="bg-[#767676] pb-12 pt-6 flex justify-center mt-[40px] min-h-[450px] h-auto">
        {/* Swiper (carousel) สำหรับแสดงรายการหมวดหมู่แบบเลื่อนข้าง */}
        <Swiper
          slidesPerView={"auto"} // จำนวนสไลด์ที่แสดง ขึ้นอยู่กับขนาดหน้าจอ
          spaceBetween={15}      // ระยะห่างระหว่างสไลด์เริ่มต้น
          breakpoints={{         // ปรับค่าแสดงผลตามความกว้างของหน้าจอ
            320: { slidesPerView: 1.3, spaceBetween: 30 },
            480: { slidesPerView: 2, spaceBetween: 25 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 12 },
            1440: { slidesPerView: 5, spaceBetween: 10 },
          }}
          className="px-10 md:px-16 font-nunito font-semibold"
        >
          {/* วนลูปรายการหมวดหมู่ทั้งหมด */}
          {[
            "ELECTRONICS",
            "CLOTHING",
            "BOOKS",
            "HOME",
            "PLANTS",
            "ART&HANDMADE",
            "COLLECTIBLES",
            "SPORTS",
            "KIDS",
            "BEAUTY",
            "GROCERY",
          ].map((category, index) => (
            // แต่ละ slide ของ Swiper (แต่ละหมวดหมู่)
            <SwiperSlide key={index} className="flex justify-center first:ml-11 last:mr-11">
              {/* สร้างลิงก์ไปยังหน้าหมวดหมู่ เช่น /category/books */}
              <Link to={`/category/${category.toLowerCase()}`}>
                {/* กล่องหมวดหมู่ที่มีภาพและชื่อหมวด */}
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl max-w-[280px] w-full h-[320px] hover:scale-105 transition-transform cursor-pointer shadow-2xl">
                  
                  {/* กล่องภาพของหมวดหมู่ */}
                  <div className="w-[240px] h-[240px] flex items-center justify-center">
                    <img
                      // ดึงภาพจากโฟลเดอร์ public/images/categorys/[ชื่อหมวด].png
                      src={`/images/categorys/${category.toLowerCase()}.png`}
                      alt={category}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* แสดงชื่อหมวดหมู่ด้านล่างรูป */}
                  <p className="text-[30px] tracking-wide mt-3">{category}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Category;
