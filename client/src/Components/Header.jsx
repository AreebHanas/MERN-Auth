import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className="bg-slate-200">
       <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       <Link to='/'><h1 className="font-bold">Auth App</h1> </Link>
       <ul className="flex gap-4">    
      <li className="">
      <Link to='/signin'>SignIn</Link>
      </li>
      <li>
      <Link to='/signup'>SignUp</Link>
      </li>
      <li>
      <Link to='/about'>About</Link>
      </li>
      </ul>
      </div>
    </div>
  )
}