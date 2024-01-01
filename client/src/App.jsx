import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import About from './Pages/About'
import Header from './Components/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}
