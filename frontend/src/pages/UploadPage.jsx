import { useState } from "react";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import ImageUploader from "../components/ImageUploader";
import CategorySelector from "../components/CategorySelector";
import ConditionSelector from "../components/ConditionSelector";
import DesiredItemsSelector from "../components/DesiredItemsSelector";

function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionNote, setConditionNote] = useState(""); // ใช้พิมพ์หมายเหตุ
  const [selectedDesiredItem, setSelectedDesiredItem] = useState("");
  const [desiredNote, setDesiredNote] = useState(""); // ใช้พิมพ์หมายเหตุ
  const [title, setTitle] = useState(""); // ให้ title เป็น textarea ขยายได้
  const [showModal, setShowModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handlePost = () => {window.location.href = "/sign";}; // ไปที่หน้า /sign ทันที(เปลี่ยนหน้าได้)

  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg flex flex-row space-x-16">
          
          {/* อัพโหลดภาพ */}
          <div className="w-1/2">
            <ImageUploader />
          </div>

          {/* กรอกข้อมูล */}
          <div className="w-1/2 flex flex-col space-y-4">
            
            {/* Title */}
            <div>
              <label className="font-semibold">Title</label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows="1"
                className="w-full p-2 bg-[#D9D9D9] text-black rounded-md mt-1 outline-none focus:ring-0 resize-none overflow-hidden"
                placeholder="Enter title"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold">Description</label>
              <textarea
                rows="4"
                className="w-full p-2 bg-[#D9D9D9] text-black rounded-md mt-1 outline-none focus:ring-0 resize-none overflow-hidden"
                placeholder="Description your item or write your public message"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            {/* Category */}
            <div className="flex justify-between items-center">
              <label className="font-semibold">Category</label>
              <button
                className="text-purple-600"
                onClick={() => setShowModal("category")}
              >
                Select
              </button>
            </div>

            {/* Condition */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold">Condition</label>
                <button
                  className="text-purple-600"
                  onClick={() => setShowModal("condition")}
                >
                  Select
                </button>
              </div>

              <textarea
                value={conditionNote}
                onChange={(e) => setConditionNote(e.target.value)}
                rows="1"
                className="w-full p-2 bg-[#D9D9D9] text-black rounded-md mt-2 outline-none focus:ring-0 resize-none overflow-hidden border-none"
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
                <label className="font-semibold">Desired Items</label>
                <button
                  className="text-purple-600"
                  onClick={() => setShowModal("desired")}
                >
                  Select
                </button>
              </div>

              <textarea
                value={desiredNote}
                onChange={(e) => setDesiredNote(e.target.value)}
                rows="1"
                className="w-full p-2 bg-[#D9D9D9] text-black rounded-md mt-2 outline-none focus:ring-0 resize-none overflow-hidden border-none"
                placeholder="Category The item you want"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            <button
              className="w-full bg-purple-600 text-white p-2 rounded-md"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* เปิด Modal ตามค่าที่ถูกเลือก */}
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
