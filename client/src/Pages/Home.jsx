import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../Redux/User/UserSlice';

export default function Home() {
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('item'));
    if(currentUser == null){
          dispatch(signInSuccess(items))
    }
  }, []);
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}
