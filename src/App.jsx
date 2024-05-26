import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/common/Navbar/Navbar'
import Footer from './Components/common/Footer/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App
