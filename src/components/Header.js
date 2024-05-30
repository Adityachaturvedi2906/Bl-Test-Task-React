import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { LuBellDot, LuLogOut } from "react-icons/lu";

const Header = () => {
  return (
    <div className='flex px-7 py-7 items-center justify-between w-[95vw]'>
        <div className=''>
            <h2 className='text-2xl font-bold text-[#5a5ccc]'>Covid-19</h2>
            <h2 className='text-xs text-gray-400 leading-[7px] font-semibold'>Live Tracker Dashboard</h2>
        </div>
        <div>
            <input placeholder='Search...' className='p-2 ps-4 rounded-full text-sm shadow-md' />
        </div>
        <div className='flex items-center'>
            <button className='text-3xl text-[#5254b8]'><FaRegCircleUser /></button>
            <div className="h-8 border-l border-gray-300 mx-4"></div>
            <button className='text-gray-400 font-bold text-lg'><LuBellDot /></button>
            <button className='text-gray-400 font-bold text-lg mx-3'><LuLogOut /></button>
        </div>
    </div>
  )
}

export default Header