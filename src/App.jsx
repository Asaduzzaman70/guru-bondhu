import './App.css'
import DarkModeToggle from './DarkModeToggle'
function App() {

  return (
    <>
      <div className="bg-myColor-light text-black dark:bg-gray-900 dark:text-white min-h-screen flex items-center justify-center">
        <div className="p-4">
          <DarkModeToggle/>
          <p className="text-gray-700 dark:text-gray-300">
            <span className='dark:hidden'>This text will change color based on the theme.</span>
            <span className='hidden dark:inline-block'>This text will change color based on the theme.......................</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
