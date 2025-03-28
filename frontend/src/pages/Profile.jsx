import React, { useState, useEffect } from "react";
import Topbar from "../components/topbar";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import Laurel from "../assets/images/Laurel2.jpg";
import Icon from "../assets/icons/Add_circle.png";
import { IoBookOutline } from "react-icons/io5";
import Postprofile from "../components/Postprofile";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("followers", profile?.followers + 1);  // เพิ่ม 1 ให้กับจำนวน followers
      formData.append("following", profile?.following + 1);

      console.log("Fromdata:", formData);
      // ส่งข้อมูลการฟอลไปยัง API
      const response = await fetch("http://localhost:5001/addfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: formData.get("userId"), profilename: formData.get("userId") }),
      });
  
      const data = await response.json();
  
      if (data.message) {
        alert(data.message);  // แสดงข้อความการติดตาม
        setIsFollowing(!isFollowing);  // เปลี่ยนสถานะของปุ่ม follow
      } else {
        alert(data.error);  // แสดงข้อผิดพลาด
      }
  
      console.log("Follow action response:", data);
    } catch (error) {
      console.error("Error following:", error);
      alert("Follow action failed");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await fetch(`http://localhost:5001/profile/${userId}`);
        if (!res.ok) throw new Error("Profile not found");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Load profile failed:", err.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <Topbar />
      <Background2 />
      <div className="w-full min-h-screen h-fit bg-cover bg-center flex flex-col ">
        <div className="flex flex-col border-b-1 border-[#767676] ">
          <div className="flex flex-row w-full h-[500px] items-center ">
          <img
            src={profile?.imageUrl}
            alt="pf1"
            className="w-[335px] h-[335px]  ml-[120px] rounded-full"
          />
          <div className="flex flex-col">
          <div className="flex flex-row w-full mb-10 ">
          <div className=" ml-[60px]">
            <h1 className="text-[40px] font-bold ">{profile?.name}</h1>
            <h1 className="text-[34px] text-[#767676]">@{profile?.username}</h1>
          </div>

          <div className="flex flex-row ml-[100px] ">
            <img
              src={Laurel}
              alt="Laurel_L"
              className="w-[70px] h-[70px] object-contain"
            />
            <div>
              <h1 className="text-[30px] font-bold text-center ">{profile?.trades}</h1>
              <h1 className="text-[24px] font-bold text-[#8D8D9E]">trades</h1>
            </div>
            <img
              src={Laurel}
              alt="Laurel_R"
              className="w-[70px] h-[70px] object-contain scale-x-[-1]"
            />
          </div>

          <div className=" ml-[150px] ">
            <h1 className="text-[30px] font-bold text-center">{profile?.followers}</h1>
            <h1 className="text-[24px] font-bold text-[#8D8D9E]">followers</h1>
          </div>

          <div className=" ml-[150px] ">
            <h1 className="text-[30px] font-bold text-center">{profile?.following}</h1>
            <h1 className="text-[24px] font-bold text-[#8D8D9E]">following</h1>
          </div>
        </div>

        <div className="flex justify-center ml-[70px] gap-15 ">
            <button
              onClick={handleFollow}
              className={`w-[400px] h-[60px] text-[20px] rounded-xl cursor-pointer font-semibold ${
                isFollowing
                  ? "bg-gray-400 text-white"
                  : "bg-black text-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button
              onClick={() => navigate("/messages")}
              className="w-[400px] h-[60px] text-[20px] bg-gray-200 rounded-xl font-semibold"
            >
              Message
            </button>
            </div>
          </div>
        </div>
        </div>
        
        <div className="justify-center ml-[90px]">
          <div
            onClick={() => navigate("/uploadpage")}
            className="bg-[#E5F0FF9C] w-[200px] h-[70px] mt-[70px] rounded-2xl flex flex-row items-center justify-center gap-[15px] cursor-pointer"
          >
            <img src={Icon} alt="Add_circle" className="w-[35px] h-[35px]  " />
            <IoBookOutline className="w-[35px] h-[35px] border-2 p-[5px] rounded-xl text-[#767676]" />
            <h1 className="text-[25px] ">POST</h1>
          </div>
        </div>
        <Postprofile />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
