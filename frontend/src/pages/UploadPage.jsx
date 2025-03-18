import { useState } from "react";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import ImageUploader from "../components/ImageUploader";
import CategorySelector from "../components/CategorySelector";
import ConditionSelector from "../components/ConditionSelector";
import DesiredItemsSelector from "../components/DesiredItemsSelector";
import IconImage from "../assets/icons/icon.png";

function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionNote, setConditionNote] = useState("");
  const [selectedDesiredItem, setSelectedDesiredItem] = useState("");
  const [desiredNote, setDesiredNote] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(null);

  const handlePost = () => {
    window.location.href = "/profile";//เปลี่ยนเป็นหน้าอื่นได้
  };

  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div className="flex justify-center items-center min-h-screen bg-white p-4">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg flex flex-wrap md:flex-nowrap md:space-x-16">
          
          {/* อัพโหลดภาพ */}
          <div className="flex justify-center w-full md:w-auto">
            <ImageUploader />
          </div>

          {/* กรอกข้อมูล */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4 mt-6 md:mt-0">
            
            {/* Title */}
            <div>
              <h2 className="font-semibold text-[28px] mt-[130px]">Title</h2>
              <textarea
                className="w-full bg-[#D9D9D9] text-black rounded-[20px] p-4 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-[28px]">Description</label>
              <textarea
                className="w-full bg-[#D9D9D9] text-black rounded-[20px] p-4 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                placeholder="Describe your item or write your public message"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            {/* Category */}
            <div className="flex justify-between items-center w-full">
              <label className="font-semibold text-[24px] mt-[10px]">Category</label>
              <button
                className="text-purple-600 font-bold text-[24px]  mt-[10px]"
                onClick={() => setShowModal("category")}
              >
                Select
              </button>
            </div>

            {/* Condition */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[24px] mt-[30px]">
                  Condition
                </label>
                <button
                  className="text-purple-600 font-bold text-[24px] mt-[30px]"
                  onClick={() => setShowModal("condition")}
                >
                  Select
                </button>
              </div>
              <textarea
                value={conditionNote}
                onChange={(e) => setConditionNote(e.target.value)}
                className="w-full bg-[#D9D9D9] text-black rounded-[20px] p-4 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                placeholder="Product Condition"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            {/* Desired Items */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[24px] mt-[10px]">
                  Desired Items
                </label>
                <button
                  className="text-purple-600 font-bold text-[24px] "
                  onClick={() => setShowModal("desired")}
                >
                  Select
                </button>
              </div>
              <div className="relative w-[229px] h-[130px]">
                <img
                  src={IconImage}
                  alt="Icon"
                  className="absolute top-7 left-4 w-6 h-6"
                />
              <textarea
                value={desiredNote}
                onChange={(e) => setDesiredNote(e.target.value)}
                className="w-[229px] h-[130px] bg-[#D9D9D9] text-black rounded-[20px] p-4 pl-12 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                placeholder="Category The item you want"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
            </div>

            <button
              className="w-full bg-purple-600 text-white p-2 rounded-md mt-[10px]"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {showModal === "category" && (
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          closeModal={() => setShowModal(null)}
        />
      )}
      {showModal === "condition" && (
        <ConditionSelector
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          closeModal={() => setShowModal(null)}
        />
      )}
      {showModal === "desired" && (
        <DesiredItemsSelector
          selectedDesiredItem={selectedDesiredItem}
          setSelectedDesiredItem={setSelectedDesiredItem}
          closeModal={() => setShowModal(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default UploadPage;
