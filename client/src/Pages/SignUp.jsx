import {Link} from "react-router-dom"

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className='text-center text-3xl font-semibold m-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
      <input type="text" placeholder='User Name' id='username' className='bg-slate-100 rounded-lg p-3 ' />
      <input type="email" placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-3 ' />
      <input type="password" placeholder='Password' id='password' className='bg-slate-100 rounded-lg p-3 ' />
      <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 m-8 disabled:opacity-70'>sign up</button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to="/signin">
        <span className="text-blue-600 hover:opacity-90">Sign in</span>
        </Link>
      </div>
    </div>
  )
}
