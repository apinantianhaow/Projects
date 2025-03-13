import { useState } from "react";

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div
      className="relative w-[300px] h-[300px] flex justify-center items-center cursor-pointer"
      onClick={() => document.getElementById("fileInput").click()}
    >
      {/* ถ้ามีรูปแสดงรูปเต็มกรอบ ถ้าไม่มีแสดงกรอบอัปโหลด */}
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      ) : (
        <div
          className="flex flex-col justify-center items-center rounded-xl border-4 border-dashed border-gray-400 w-full h-full p-6"
        >
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg border-2 border-purple-700 pointer-events-none">
            + Add photos
          </button>
          <p className="mt-4 text-sm text-gray-500 text-center pointer-events-none">
            Add photos manually or just
            <br />
            drag and drop them here
          </p>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default ImageUploader;
