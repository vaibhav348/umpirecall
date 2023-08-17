import "./scorebord.css"
import cimg from "../../c.png"
import unduimg from "../../undu.png"
import { useState } from 'react'
import Keypad from "../noballkeypad/Noballkeypad"

const ScoreBorde = () => {
    const [out, setOut] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [over, setOver] = useState(0)
    const [keypadVisible, setKeypadVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);












    const [valuesArray, setValuesArray] = useState([]);









    

    //noballdata
    const handleKeypadOpen = () => {
        setKeypadVisible(true);
        setValuesArray([...valuesArray, 1]);
    };
    const handleKeypadClose = () => {
        setKeypadVisible(false);
    };
    const handleKeypadSave = (value) => {
        setSelectedValue(value);
        setValuesArray([...valuesArray, value]);
    };






    //handel OUT
    const handelOut = () => {
        if (out >= 10) {
            alert(`ALL PLAYER OUT & TARGET IS ${calculateSum()} !!!`)
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
            setValuesArray([...valuesArray]);
            alert(`ALL PLAYER OUT & TARGET IS ${calculateSum()} !!!`)

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
        setValuesArray([...valuesArray, 0]);
        handleBowl();
        handelBallRunOut()
    }
    const handelOne = () => {
        setValuesArray([...valuesArray, 1]);
        handleBowl();
        handelBallRunOut()
    }
    const handelTow = () => {
        setValuesArray([...valuesArray, 2]);
        handleBowl();
        handelBallRunOut()
    }
    const handelThree = () => {
        setValuesArray([...valuesArray, 3]);
        handleBowl();
        handelBallRunOut()
    }
    const handelFour = () => {
        setValuesArray([...valuesArray, 4]);
        handleBowl();
        handelBallRunOut()
    }
    const handelFive = () => {
        setValuesArray([...valuesArray, 5]);
        handleBowl();
        handelBallRunOut()
    }
    const handelSix = () => {
        setValuesArray([...valuesArray, 6]);
        handleBowl();
        handelBallRunOut()
    }


    const calculateSum = () => {
        const sum = valuesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum;
    };







    const lastTenNumbers = valuesArray.slice(-10);









    return (
        <div className='scorecard'>
            <div className="upper">
                <div className="runview">
                    <p className='runs'>Runs/Out : {calculateSum()}/{out}</p>
                    <p className='over'>Over:{over}.{ballCount}</p>
                  
                </div>

                <div className="middle">
                <img className="cimg" src={cimg} alt="Cricket IMG" />
           
                </div>
            </div>

            <div className="umpire">
                {/* <h1 className='umpire-heading'>Umpire  decision</h1> */}








                <p className="tenballrun">Runs of Last 10 Balls</p>
                <section className="tenballrun">
                    {lastTenNumbers.length === 0 ? (
                        <p>Enter first Run...</p>
                    ) :
                        (
                            <div>
                                {lastTenNumbers.join(', ')}
                                {console.log(lastTenNumbers)}
                            </div>
                        )}
                </section>











                <div className="typeofball">
                    <div className="noballhandler">
                        {keypadVisible && (
                            <Keypad
                                onClose={handleKeypadClose}
                                onSave={handleKeypadSave}
                            />
                        )}
                    </div>
                    <button className='decision-btn-noball' onClick={handleKeypadOpen}> no-ball


                    </button>
                    <button className='decision-btn' onClick={handelOut}> out

                    </button>
                    <button className='decision-btn' onClick={handelZero}> 0</button>
                    <button className='decision-btn' onClick={handelOne}> 1</button>
                    <button className='decision-btn' onClick={handelTow}> 2</button>
                    <button className='decision-btn' onClick={handelThree}> 3</button>
                    <button className='decision-btn' onClick={handelFour}> 4</button>
                    <button className='decision-btn' onClick={handelFive}> 5</button>
                    <button className='decision-btn' onClick={handelSix}> 6</button>
                </div>



            </div>

        </div>
    )
}

export default ScoreBorde