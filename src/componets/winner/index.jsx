import React, { useState } from 'react'
import "./winner.css"
import vs from "../../assets/vs.jpeg";
import trophy from "../../assets/trophy.jpeg"

const Winner = ({winningteamdata}) => {
  
const [winteam, setWinteam]= useState( winningteamdata.map((win)=> win.winnerteam));
const [lossteam, setLossteam]= useState( winningteamdata.map((loss)=> loss.lossTeam));
const [winScore, setwinScore]= useState( winningteamdata.map((winrun)=>winrun.winScore));

  return (
    <>


          <header className="winnerheader">
    <h1 className='headertitle'>UMPIRE-CALL</h1>
  </header>

  <main>
<section className="mainsection">

    <div className="container">
      <div className="box">
        {/* <img className="team1" src={team1} alt="team1" /> */}
      
<h1 className="teamname">{winteam}</h1>
      
      </div>
      <div className="box">
        <img className="vs" src={vs} alt="versus symbol" />
      </div>
      <div className="box">
      
<h1 className="teamname">{lossteam}</h1>
        {/* <img className="team2" src={team2} alt="team2" /> */}
      </div>
     
     
    </div>
    <div className="zoom-in-out-box">
        <img src={trophy} alt="trophy" />
      </div>

    <div className="bottom-div">
      <p className='regult_heading'>Team <span>{winteam}</span> Won </p>

{/* <p className='regult_heading'>{winScore} Runs in 10.8 over</p> */}
    </div>
  </section>
  </main>

    {/* <footer>
      <h1>@CopyRight-Umpire Decision 2023-20...</h1>
    </footer> */}
  </>
  )
}

export default Winner
