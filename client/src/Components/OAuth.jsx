import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import app from "../fireBase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/User/UserSlice.js";
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";
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
            
            // const res = await axios.post('http://localhost:5000/api/googleauth',body)
            const data = await res.json();
            dispatch(signInSuccess(data))
            localStorage.setItem('item',JSON.stringify(data))
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
