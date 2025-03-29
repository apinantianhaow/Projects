import React, { useState, useEffect } from "react";
import Topbar from "../components/topbar";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import Laurel from "../assets/images/Laurel2.jpg";
import { IoBookOutline } from "react-icons/io5";
import PostprofileuserId from "../components/PostprofileuserId";
import { useParams, useNavigate } from "react-router-dom";

function Profile2() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [postCount, setPostCount] = useState(0);

  const handleFollow = async () => {
    try {
      const loggedInUserId = localStorage.getItem("userId");
      if (!loggedInUserId) {
        alert("Please log in first!");
        return;
      }

      const url = isFollowing
        ? "http://localhost:5001/removefollow"
        : "http://localhost:5001/addfollow";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loggedInUserId,
          profilename: userId,
        }),
      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        setIsFollowing(!isFollowing);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error following:", error);
      alert("Follow action failed");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const loggedInUserId = localStorage.getItem("userId"); // ผู้ใช้งานที่ล็อกอินอยู่
        if (!userId || !loggedInUserId) return;
  
        const res = await fetch(`http://localhost:5001/profile/${userId}`);
        if (!res.ok) throw new Error("Profile not found");
  
        const data = await res.json();
        setProfile(data);
  
        // ✅ ตรวจสอบว่าเป็นโปรไฟล์ของตัวเองมั้ย
        if (loggedInUserId === userId) {
          setIsLoggedInUser(true);
        } else {
          setIsLoggedInUser(false);
        }
  
        // ✅ ตรวจสอบ followers
        if (Array.isArray(data.followers)) {
          setIsFollowing(data.followers.includes(loggedInUserId));
        } else if (typeof data.followers === "number") {
          setIsFollowing(false);   // หรือปรับตาม logic ของคุณ
        } else {
          console.warn("⚠️ followers is not an array or number:", data.followers);
          setIsFollowing(false);
        }
  
      } catch (err) {
        console.error("❌ Load profile failed:", err.message);
      }
    };

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
  }, [userId]);
  

  return (
    <div>
      <Topbar />
      <Background2 />
      <div className="w-full min-h-screen h-fit bg-cover bg-center flex flex-col">
        <div className="flex flex-col border-b-1 border-[#767676]">
          <div className="flex flex-row w-full h-[500px] items-center">
            <img
              src={profile?.imageUrl}
              alt="pf1"
              className="w-[335px] h-[335px] ml-[120px] rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex flex-row w-full mb-10">
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
                    {profile?.followers}
                  </h1>
                  <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                    followers
                  </h1>
                </div>

                <div className=" ml-[150px] ">
                  <h1 className="text-[30px] font-bold text-center">
                    {profile?.following}
                  </h1>
                  <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                    following
                  </h1>
                </div>
              </div>

              {/* ปุ่ม "Follow" และ "Message" จะแสดงก็ต่อเมื่อไม่ใช่โปรไฟล์ของตัวเอง */}
              {!isLoggedInUser && (
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
                
              )}
            </div>
          </div>
        </div>

        <div className="justify-center ml-[130px]">
          <div className="bg-[#E5F0FF9C] w-[170px] h-[70px] mt-[70px] rounded-2xl flex flex-row items-center justify-center gap-[15px] ">
            <IoBookOutline className="w-[35px] h-[35px] border-2 p-[5px] rounded-xl text-black" />
            <h1 className="text-[25px] ">POST</h1>
          </div>
        </div>
        <PostprofileuserId />
      </div>
      <Footer />
    </div>
  );
}

export default Profile2;
