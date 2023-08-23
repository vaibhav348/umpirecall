import React from 'react'
import Footer from "./componets/footer/Footer.jsx"
import Header from './componets/header/Header.jsx'
import "./App.css"
import ScoreBorde from './componets/scoreboard/ScoreBorde.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componets/home/index.jsx'
const App = () => {
  
  return (
<>
{/* <Header /> */}
<BrowserRouter>
<Routes>
  <Route path='/' element= {<Home />} />
 <Route path='/ScoreBorde' element={<ScoreBorde />} />
 </Routes>
  <Footer/>
</BrowserRouter>
 </>
  )
}

export default App




























