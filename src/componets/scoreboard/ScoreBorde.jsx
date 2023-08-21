import "./scorebord.css"
import cimg from "../../assets/c.png";
import Header from "../header/Header";
import { useState } from 'react'
import Keypad from "../noballkeypad/Noballkeypad"

const ScoreBorde = () => {


    
    const [out, setOut] = useState(0);
    const [ballCount, setBallCount] = useState(0);
    const [over, setOver] = useState(0)
    const [outArray, setOutArray] = useState([])
    const [flag, setFlag] = useState([])
    const [keypadVisible, setKeypadVisible] = useState();
    const [selectedValue, setSelectedValue] = useState(null);
    const [valuesArray, setValuesArray] = useState([]);
    const lastTenNumbers = flag.slice(-10);
    //noballdata
    const handleKeypadOpen = () => {
        if (out >= 10) {
            alert(`ALL PLAYER OUT & TARGET IS ${calculateSum()} !!!`)
        }
        else {
          
            setKeypadVisible(true);
        }
        // setValuesArray([...valuesArray, 1]);
    };
    const handleKeypadClose = () => {
        setKeypadVisible(false);
    };
    const handleKeypadSave = (value) => {
        setSelectedValue(value);
        setValuesArray([...valuesArray, 1+value]);
        setFlag([...flag,"NB"+value])
    };

    //handel OUT
    const handelOut = () => {
        if (out >= 10) {
            alert(`ALL PLAYER OUT & TARGET IS ${calculateSum()} !!!`)
        }
        else {
            setOut(out+1)
            handleBowl();
        setOutArray([...outArray, 1]);
        setFlag([...flag,"W"])
        }
    }
    const outSum = () => {
        const sum = outArray.reduce((accumulator, currentValue) => accumulator + currentValue , 0);
        return sum;
    };

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
        setFlag([...flag,0])
    }
    const handelOne = () => {
        setValuesArray([...valuesArray, 1]);
        handleBowl();
        handelBallRunOut()
        setFlag([...flag,1])
    }
    const handelTow = () => {
        setValuesArray([...valuesArray, 2]);
        handleBowl();
        handelBallRunOut()
        setFlag([...flag,2])
    }
    const handelThree = () => {
        setValuesArray([...valuesArray, 3]);
        handleBowl();
        handelBallRunOut()
        setFlag([...flag,3])
    }
    const handelFour = () => {
        setValuesArray([...valuesArray, 4]);
        handleBowl();
        handelBallRunOut()
        setFlag([...flag,4])
    }
    const handelFive = () => {
        setValuesArray([...valuesArray, 5]);
        handleBowl();
        handelBallRunOut()
        setFlag([...flag,5])
    }
    const handelSix = () => {
        setValuesArray([...valuesArray, 6]);
        handleBowl();
        handelBallRunOut()
        setFlag([...flag,6])
    }
  
    const calculateSum = () => {
        const sum = valuesArray.reduce((accumulator, currentValue) => accumulator + currentValue , 0);
        return sum;
    };
const handleUndu=()=>{
        if(ballCount<=5 && ballCount>0){
        valuesArray.pop();
        flag.pop();
        setBallCount(ballCount-1)
    }
        else if(over===0 && ballCount===0 ){
        
        alert("plese enter runs")
    }  
    else{
    flag.pop();
    valuesArray.pop();
        setOver(over-1)
        setBallCount(5)
    }
}

    return (
        <div className='scorecard'>
        <Header handleUndu={handleUndu}/>

            <div className="upper">
                <div className="runview">
                    <p className='runs'>Runs/Out : {calculateSum()}/{outSum()}</p>
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

export default ScoreBorde;
