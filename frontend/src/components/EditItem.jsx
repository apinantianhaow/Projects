import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import ImageUploader from "./ImageUploader1";
import CategorySelector from "../components/CategorySelector";
import ConditionSelector from "../components/ConditionSelector";
import DesiredItemsSelector from "../components/DesiredItemsSelector";
import IconImage from "../assets/icons/icon.png";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionNote, setConditionNote] = useState("");
  const [selectedDesiredItem, setSelectedDesiredItem] = useState("");
  const [desiredNote, setDesiredNote] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5001/items/id/${id}`);
        const data = await res.json();

        setTitle(data.title || "");
        setDescription(data.description || "");
        setSelectedCategory(data.category || "");
        setSelectedCondition(data.condition || "");
        setConditionNote(data.conditionNote || "");
        setSelectedDesiredItem(data.desiredItems || "");
        setDesiredNote(data.desiredNote || "");

        // convert image base64 to File-like objects not required for edit
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch item", err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("condition", selectedCondition);
    formData.append("conditionNote", conditionNote);
    formData.append("desiredItems", selectedDesiredItem);
    formData.append("desiredNote", desiredNote);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    try {
      const res = await fetch(`http://localhost:5001/items/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Item updated successfully!");
        navigate(`/items/${selectedCategory}/${result.item.slug}`);
      } else {
        alert("❌ Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div className="flex justify-center items-center min-h-screen bg-white p-4">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg flex flex-wrap md:flex-nowrap md:space-x-16">
          <div className="flex justify-center w-full md:w-auto">
            <ImageUploader setImages={setImages} />
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-4 mt-6 md:mt-0">
            <div>
              <h2 className="font-semibold text-[28px] mt-[130px]">Title</h2>
              <textarea
                className="w-full bg-[#D9D9D9] text-black rounded-[20px] p-4 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              ></textarea>
            </div>

            <div>
              <label className="font-semibold text-[28px]">Description</label>
              <textarea
                className="w-full bg-[#D9D9D9] text-black rounded-[20px] p-4 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your item"
              ></textarea>
            </div>

            <div className="flex justify-between items-center w-full">
              <label className="font-semibold text-[24px] mt-[10px]">Category</label>
              <button className="text-purple-600 font-bold text-[24px] mt-[10px]" onClick={() => setShowModal("category")}>
                Select
              </button>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[24px] mt-[25px]">Condition</label>
                <button className="text-purple-600 font-bold text-[24px] mt-[25px]" onClick={() => setShowModal("condition")}>
                  Select
                </button>
              </div>
              <textarea
                value={conditionNote}
                onChange={(e) => setConditionNote(e.target.value)}
                className="w-full bg-[#D9D9D9] text-black rounded-[20px] p-4 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                placeholder="Condition detail"
              ></textarea>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-[24px] mt-[10px]">Desired Items</label>
                <button className="text-purple-600 font-bold text-[24px]" onClick={() => setShowModal("desired")}>Select</button>
              </div>
              <div className="relative w-[229px] h-[130px]">
                <img src={IconImage} alt="icon" className="absolute top-7 left-4 w-6 h-6" />
                <textarea
                  value={desiredNote}
                  onChange={(e) => setDesiredNote(e.target.value)}
                  className="w-[229px] h-[130px] bg-[#D9D9D9] text-black rounded-[20px] p-4 pl-12 text-lg outline-none border-none resize-none overflow-hidden mt-[10px]"
                  placeholder="Item you want"
                ></textarea>
              </div>
            </div>

            <button onClick={handleUpdate} className="w-full bg-purple-600 text-white p-2 rounded-md mt-[10px]">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showModal === "category" && (
        <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} closeModal={() => setShowModal(null)} />
      )}
      {showModal === "condition" && (
        <ConditionSelector selectedCondition={selectedCondition} setSelectedCondition={setSelectedCondition} closeModal={() => setShowModal(null)} />
      )}
      {showModal === "desired" && (
        <DesiredItemsSelector selectedDesiredItem={selectedDesiredItem} setSelectedDesiredItem={setSelectedDesiredItem} closeModal={() => setShowModal(null)} />
      )}

      <Footer />
    </div>
  );
}

export default EditItem;