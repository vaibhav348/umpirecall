import "./scorebord.css"
import cimg from "../../assets/c.png";
import Header from "../header/Header";
import { useState } from 'react'
import Home from "../home";
import { useNavigate } from "react-router-dom";
// import { toHaveErrorMessage } from "@testing-library/jest-dom/matchers";

function KeypadPopup({ onSelectNumber, setIsPopupOpen, handleNoBallRuns }) {
    const handleNumberClick = (number) => {
        onSelectNumber(number);
        handleNoBallRuns(number + 1, 0)
        setIsPopupOpen(false)
    };
    return (
        <div className="keypad">
            <h4 style={{ textAlign: "center", fontWeight: 400, margin: "5px", fontFamily: "system-ui", color: "gray" }}>Extra Run on No-ball </h4>
            <div className="keypad-buttons">
                {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                    <button key={number} id="noballbtn" onClick={() => handleNumberClick(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}



const ScoreBorde = ({teamOver , winningdata}) => {
    const navigate = useNavigate();
    const [runWicketData, setRunWicketData] = useState([]);
    const [currentRun, setCurrentRun] = useState(0);
    const [currentWicket, setCurrentWicket] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [over, setOver] = useState(0)
    const lastTenNumbers = runWicketData.slice(-10);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
const [maxOver, setMexOver] = useState( teamOver.map((team)=> team.selectedOvers));
const [teamone, setTeamOne] = useState( teamOver.map((team)=>team.teamA)); 
const [teamtwo, setTeamTwo] = useState( teamOver.map((team)=>team.teamB)); 



const [inning, setInning] = useState(1);
const [target, setTarget] = useState(0)

const handleinneng=()=>{
    if(inning === 1){handlefirstinneng();}
    else {handlesecondinneng();}
}

//innenig 1 handle
const handlefirstinneng = () => {
    if(currentWicket >= 10 || over >= maxOver){
        
        setTarget(currentRun+1);
        setBallCount(0);
        setCurrentRun(0);
        setCurrentWicket(0)
        setOver(0)
        setRunWicketData([])
        setInning(inning+1)
        alert(`first inning is completed and target is ${currentRun+1} from Team ${teamone} !!!` )
    }
}
// const [winnerteam, setwinnerteam]=useState("");
// const [lossTeam, setLossTeam]= useState("");
const handlesecondinneng = () => {
    if(currentWicket<10 && over<maxOver && currentRun>target){
        // setwinnerteam(teamtwo);
        // setLossTeam(teamone);
        // alert(`team ${teamtwo} is winner `)
        winningdata({
            winnerteam:teamtwo,
            lossTeam:teamone,
        })
        navigate("/index");
    }
    else if(currentWicket >= 10 || over >= maxOver){
        // setwinnerteam(teamone);
        // setLossTeam(teamtwo)

        // alert(`team ${teamone} is winer `);
        winningdata({
            winnerteam:teamone,
            lossTeam:teamtwo,
          })
        navigate("/index");
    }
}

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    const handleNoBallRuns = (runs, wickets) => {
        setBallCount(ballCount);
        const newRunWicketData = [...runWicketData, { runs, wickets, over, ballCount }];
        setRunWicketData(newRunWicketData);
        setCurrentRun(currentRun + runs);
        setCurrentWicket(currentWicket + wickets);

    }



    // handel over and ball
    const handleBowl = () => {
        if (ballCount < 5) {
            setBallCount(ballCount + 1);
        } else {
            setBallCount(0)
            setOver(over + 1)
        }
        
    };
    const updateRunWicket = (runs, wickets) => {
        const newRunWicketData = [...runWicketData, { runs, wickets, over, ballCount }];
        setRunWicketData(newRunWicketData);
        setCurrentRun(currentRun + runs);
        setCurrentWicket(currentWicket + wickets);
        handleBowl();
        handleinneng();
    };

    const undoLastAction = () => {
        if (runWicketData.length > 0) {
            const lastAction = runWicketData.pop();
            setRunWicketData([...runWicketData]);
            setCurrentRun(currentRun - lastAction.runs);
            setCurrentWicket(currentWicket - lastAction.wickets);
            setOver(lastAction.over)
            setBallCount(lastAction.ballCount)
        }
    };


    return (
        <>
            <Header undoLastAction = {undoLastAction} runWicketData = {runWicketData} />
            <div className = 'scorecard'>


                <div className = "upper">
                    <div className = "runview">
                       <div className = "firstsection">

                        <p className = 'runs'>Runs/Out : {currentRun}/{currentWicket}</p>
                        <p className = 'over'>Over:{over}.{ballCount}/{maxOver}</p>
                       </div>
                       <div className = "team">
                        <div className = "team1">
                         
                            <p className = "teamtitle">
                            {teamone}
                            </p>
                            <p className = "target">
                            {
                                (inning === 1)
                                ?
                                <div>
                                   Batting
                                </div>
                                :
                                <div>

                                Target:{target}
                                </div>
                            }
                            </p>

                        </div>
                        <div className = "team2">
                            <p className = "teamtitle">
                           {teamtwo}
                            </p>
                            <p className = "target"> 
                            {
                                (inning === 1)
                                ?
                                <div>
                                    Bowling
                                </div>
                                :
                                <div>
                                    Batting
                                </div>
                            }</p>
                        </div>
                    </div>
                    </div>

                  

                    <div className = "middle">
                        <img className = "cimg" src = {cimg} alt = "Cricket IMG" style = {{ width: "90%" }} />
                    </div>
                </div>
                <div className = "umpire">
                    <p className = "tenballrun">Runs of Last 10 Balls</p>
                    <section className = "tenballrun">
                        {lastTenNumbers.length === 0 ? (
                            <p className = "runoftenballs" >Enter first Run...</p>
                        ) :
                            (
                                <div style = {{ display: "flex" }}>

                                    {lastTenNumbers.map((data, index) => (
                                        <li className = "runoftenballs" key = {index}> {data.runs}</li>
                                    ))}
                                </div>
                            )}

                    </section>
                </div>

                <div className = "typeofball">
                    <div className = "noballhandler">
                        {isPopupOpen && <KeypadPopup onSelectNumber = {setSelectedNumber}
                            setIsPopupOpen = {setIsPopupOpen} handleNoBallRuns = {handleNoBallRuns} />}
                    </div>
                    <button className = 'decision-btn-noball' onClick = {openPopup}>No-Ball</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(0, 1)}>Wicket</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(0, 0)} value = {0}> 0</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(1, 0)} value = {1}>1</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(2, 0)} value = {2}>2</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(3, 0)} value = {3}>3</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(4, 0)} value = {4}>4</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(5, 0)} value = {5}>5</button>
                    <button className = 'decision-btn-noball' onClick = {() => updateRunWicket(6, 0)} value = {6}>6</button>
                </div>
            </div>

        </>
    )
}

export default ScoreBorde