import React, { useState } from "react";
import Topbar from "../components/topbar";
import Background2 from "../components/Background2";
import Image from "../../src/assets/profiles/snoopdog.png";
import Footer from "../components/Footer";
import Laurel from "../assets/images/Laurel2.jpg";
import { IoBookOutline } from "react-icons/io5";
import Postprofile from "../components/Postprofile";
import { useNavigate } from "react-router-dom";

function Profile2() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = () =>{
    
      setIsFollowing(!isFollowing)
  }
  return (
    <div>
      <Topbar />
      <Background2 />
      <div className="w-full min-h-screen h-fit bg-cover bg-center flex flex-col ">
        <div className="flex flex-col border-b-1 border-[#767676] ">
          <div className="flex flex-row w-full h-[500px] items-center ">
            <img
              src={Image}
              alt="pf1"
              className="w-[335px] h-[335px]  ml-[120px]"
            />
            <div className="flex flex-col">
            <div className="flex flex-row w-full mb-10 ">
            <div className=" ml-[60px]">
              <h1 className="text-[40px] font-bold ">killua zoldyck</h1>
              <h1 className="text-[34px] text-[#767676]">@killua zoldyck</h1>
            </div>

            <div className="flex flex-row ml-[100px] ">
              <img
                src={Laurel}
                alt="Laurel_L"
                className="w-[70px] h-[70px] object-contain"
              />
              <div>
                <h1 className="text-[30px] font-bold text-center ">295</h1>
                <h1 className="text-[24px] font-bold text-[#8D8D9E]">trades</h1>
              </div>
              <img
                src={Laurel}
                alt="Laurel_R"
                className="w-[70px] h-[70px] object-contain scale-x-[-1]"
              />
            </div>

            <div className=" ml-[140px] ">
              <h1 className="text-[30px] font-bold text-center">981</h1>
              <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                followers
              </h1>
            </div>
            
            <div className=" ml-[140px] ">
              <h1 className="text-[30px] font-bold text-center">2</h1>
              <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                following
              </h1>
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

        <div className="justify-center ml-[130px]">
          <div className="bg-[#E5F0FF9C] w-[170px] h-[70px] mt-[70px] rounded-2xl flex flex-row items-center justify-center gap-[15px] ">
            <IoBookOutline className="w-[35px] h-[35px] border-2 p-[5px] rounded-xl text-black" />
            <h1 className="text-[25px] ">POST</h1>
          </div>
        </div>
        <Postprofile />
      </div>
      <Footer />
    </div>
  );
}

export default Profile2;
