import { useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { useLocation } from "react-router-dom";

export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  const location = useLocation();


  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, []);

  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-center text-3xl m-3 font-sans font-semibold'>Profile</h1>
      <form className='flex flex-col gap-3 m-3'>
        <img src={currentUser.profilepicture} alt='Profile' className='rounded-full h-28 w-28 self-center cursor-pointer'/>
        <input type="text" placeholder='Username' defaultValue={currentUser.username} className='bg-slate-100 rounded-lg p-3'/>
        <input type="email" placeholder='Email' defaultValue={currentUser.email} className='bg-slate-100 rounded-lg p-3'/>
        <input type="text" placeholder='password' className='bg-slate-100 rounded-lg p-3'/>
        <button className='bg-slate-800 text-white rounded-lg uppercase p-3 hover:opacity-90'>Update</button>
      </form>
      <div className='flex justify-between'>
        <span className='text-red-800 ml-3 cursor-pointer'>Delete Account</span>
        <span className='text-red-800 mr-3 cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}
