import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Background2 from "../components/Background2";
import bgImage from "../assets/images/image1.png";
import { TbPhotoPlus } from "react-icons/tb";
import imageCompression from "browser-image-compression";

function RegisterPhoto() {
  const location = useLocation();
  const { name, username } = location.state || {};
  console.log(name, username);

  const [image, setImage] = useState();

  const navigate = useNavigate();
  const fileInput = useRef(null);

  const handleopenfile = () => {
    fileInput.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 1024, 
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log("ขนาดไฟล์ก่อนบีบอัด:", file.size);
        console.log("ขนาดไฟล์หลังบีบอัด:", compressedFile.size);
        setImage(compressedFile);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการบีบอัดไฟล์:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
    
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
  
      if (image) {
        formData.append("image", image);
      }
  
      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        body: formData,
      }); 

      const data = await response.json();
      if (data.message ){
        alert(data.message);
        navigate("/sign")
      } else {
        alert(data.error);
      }
  
      console.log("Profile saved:", data);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <Background2 />
      <div
        className="w-full min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-132 h-133">
          <div>
            <h className="font-bold text-[40px]">Setup your account</h>
            <br />
            <h className="text-[25px] ">Add your photo</h>
          </div>

          <div
            onClick={handleopenfile}
            className="w-[460px]  h-[220px] bg-[#F2F2F2] rounded-2xl justify-center items-center flex flex-col mt-5 mb-10"
          >
            <TbPhotoPlus className=" w-[100px]  h-[100px] text-black " />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Compressed Preview"
                style={{ height: "100%" }}
              />
            ) : (
              <div className="mb-4 mt-5">
                <label className="block text-[#1E1E1E] text-sm font-bold mb-2">
                  Add your photo
                </label>
                <input
                  onChange={handleFileChange}
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInput}
                />
              </div>
            )}
          </div>

          <button
            onClick={() => handleSave()}
            style={{
              backgroundColor: "#2C2C2C",
            }}
            className="w-full text-white py-2 rounded-lg hover:bg-[#2C2C2C] transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPhoto;
