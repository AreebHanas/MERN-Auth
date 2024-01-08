import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className="bg-slate-200">
       <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       <Link to='/home'><h1 className="font-bold">Auth App</h1> </Link>
       <ul className="flex gap-4">    
      <Link to='/home'><li>Home</li></Link>
      <Link to='/about'><li>About</li></Link>
        {(currentUser)?(<Link to='/profile'><img className="rounded-full h-7 w-7 object-cover" src={currentUser.profilepicture} alt="ProfilePicture"/></Link>):(<Link to='/'><li>SignIn</li></Link>)}        
      </ul>
      </div>
    </div>
  )
}
