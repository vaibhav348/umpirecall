import React, { useState } from 'react'
import "./App.css";
import Winner from './componets/winner';
import ScoreBorde from './componets/scoreboard/ScoreBorde.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componets/home/index.jsx'

const App = () => {
  const[winningteamdata, setwinningteamdata] = useState([])
const winningdata = (teamwindata) => {
  setwinningteamdata([teamwindata])
  console.log(teamwindata)
}

  const [teamOver, setTeamOver] = useState([])
  const addData = (teamOverData) => {
    setTeamOver([teamOverData])
  }
  return (
<>
<BrowserRouter>
<Routes>
  <Route exact path = '/' element = {<Home addData={addData}/>} />
 <Route exact path = '/ScoreBorde' element = {<ScoreBorde teamOver = {teamOver} winningdata = {winningdata} />} />
 <Route exact path = '/index' element = {<Winner winningteamdata = {winningteamdata}/>} />
 </Routes>
</BrowserRouter>
 </>
  )
}

export default App




























