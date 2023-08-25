import React, { useState } from 'react'
import "./App.css";
import ScoreBorde from './componets/scoreboard/ScoreBorde.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componets/home/index.jsx'

const App = () => {
  const [teamOver, setTeamOver]=useState([])
  const addData = (teamOverData) =>{
    setTeamOver([teamOverData])
  }
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element= {<Home addData={addData}/>} />
 <Route path='/ScoreBorde' element={<ScoreBorde teamOver={teamOver} />} />
 </Routes>
</BrowserRouter>
 </>
  )
}

export default App




























