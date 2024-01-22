import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import app from "../fireBase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/User/UserSlice.js";
import {useNavigate} from "react-router-dom"
import { jwtDecode } from 'jwt-decode';
// import { useEffect } from "react";
// import axios from "axios";

export default function OAuth() {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const gooleClickHandler = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            // provider.addScope('profil')
            // provider.addScope('email')
            const auth =getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:5000/api/googleauth',
            {
            method: 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name : result.user.displayName,
                email : result.user.email,
                photo : result.user.photoURL
            })
        })
          console.log(res)  
            // const res = await axios.post('http://localhost:5000/api/googleauth',body)
            const key = (await res.json()).token
            // key.then((result) => {
                // 'result' here is the resolved value of the Promise
                // Assuming 'result' is an Object with a 'token' property
                // const token = result.token;
              
                // Now you can use the 'token' variable as needed
            //     console.log(token);
            //   })
            // console.log(key)
            const decoded = jwtDecode(key);
            // console.log(decoded['prv'])
            dispatch(signInSuccess(decoded['user']))
            localStorage.setItem('item',key)
            navigator('/home')
        } catch (error) {
            console.log('Google login error : ', error)
        }

    }

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('item'));
    //     // if(currentUser == null){
    //           dispatch(signInSuccess(items))
    //     // }
    //   }, []);
    
  return (
      <button type='button' onClick={gooleClickHandler} className='bg-red-700 p-3 rounded-lg text-white m-2 
      hover:opacity-80 uppercase disabled:opacity-70'>Continue with Google</button>
    
  )
}
