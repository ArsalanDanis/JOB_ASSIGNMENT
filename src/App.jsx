
import './App.css'
import UserDirectoryPage from './components/userDirectory'
import ProfilePage from './components/profilePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from "react";


function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
  }, [])

  return (
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<UserDirectoryPage users={users} />} />
          <Route path='/user/:id' element={<ProfilePage users={users} />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
