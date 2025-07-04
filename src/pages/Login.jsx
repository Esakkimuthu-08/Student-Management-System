import React, { useEffect, useState } from 'react'
import { MdOutlineLogin } from 'react-icons/md'
import { GetAllloginUsers } from '../api'
import axios from 'axios'

export const Login = ({ children }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async () => {
     
    if (username && password) {
      let url = GetAllloginUsers;
      try {
        const res = await axios.get(url);
        const user = res.data.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          setIsLoggedIn(true);
        } else {
          alert("Incorrect Username or password");
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  if (isLoggedIn) {
    return <>{children}</>
  }

  return (
    <div className='bg-[url(../../public/assets/login-bg.jpg)] bg-cover bg-center'>
      <div className='flex  w-[80%]  mx-auto justify-center items-center h-[100vh]'>
        <div className='border bg-white shadow-custom rounded-lg'>
          <h1 className='font-extrabold text-[30px] my-10 mx-10'>STUDENT MANAGEMENT SYSTEM</h1>
          <form className='flex flex-col mx-10 my-5' onSubmit={handleSubmit} >
            <label className='font-bold text-[20px] mb-5'>Username</label>
            <input
              className='rounded-md border border-black py-2 px-4 mb-5'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              placeholder='Enter your username'
            />
            <label className='font-bold text-[20px] mb-5'>Password</label>
            <input
              className='rounded-md border border-black py-2 px-4 mb-5'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Enter your password'
            />
            <div className='flex w-[20%] mx-auto rounded-md p-1 font-extrabold mb-10 justify-center bg-black text-white'>
              <button className='flex items-center' type='submit'>
                Login <MdOutlineLogin size={30} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
