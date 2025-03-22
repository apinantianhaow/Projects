import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";

function Category() {
  return (
    <section className="text-center mt-[200px]">
      <h2 className="text-[60px] font-kaisei mb-6">CATEGORY</h2>
      <div className="bg-[#767676] pb-12 pt-6 flex justify-center mt-[40px] min-h-[450px] h-auto">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          breakpoints={{
            320: { slidesPerView: 1.3, spaceBetween: 30 },
            480: { slidesPerView: 2, spaceBetween: 25 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 12 },
            1440: { slidesPerView: 5, spaceBetween: 10 },
          }}
          className="px-10 md:px-16 font-nunito font-semibold"
        >
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
            <SwiperSlide key={index} className="flex justify-center first:ml-11 last:mr-11">
              <Link to={`/category/${category.toLowerCase()}`}>
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl max-w-[280px] w-full h-[320px] hover:scale-105 transition-transform cursor-pointer shadow-2xl">
                  <div className="w-[240px] h-[240px] flex items-center justify-center">
                    <img
                      src={`/images/categorys/${category.toLowerCase()}.png`}
                      alt={category}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
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
