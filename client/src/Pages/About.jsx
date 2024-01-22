import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useEffect } from 'react';
import { signInSuccess } from '../Redux/User/UserSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function About() {

  const token = localStorage.getItem('item')
  // console.log(token)

//   const config = {
//     headers: { Authorization: `Bearer${token}` }
// };

// const bodyPerameters = {
//   'accessToken': 'iahfiuhsnknsjOCisahif'
// }
async ()=>{
  const res = await axios.get('http://localhost:5000/api/about',
  // bodyPerameters,
  {headers: {'authorization': token}})
  .catch((err)=>{console.log("Not Working : ",err.message)})
}

  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
    const items = localStorage.getItem('item');
    if(items != null){
      const decoded = jwtDecode(items);
          dispatch(signInSuccess(decoded['user']));
    }
  }, []);
  return (
    <div>
      <h1>about</h1>
    </div>
  )
}
