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
import Auth from './component/entry/Sign'
function App() {
  const {locationStatus} = useLocation();


  const login = true;
  return (
    <>
      <Header></Header>
      {login?(
      <main>  {locationStatus && <p id='status'>{locationStatus}</p> }<Map />  </main>
     ):(
      <Auth/>
     )
    
    }
      <BottomBar></BottomBar>
    </>
  )
}

export default App
