import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import About from './Pages/About'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}
