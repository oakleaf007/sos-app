import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './component/header/Header'
import BottomBar from './component/header/BottomBar'
import Map from './component/map/Map'
import { useLocation } from './contexts/LocationContext'
import 'leaflet/dist/leaflet.css'

import SignUp from './component/entry/Signup'
import Signin from './component/entry/Sign'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './component/entry/ProtectedRoute'
import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import { LocationProvider } from './contexts/LocationContext'
import { Navigate } from 'react-router-dom'
import MapPage from './component/entry/MapPage'


function App() {
  
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);
  return (
    <>
      <Header></Header>

      <main> 

       
          <Routes>
            <Route path="/" element={isLoggedIn ? <MapPage />: <Navigate to ="/signin"/>
 } />
            <Route path="/signin" element={ !isLoggedIn ? <Signin /> : <Navigate to="/"/>} />
            <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/"/>} />
            
          </Routes>

     

      </main>
      <BottomBar></BottomBar>
    </>
  )
}

export default App
