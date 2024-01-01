import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from"axios"

export default function SignIp() {
  const [form,setForm] = useState({})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const nevigate = useNavigate()
function onChangeHandler(e){
  setError(false)
  const name = e.target.id
  const value = e.target.value
  setForm((prv)=>{
    return {
      ...prv,[name]:value
    }
  })
}

 const onClickHandler = async (e)=>{
e.preventDefault();
setLoading(true)
try {
  const response = await axios.post('http://localhost:5000/api/validation',form)
  alert("Signed In");
  
setLoading(false)
setError(false)
nevigate("/")
} catch (error) {
  setLoading(false)
  setError(true)
}
}
  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-center text-3xl font-semibold m-7'>Sign In</h1>
      <form className='flex flex-col gap-4'>
      <input type="email" placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-3 ' 
      onChange={onChangeHandler}/>
      <input type="password" placeholder='Password' id='password' className='bg-slate-100 rounded-lg p-3 ' 
      onChange={onChangeHandler}/>
      <div className="text-red-700">
        {(error)?"Ooops invelid Email or Password!":null}
      </div>
      <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 m-8 disabled:opacity-70'
      onClick={onClickHandler} disabled={loading}>{(loading)?"Loading...":"sign In"}</button>
      </form>
      <div className="flex gap-2">
        <p>Do not have an account?</p>
        <Link to="/signup">
        <span className="text-blue-600 hover:opacity-90">Sign up</span>
        </Link>
      </div>
    </div>
  )
}
