import "./scorebord.css"
import cimg from "../../assets/c.png";
import Header from "../header/Header";
import { useState } from 'react'



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



const ScoreBorde = () => {
    const [runWicketData, setRunWicketData] = useState([]);
    const [currentRun, setCurrentRun] = useState(0);
    const [currentWicket, setCurrentWicket] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [over, setOver] = useState(0)
    const lastTenNumbers = runWicketData.slice(-10);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <div className='scorecard'>

            <Header undoLastAction={undoLastAction} runWicketData={runWicketData} />

            <div className="upper">
                <div className="runview">
                    <p className='runs'>Runs/Out : {currentRun}/{currentWicket}</p>
                    <p className='over'>Over:{over}.{ballCount}</p>
                </div>
                <div className="middle">
                    <img className="cimg" src={cimg} alt="Cricket IMG" />
                </div>
            </div>
            <div className="umpire">
                <p className="tenballrun">Runs of Last 10 Balls</p>
                <section className="tenballrun">
                    {lastTenNumbers.length === 0 ? (
                        <p className="runoftenballs" >Enter first Run...</p>
                    ) :
                        (
                            <div style={{ display: "flex" }}>

                                {lastTenNumbers.map((data, index) => (
                                    <li className="runoftenballs" key={index}> {data.runs}</li>
                                ))}
                            </div>
                        )}

                </section>
            </div>

            <div className="typeofball">
                <div className="noballhandler">
                    {isPopupOpen && <KeypadPopup onSelectNumber={setSelectedNumber}
                        setIsPopupOpen={setIsPopupOpen} handleNoBallRuns={handleNoBallRuns} />}
                </div>
                <button className='decision-btn-noball' onClick={openPopup}>No-Ball</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(0, 1)}>Wicket</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(0, 0)} value={0}> 0</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(1, 0)} value={1}>1</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(2, 0)} value={2}>2</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(3, 0)} value={3}>3</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(4, 0)} value={4}>4</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(5, 0)} value={5}>5</button>
                <button className='decision-btn-noball' onClick={() => updateRunWicket(6, 0)} value={6}>6</button>
            </div>
        </div>

    )
}

export default ScoreBorde