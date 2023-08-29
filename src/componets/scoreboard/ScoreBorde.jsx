import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import cimg from "../../assets/c.png";
import Header from "../header/Header";
import "./scorebord.css"

function KeypadPopup({ onSelectNumber, setIsPopupOpen, handleNoBallRuns }) {
    const handleNumberClick = (number) => {
        onSelectNumber(number);
        handleNoBallRuns(number + 1, 0)
        setIsPopupOpen(false)
    };
    return (
        <div className="keypad">
            <h4>Extra Run on No-ball </h4>
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

//handle wide balls
function KeypadPopupwide({ onSelectNumber, setIsPopupOpenwide, handleWideBallRuns }) {
    const handleNumberClick = (number) => {
        onSelectNumber(number);
        handleWideBallRuns(number + 1, 0)
        setIsPopupOpenwide(false)
    };
    return (
        <div className="keypad">
            <h4>Extra Run on wide ball </h4>
            <div className="keypad-buttons">
                {[0, 1, 2, 3, 4].map((number) => (
                    <button key={number} id="noballbtn" onClick={() => handleNumberClick(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

const ScoreBorde = ({ teamOver, winningdata }) => {
    const navigate = useNavigate();
    const [runWicketData, setRunWicketData] = useState([]);
    const [currentRun, setCurrentRun] = useState(0);
    const [currentWicket, setCurrentWicket] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [over, setOver] = useState(0)
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenwide, setIsPopupOpenwide] = useState(false);
    const [balls, setBalls] = useState(0);
    const [flag, setFlag] = useState([]);
    const [declair, setDeclair] = useState(false);
    const lastTenNumbers = flag.slice(-10);
    const [maxOver, setMexOver] = useState(teamOver.map((team) => team.selectedOvers));
    const [teamone, setTeamOne] = useState(teamOver.map((team) => team.teamA));
    const [teamtwo, setTeamTwo] = useState(teamOver.map((team) => team.teamB));
    const [team1run, setTeam1run] = useState(0);
    const [inning, setInning] = useState(1);
    const [target, setTarget] = useState(0)

    const handleinneng = () => {
        if (inning === 1) { handlefirstinneng(); }
        else { handlesecondinneng(); }
    }

    //innenig 1 handle
    const handlefirstinneng = () => {
        if (currentWicket >= 10 || over >= maxOver) {
            setTarget(currentRun + 1);
            setBallCount(0);
            setCurrentRun(0);
            setCurrentWicket(0)
            setOver(0)
            setRunWicketData([])
            setFlag([])
            setInning(inning + 1)
            alert(`first inning is completed and target is ${currentRun + 1} from Team ${teamone} !!!`)
        }
    }

    // handle second inning
    const handlesecondinneng = () => {
        if (currentWicket < 10 && over <= maxOver && currentRun >= target) {
            winningdata({
                winnerteam: teamtwo,
                lossTeam: teamone,
                currentRuns: currentRun,
                currentWickets: currentWicket,
                team1run: team1run
            })
            navigate("/index");
        }
        else if ((currentWicket >= 10 || (over >= maxOver && ballCount >= balls)) && currentRun < (target - 1)) {
            winningdata({
                winnerteam: teamone,
                lossTeam: teamtwo,
                currentRun: currentRun,
                currentWicket: currentWicket,
                team1run: team1run
            })
            navigate("/index");
        }
        else if ((currentWicket <= 10 && (over <= maxOver && ballCount === balls)) && currentRun === (target - 1)) {
            alert("Match tied")
            navigate('/')
        }
    }

    // handle declare
    const handledeclair = () => {
        if (inning === 1 && (over !== 0 || ballCount !== 0)) {
            const result = window.confirm("Are you sure")
            if (result) {
                setTeam1run(currentRun)
                setTarget(currentRun + 1)
                setBalls(ballCount)
                setBallCount(0)
                setCurrentRun(0)
                setCurrentWicket(0)
                setOver(0)
                setDeclair(true)
                setRunWicketData([])
                setFlag([])
                setInning(inning + 1)
                setMexOver(over)
                handleinneng()
                alert(`first inning is completed and target is ${currentRun + 1} from Team ${teamone} !!!`)
            }
            else { }
        }
        else {
            alert("You can't perform this action")
        }
    }

    // handle popupkeybord for noball
    const openPopup = () => {
        setIsPopupOpen(true);
    }

    // handle popupkeybord for wideball
    const openPopupwide = () => {
        setIsPopupOpenwide(true);
    }

    // handle runs on no balls
    const handleNoBallRuns = (runs, wickets) => {
        setBallCount(ballCount);
        const newRunWicketData = [...runWicketData, { runs, wickets, over, ballCount }];
        setRunWicketData(newRunWicketData);
        setFlag([...flag, { runs: "Nb" + (runs - 1), wickets }]);
        setCurrentRun(currentRun + runs);
        setCurrentWicket(currentWicket + wickets);
    }

    // handle runs on wide balls
    const handleWideBallRuns = (runs, wickets) => {
        setBallCount(ballCount);
        const newRunWicketData = [...runWicketData, { runs, wickets, over, ballCount }];
        setFlag([...flag, { runs: "Wd" + (runs - 1), wickets }]);
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

    // update runs and wickets and timeline 
    const updateRunWicket = (runs, wickets) => {
        const newRunWicketData = [...runWicketData, { runs, wickets, over, ballCount }];
        const newTimeline = [...flag, { runs, wickets: "W" }]
        setFlag(newTimeline);
        setRunWicketData(newRunWicketData);
        setCurrentRun(currentRun + runs);
        setCurrentWicket(currentWicket + wickets);
        handleBowl();
        handleinneng();

    };

    // handle undo button
    const undoLastAction = () => {
        if (runWicketData.length > 0) {
            const lastAction = runWicketData.pop();
            setRunWicketData([...runWicketData]);
            setCurrentRun(currentRun - lastAction.runs);
            setCurrentWicket(currentWicket - lastAction.wickets);
            setOver(lastAction.over)
            setBallCount(lastAction.ballCount)
            flag.pop()
        }
    };

    return (
        <>
            <Header runWicketData={runWicketData} />
            <div className='scorecard'>
                <div className="upper">
                    <div className="runview">
                        <div className="firstsection">
                            <p className='runs'>Runs/Out : {currentRun}/{currentWicket}</p>
                            <p className='over'>Over:{over}.{ballCount}/{maxOver}{balls !== 0 && declair ? "." + balls : ''}</p>
                        </div>
                        <div className="team">
                            <div className="team1">
                                <p className="teamtitle">
                                    {teamone}
                                </p>
                                <p className="target">
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
                            <div className="team2">
                                <p className="teamtitle">
                                    {teamtwo}
                                </p>
                                <p className="target">
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
                    <div className="middle">
                        <img className="cimg" src={cimg} alt="Cricket IMG" style={{ width: "75%" }} />
                    </div>
                </div>
                <div className="umpire">
                    <p className="tenballrun">Runs of Last 10 Balls</p>
                    <section className="tenballrun">
                        {lastTenNumbers.length === 0 ? (
                            <p className="runoftenballs" >Enter first Run...</p>
                        ) : (
                            <div style={{ display: "flex" }}>
                                {lastTenNumbers.map((data, index) => (
                                    <li className="runoftenballs" key={index}>{data.runs !== false ? data.runs : "W"}</li>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="typeofball">
                    <button className='decision-btn-noball' onClick={() => undoLastAction()}> Undo </button>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(false, 1)}>Out</button>
                    <button className='decision-btn-noball' onClick={handledeclair}>Declare</button>
                    <button className='decision-btn-noball' onClick={openPopupwide}>Wide</button>
                    <button className='decision-btn-noball' onClick={openPopup}>No-Ball</button>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(0, 0)} value={0}> 0</button>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(1, 0)} value={1}>1</button>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(2, 0)} value={2}>2</button>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(3, 0)} value={3}>3</button>
                    <div className="noballhandler">
                        {isPopupOpen && <KeypadPopup onSelectNumber={setSelectedNumber}
                            setIsPopupOpen={setIsPopupOpen} handleNoBallRuns={handleNoBallRuns} />}
                    </div>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(4, 0)} value={4}>4</button>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(5, 0)} value={5}>5</button>
                    <div className="noballhandler">
                        {isPopupOpenwide && <KeypadPopupwide onSelectNumber={setSelectedNumber}
                            setIsPopupOpenwide={setIsPopupOpenwide} handleWideBallRuns={handleWideBallRuns} />}
                    </div>
                    <button className='decision-btn-noball' onClick={() => updateRunWicket(6, 0)} value={6}>6</button>

                </div>
            </div>

        </>
    )
}

export default ScoreBorde