import React from "react";
import { FaVirusCovid } from "react-icons/fa6";
import { AiFillAppstore } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="bg-[#26278b] w-[70px] h-screen fixed rounded-t-full rounded-b-full flex z-20 items-center flex-col justify-between">
      <button className="text-white text-lg mt-5">
        <FaVirusCovid />
      </button>
      <button className="text-orange-600 bg-white py-4 text-xl rounded-full px-[2px]">
        <AiFillAppstore />
      </button>
      <button className="text-[#7e7fb8] mb-7">
        <IoSettingsSharp />
      </button>
    </div>
  );
};

export default Sidebar;
