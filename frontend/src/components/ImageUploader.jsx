import { useState } from "react";
import UploadIcon from "../assets/icons/Image.png"; 

function ImageUploader({ setImages }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
  
      // ✅ ส่งไฟล์จริงกลับไปให้ UploadPage
      setImages([file]);
    }
  };
  

  return (
    <div className="flex flex-col items-center">
      <h1
        className="text-3xl font-regula text-[60px] mb-4 ml-[-60px] mt-[10px]"
        style={{ fontFamily: "Kaisei HarunoUmi, sans-serif" }}
      >
        Create a new post
      </h1>

    <div
      className="relative w-[552px] h-[553px] flex justify-center items-center cursor-pointer mt-[50px] mr-[30px]"
      onClick={() => document.getElementById("fileInput").click()}
    >
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      ) : (
        <div className="flex flex-col justify-center items-center rounded-xl border-8 border-dashed border-black w-full h-full p-6 ml-[-20px]">
          <img src={UploadIcon} alt="Upload Icon" className="w-24 h-24 mb-4" />

          <button
            className="text-white font-semibold mt-[30px]"
            style={{
              width: "264px",
              height: "64px",
              backgroundColor: "#761FAC",
              opacity: "0.9",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add Photos
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
  </div>
  );
}

export default ImageUploader;