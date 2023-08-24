import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import cimg from '../../assets/c.png'
import './home.css'
const Home = ({addData}) => {
  const [selectedOvers, setSelectedOvers] = useState(0);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [errors, setErrors] = useState({});
  // const handleovers = (selectedOvers) => {
  //      setSelectedOvers()
  // }
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    if (!selectedOvers) {
      newErrors.selectedOvers = '';
    }

    if (!teamA) {
      newErrors.teamA = '';
    }

    if (!teamB) {
      newErrors.teamB = 'Please fill all the fields';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleStartClick = () => {
    const isValid = validateForm();

    if (isValid) {
      // Proceed to the score board or perform other actions
      addData={
        teamA:teamA,
        teamB:teamB
      }
      navigate('/ScoreBorde');
    }
  };


  return (
    <>
    <div classNameName="headerhome">
                    <h1 className='headertitlehome'>UMPIRE-CALL</h1>
      </div>
        <div className='homepage'>
    <div className="App">
      
      <div className='home'>
        <label>Select Overs:</label>
        <select value={selectedOvers} onChange={(e) => setSelectedOvers(e.target.value)} className={errors.selectedOvers ? 'error' : ''}>
          <option value="0" selected disabled>-------</option>
          <option value="5">5 Overs</option>
          <option value="10">10 Overs</option>
          <option value="20">20 Overs</option>
          <option value="50">50 Overs</option>

        </select>
        {errors.selectedOvers && <p className='error-text'>{errors.selectedOvers}</p>}
      </div>
      <div>
        <label>Team A:</label>
        <input type="text" value={teamA} onChange={(e) => setTeamA(e.target.value)} className={errors.teamA ? 'error' : ''}/>
        {errors.teamA && <p className='error-text'>{errors.teamA}</p>}
      </div>
      <div>
        <label>Team B:</label>
        <input type="text" value={teamB} onChange={(e) => setTeamB(e.target.value)} className={errors.teamB ? 'error' : ''}/>
        {errors.teamB && <p className='error-text'>{errors.teamB}</p>}
      </div>
      <button onClick={handleStartClick} className='start-btn' >Start</button>
      
    </div>
      <div className='middle'>
        <img className='cimg' src={cimg} alt='logo'/>
      </div>
    </div>
    </>
  );
}

export default Home;