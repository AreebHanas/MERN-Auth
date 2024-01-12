import { useEffect,useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate } from "react-router-dom";
import { signInSuccess,signInStart,signInFail,updateProfile } from '../Redux/User/UserSlice';
import axios from 'axios'

export default function Profile() {
  const {currentUser,error,loading,update} = useSelector((state)=>state.user)
  const [updateForm,setUpdateForm] = useState({})
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ref = useRef(null)


  function signoutHandler(){
    if(currentUser){
      localStorage.removeItem('item')
      dispatch(signInSuccess(null))
      navigate("/")
    }
  }

const deleteHandler =async (req,res)=>{
  if(currentUser){
    const id = currentUser._id;
    const response = await axios.delete(`http://localhost:5000/api/delete/${id}`)
    localStorage.removeItem('item')
    navigate("/")
  } else{
    res.send('Can not delete')
  }
}

  function onChangeHandler(e){
    const key = e.target.id
    let value
    if(key == 'profilepicture'){
      value = e.target.files[0]
    } else(
      value = e.target.value
    )
    dispatch(updateProfile(false))
    setUpdateForm((prv)=> {return{...prv,[key]:value}})
  }


const submitHandler = async (e)=>{
  e.preventDefault()
  if (!currentUser || !currentUser._id) {
    console.error("User ID is undefined");
    // Handle the error or return early
    return;
  }
  localStorage.removeItem('item')
  const postData = new FormData();
  Object.entries(updateForm).forEach(([key, value]) => {
      postData.append(key, value)});
      try {
        dispatch(signInStart())
        const response = await axios.patch(`http://localhost:5000/api/update/${currentUser._id}`,postData)
        const data = response.data
        dispatch(updateProfile(true))
        if(updateForm.success === false){
          dispatch(signInFail(data))
          return;
        } 
        dispatch(signInSuccess(data.update))
        localStorage.setItem('item',JSON.stringify(data.update))
      } catch (error) {
        dispatch(signInFail(error))
      }
}


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('item'));
  if(items != null){
        dispatch(signInSuccess(items));
  }
    localStorage.setItem("lastRoute", location.pathname);
  
    // const items = JSON.parse(localStorage.getItem('update'));
  }, []);
  
  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-center text-3xl m-3 font-sans font-semibold'>Profile</h1>
      <form className='flex flex-col gap-3 m-3' encType="multipart/form-data" onSubmit={submitHandler}>
        <input type="file" hidden ref={ref} id='profilepicture' accept='image/*' onChange={onChangeHandler}/>
        <img src={currentUser.profilepicture} onClick={()=>ref.current.click()} alt='Profile' className='rounded-full h-28 w-28 self-center cursor-pointer'/>
        <input type="text" placeholder='Username' id='username' onChange={onChangeHandler}  defaultValue={currentUser.username} className='bg-slate-100 rounded-lg p-3'/>
        <input type="email" placeholder='Email' id='email' onChange={onChangeHandler} defaultValue={currentUser.email} className='bg-slate-100 rounded-lg p-3'/>
        <input type="password" placeholder='password' id='password' onChange={onChangeHandler}  className='bg-slate-100 rounded-lg p-3'/>
        <span className='text-green-800 ml-3 text-center'>{(update)?'Account Updated':null}</span>
        <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 m-2 disabled:opacity-70'
        disabled={loading}>{(loading)?"Loading...":"Update"}</button>
      </form>
      <div className='flex justify-between'>
        <span className='text-red-800 ml-3 cursor-pointer' onClick={deleteHandler}>Delete Account</span>
        <span className='text-red-800 mr-3 cursor-pointer' onClick={signoutHandler}>Sign Out</span>
        </div>
    </div>
  )
}