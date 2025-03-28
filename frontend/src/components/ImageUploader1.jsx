import { useState } from "react";
import UploadIcon from "../assets/icons/Image.png";

function ImageUploader({ setImages }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    if (selectedImages.length + files.length <= 4) {
      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      const updatedImages = [...selectedImages, ...newImages];
      setSelectedImages(updatedImages);
      setImages(updatedImages.map((img) => img.file));
    } else {
      alert("You can upload a maximum of 4 images only.");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setImages(updatedImages.map((img) => img.file));
  };

  return (
    <div className="flex flex-col items-center">
      <h1
        className="text-3xl font-regular text-[60px] mb-4 ml-[-60px] mt-[10px]"
        style={{ fontFamily: "Kaisei HarunoUmi, sans-serif" }}
      >
        EDIT POST HERE
      </h1>

      <div className="relative w-[552px] h-[553px] flex justify-center items-center mt-[50px] mr-[30px]">
        {selectedImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 w-full h-full overflow-auto">
            {selectedImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.url}
                  alt={`Uploaded ${idx}`}
                  className="w-full h-[270px] object-cover rounded-xl shadow-md"
                />
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}

            {selectedImages.length < 4 && (
              <div className="flex flex-col justify-center items-center rounded-xl border-8 border-dashed border-black w-full h-[270px] cursor-pointer">
                <img src={UploadIcon} alt="Upload Icon" className="w-12 h-12 mb-2" />
                <button
                  className="text-white font-semibold"
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{
                    width: "150px",
                    height: "40px",
                    backgroundColor: "#761FAC",
                    borderRadius: "10px",
                  }}
                >
                  + Add Photos
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center rounded-xl border-8 border-dashed border-black w-full h-full p-6 ml-[-20px]">
            <img src={UploadIcon} alt="Upload Icon" className="w-24 h-24 mb-4" />

            <button
              className="text-white font-semibold mt-[30px]"
              onClick={() => document.getElementById("fileInput").click()}
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
          multiple
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}

export default ImageUploader;
