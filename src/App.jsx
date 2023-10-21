import { useState } from 'react'
import './App.css'
import WeatherTable from './components/WeatherTable';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  return (
    <div>
      <h1>Weekly Weather Report</h1>
        <WeatherTable/>
    </div>
  )
}

export default App
