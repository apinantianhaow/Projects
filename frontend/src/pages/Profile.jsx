import React from "react";
import Topbar from "../components/Topbar";
import Background2 from "../components/Background2";
import Image from "../../src/assets/profiles/image14.png";
import Footer from "../components/Footer";
import Laurel from "../assets/images/Laurel2.jpg";
import Icon from "../assets/icons/Add_circle.png";
import { IoBookOutline } from "react-icons/io5";
import Postprofile from "../components/Postprofile";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
    return (
        <div>
            <Topbar />
            <Background2 />
            <div className="w-full min-h-screen h-fit bg-cover bg-center flex flex-col ">
                <div className="flex flex-row w-full h-[500px] items-center border-b-1 border-[#767676]">
                     <img src={Image} alt="pf1" className="w-[335px] h-[335px]  ml-[120px]" /> 
                     <div className=" ml-[60px]">
                        <h1 className="text-[40px] font-bold ">
                          Lnw ZAzakub
                        </h1>
                        <h1 className="text-[34px] text-[#767676]">
                          @Lnw ZAzakub
                        </h1>
                     </div>
                     
                     
                     <div className="flex flex-row ml-[100px] ">
                        <img src={Laurel} alt="Laurel_L" className="w-[70px] h-[70px] object-contain" />
                        <div>
                        <h1 className="text-[30px] font-bold text-center ">
                          15
                        </h1>
                        <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                          trades
                        </h1>
                     </div> 
                        <img src={Laurel} alt="Laurel_R" className="w-[70px] h-[70px] object-contain scale-x-[-1]" />
                     </div>
                     
                     
                     <div className=" ml-[150px] ">
                        <h1 className="text-[30px] font-bold text-center">
                          24
                        </h1>
                        <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                          followers
                        </h1>
                     </div>
                     
                     
                     <div className=" ml-[150px] ">
                        <h1 className="text-[30px] font-bold text-center">
                          19
                        </h1>
                        <h1 className="text-[24px] font-bold text-[#8D8D9E]">
                          following
                        </h1>
                     </div>
                </div>

                
                <div className="justify-center ml-[90px]">
                  <div onClick={() => navigate("/uploadpage")} className="bg-[#E5F0FF9C] w-[200px] h-[70px] mt-[70px] rounded-2xl flex flex-row items-center justify-center gap-[15px] cursor-pointer">
                  <img src={Icon} alt="Add_circle" className="w-[35px] h-[35px]  " />
                  <IoBookOutline className="w-[35px] h-[35px] border-2 p-[5px] rounded-xl text-[#767676]"/>
                  <h1 className="text-[25px] "> 
                    POST
                    </h1>
                  </div>
                
                </div>
                <Postprofile/>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;