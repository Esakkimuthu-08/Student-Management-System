import React, { useEffect, useState } from 'react'
import { BiSupport } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import jplogo from "../../public/assets/jplogo.png"


function Dashboard() {

  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    const userDetail = sessionStorage.getItem('user')
    setUserDetails(JSON.parse(userDetail));
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.reload()
  }

  return (
    <div>
      <div className='bg-white h-24 flex justify-between items-center px-5 md:px-15'>
        <img src={jplogo} className='h-[19] w-[20%] ' alt="" srcset="" />
      </div>
      <div className=' w-[90%] mx-auto'>
        <div className='flex justify-between items-center mt-5'>
          <div className=''>
            <h1 className='text-gray-500 font-bold mb-5 text-[25px]'>Welcome to your Dashboard</h1>
            <p>Track student performance, manage classes, and simplify school operations — all in one place.</p>
          </div>
          <div className='border border-black px-6 py-2 rounded-sm hidden md:block'>
            <div className='flex gap-6 items-center'>
              <div>
                <img className='rounded-full h-16 w-16' src="https://github.com/shadcn.png" alt="@shadcn" />
              </div>
              <div className='flex flex-col'>
                <div className='font-semibold flex gap-2 justify-between'>
                  <span>ID</span>
                  :
                  <span>{userDetails.id}</span></div>
                <div className='font-semibold flex gap-2 justify-between'>
                  <span>
                    NAME
                  </span>
                  :
                  <span> {userDetails.username}</span>
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className='text-[#FCFAFA] w-full mt-4 bg-blue-400 py-2 px-9 rounded-md transition duration-500 ease-in-out  hover:bg-blue-600 hover:scale-125'>Log out</button>
          </div>
        </div>
        <div className='mt-10 mb-8'>
          <h1 className='font-semibold text-[36px] text-gray-800 '>Welcome to your dashboard, J.P.College of Engineering</h1>
        </div>
        <div>
          <a href="https://jpcoe.ac.in/" className='font-semibold text-[18px] text-blue-500 animate-pulse' target='_blank'>jpcollegeofengineering.com</a>
        </div>
        <div className=''>
          <div className='w-[45%] mt-16 transition duration-500 ease-in-out hover:scale-110 mb-10 '>
            <h1 className='font-medium text-[24px] text-gray-600 flex items-center gap-2 mb-5' > <RiAdminFill />Add other admins </h1>
            <p className='text-gray-400'> Invite new admins to join your team and manage various aspects of the system. Assign roles and permissions to ensure smooth operation and effective management.
            </p>
          </div>
          <div className='w-[45%] mt-16 transition duration-500 ease-in-out hover:scale-110 '>
            <h1 className='font-medium text-[24px] text-gray-600 flex items-center gap-2 mb-5'> <PiStudentFill />Add students </h1>
            <p className='text-gray-400'> Easily add new students to your system. Enter their details and assign them to classes with just a few clicks.
            </p>
          </div>
        </div>
        <div className='mt-16'>
          <button className=' bg-[#152259] flex items-center animate-pulse gap-5 rounded-full px-10 py-3 text-gray-50'>
            <BiSupport />
          <a href="https://jpcoe.ac.in/contact.php" className='font-semibold text-[18px] text-white' target='_blank'>Contact Us</a>            
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard