import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Category() {
  return (
    <section className="text-center mt-[185px]">
      <h2 className="text-[65px] font-kaisei">CATEGORY</h2>
      <div
        style={{
          backgroundColor: "#767676",
        }}
        className="pt-5.5 pb-15 h-[500px]"
      >
        <Swiper spaceBetween={15} slidesPerView={4} className="">
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
            <SwiperSlide
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-md h-80 ml-[50px]"
            >
              <div className="flex items-center justify-center">
                <img
                  src={`/images/categorys/${category.toLowerCase()}.png`}
                  alt={category}
                  className="max-w-[300px] max-h-[300px] object-contain rounded-md"
                />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-nunito">{category}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Category;
