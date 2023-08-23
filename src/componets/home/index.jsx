import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import cimg from '../../assets/c.png'
import './home.css'
const Home = () => {
  const [selectedOvers, setSelectedOvers] = useState(0);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');

  // const handleovers = (selectedOvers) => {
  //      setSelectedOvers()
  // }

  return (
    <>
    <div classNameName="headerhome">
                    <h1 className='headertitlehome'>UMPIRE-CALL</h1>
      </div>
        <div className='homepage'>
    <div className="App">
      
      <div className='home'>
        <label>Select Overs:</label>
        <select value={selectedOvers} onChange={(e) => setSelectedOvers(e.target.value)}>
          <option value="0" selected disabled>-------</option>
          <option value="5">5 Overs</option>
          <option value="10">10 Overs</option>
          <option value="20">20 Overs</option>
          <option value="50">50 Overs</option>

        </select>
      </div>
      <div>
        <label>Team A:</label>
        <input type="text" value={teamA} onChange={(e) => setTeamA(e.target.value)} required/>
      </div>
      <div>
        <label>Team B:</label>
        <input type="text" value={teamB} onChange={(e) => setTeamB(e.target.value)} required/>
      </div>
      <Link to = '/ScoreBorde'><button  className='start-btn' >Start</button></Link>
    </div>
      <div className='middle'>
        <img className='cimg' src={cimg} alt='logo'/>
      </div>
    </div>
    </>
  );
}

export default Home;