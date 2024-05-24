import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/common/Navbar/Navbar'
import DarkModeToggle from './DarkModeToggle'
function App() {

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
