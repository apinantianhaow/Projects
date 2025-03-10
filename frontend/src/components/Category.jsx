import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Category() {
  return (
    <section className="text-center mt-12">
      <h2 className="text-xl font-bold">CATEGORY</h2>
      <div className="bg-[#767676] pt-5 pb-15">
        <Swiper spaceBetween={10} slidesPerView={4} className="">
          {[
            "ELECTRONICS",
            "CLOTHING",
            "BOOKS",
            "HOME",
            "PLANTS",
            "ART & HANDMADE",
            "COLLECTIBLES",
            "SPORTS",
            "KIDS",
            "BEAUTY",
            "GROCERY",
          ].map((category, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-md h-80"
            >
              <div className="flex items-center justify-center">
                <img
                  src={`/images/categorys/${category.toLowerCase()}.png`}
                  alt={category}
                  className="max-w-46 object-contain rounded-md"
                />
              </div>
              <div className="mt-4">
                <p className="text-2xl ">{category}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Category;
