import React, { useState, useEffect } from "react";
import Topbar from "../components/topbar";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import Laurel from "../assets/images/Laurel2.jpg";
import Icon from "../assets/icons/Add_circle.png";
import { IoBookOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PostprofileuserId from "../components/PostprofileuserId"; 

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    // โหลดโปรไฟล์
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5001/profile/${userId}`);
        if (!res.ok) throw new Error("Profile not found");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Load profile failed:", err.message);
      }
    };

    // โหลดจำนวนโพสต์จาก API
    const fetchPostCount = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/item-count/${userId}`
        );
        const data = await res.json();
        setPostCount(data.count); // สมมุติ backend ส่ง { count: 3 }
      } catch (err) {
        console.error("❌ Error fetching post count:", err);
      }
    };

    fetchProfile();
    fetchPostCount();
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
                  <h1 className="text-[34px] text-[#767676]">
                    @{profile?.username}
                  </h1>
                </div>

                <div className="flex flex-row ml-[100px] ">
                  <img
                    src={Laurel}
                    alt="Laurel_L"
                    className="w-[70px] h-[70px] object-contain"
                  />
                  <div>
                    <h1 className="text-[30px] font-bold text-center ">
                    {Math.max(0, postCount)}
                    </h1>
                    <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                      posts
                    </h1>
                  </div>
                  <img
                    src={Laurel}
                    alt="Laurel_R"
                    className="w-[70px] h-[70px] object-contain scale-x-[-1]"
                  />
                </div>

                <div className=" ml-[150px] ">
                  <h1 className="text-[30px] font-bold text-center">
                    {Math.max(0, profile?.followers)}
                  </h1>
                  <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                    followers
                  </h1>
                </div>

                <div className=" ml-[150px] ">
                  <h1 className="text-[30px] font-bold text-center">
                    {Math.max(0, profile?.following)}
                  </h1>
                  <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                    following
                  </h1>
                </div>
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

        <PostprofileuserId userId={localStorage.getItem("userId")} />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
