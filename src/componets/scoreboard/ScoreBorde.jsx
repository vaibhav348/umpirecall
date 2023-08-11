import "./scorebord.css"
import cimg from "../../c.png"
import { useState } from 'react'

const ScoreBorde = () => {
    const [total, setTotal] = useState(0);
    const [out, setOut] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [over, setOver] = useState(0)

    //handel OUT
    const handelOut = () => {
        if (out >= 10) {
            alert(`ALL PLAYER OUT & TARGET IS ${total} !!!`)
        }
        else {
            setOut(out + 1);
            handleBowl();
        }
    }

    //handel run and ball whan all out
    const handelBallRunOut = () => {
        if (out >= 10) {
            setBallCount(ballCount);
            setTotal(total);

            alert(`ALL PLAYER OUT & TARGET IS ${total} !!!`)

        }
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

    //handel runs 
    const handelZero = () => {
        setTotal((prevTotal) => prevTotal + 0);
        handleBowl();
        handelBallRunOut()
    }
    const handelOne = () => {
        setTotal((prevTotal) => prevTotal + 1);
        handleBowl();
        handelBallRunOut()
    }
    const handelTow = () => {
        setTotal((prevTotal) => prevTotal + 2);
        handleBowl();
        handelBallRunOut()
    }
    const handelThree = () => {
        setTotal((prevTotal) => prevTotal + 3);
        handleBowl();
        handelBallRunOut()
    }
    const handelFour = () => {
        setTotal((prevTotal) => prevTotal + 4);
        handleBowl();
        handelBallRunOut()
    }
    const handelFive = () => {
        setTotal((prevTotal) => prevTotal + 5);
        handleBowl();
        handelBallRunOut()
    }
    const handelSix = () => {
        setTotal((prevTotal) => prevTotal + 6);
        handleBowl();
        handelBallRunOut()
    }

    //handel no Ball
    const noBallHandelr = () => {
        setTotal(total + 1)
        handelBallRunOut()
    }


    return (
        <div className='scorecard'>
            <div className="upper">
                <div className="runview">
                    <p className='runs'>Runs/Out : {total}/{out}</p>
                    <p className='over'>Over:{over}.{ballCount}</p>
                </div>
                <img src={cimg} alt="Cricket IMG" />
            </div>

            <div className="umpire">
                <h1 className='umpire-heading'>Umpire  decision</h1>
                <div className="typeofball">
                    <button className='decision-btn' onClick={noBallHandelr}>no-ball</button>
                    <button className='decision-btn' onClick={handelOut}>out</button>
                    <button className='decision-btn' onClick={handelZero}>0</button>
                    <button className='decision-btn' onClick={handelOne}>1</button>
                    <button className='decision-btn' onClick={handelTow}>2</button>
                    <button className='decision-btn' onClick={handelThree}>3</button>
                    <button className='decision-btn' onClick={handelFour}>4</button>
                    <button className='decision-btn' onClick={handelFive}>5</button>
                    <button className='decision-btn' onClick={handelSix}>6</button>
                </div>
            </div>

        </div>
    )
}

export default ScoreBorde