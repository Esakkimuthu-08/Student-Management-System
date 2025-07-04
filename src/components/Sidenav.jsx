import React from 'react'
import D_logo from '../../public/assets/jpimg.jpg'
import { Link, NavLink } from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { MdFeaturedVideo } from "react-icons/md";


export default function Sidenav({ children }) {
  return (
    <div className='w-full h-[100vh] flex bg-[#FCFAFA]'>
      <div className='w-[15%]  bg-[#152259]  text-[#FFFFFF] '>
        <div className='w-[85%] h-[20vh]  mx-auto my-5 mt-5  '>
          <img className='mx-auto my-0 rounded-3xl' src={D_logo} alt="" />
          <h1 className='text-center font-semibold pt-5 pb-5  border-b-2 animate-pulse'> J.P.College of Engineering</h1>
        </div>
        <div className='w-[80%] mx-auto my-0 grid grid-flow-row  gap-5 mb-10'>
          <NavLink to="/" className={({ isActive }) => `p-2 flex items-center gap-4 transition text-[17px] font-semibold duration-500 ease-in-out hover:scale-110 hover:bg-white hover:text-black hover:rounded-xl ${isActive ? "bg-white text-black rounded-xl" : ""}`}>
            <MdSpaceDashboard size={30} />
            Dashboard
          </NavLink>
          <NavLink
            to="/Teachers"
            className={({ isActive }) => `p-2 flex items-center gap-4 transition text-[17px] font-semibold duration-500 ease-in-out ho9 ver:scale-110 hover:bg-white hover:text-black hover:rounded-xl ${isActive ? "bg-white text-black rounded-xl" : ""}`}>
            <FaChalkboardTeacher size={30} />
            Teachers
          </NavLink>
          <NavLink to="/student" className={({ isActive }) => `p-2 flex items-center gap-4 transition text-[17px] font-semibold duration-500 ease-in-out hover:scale-110 hover:bg-white hover:text-black hover:rounded-xl ${isActive ? "bg-white text-black rounded-xl" : ""}`}>
            <PiStudentFill size={30} />
            Students
          </NavLink>
        </div>
        <div className=' w-[80%] mx-auto my-20  flex gap-10'>
          <Link to="" className=' p-2 flex items-center gap-1 transition duration-500 ease-in-out hover:scale-110 hover:bg-white hover:text-black hover:rounded-xl'>
            <MdFeaturedVideo />
            Features
          </Link>
          <button className=' bg-[#B9D7F1] text-[#000000] rounded-full px-4'>New</button>
        </div>
      </div>
      <div className='w-[85%] bg-gray-100'>
        {children}
      </div>
    </div>
  )
}
