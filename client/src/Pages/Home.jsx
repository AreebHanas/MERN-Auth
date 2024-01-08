import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../Redux/User/UserSlice';

export default function Home() {

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, []);
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}
