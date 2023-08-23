
import "./header.css"
import hbicon from "../../assets/menu.png"
const Header = ({ undoLastAction, runWicketData }) => {

  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  return (

    <>
      <header classNameName="header">
        <div className="topnav">
          <div className="navmenu">
            <h1 className='headertitle'>UMPIRE-CALL</h1>
            <div className="rightnev">

            <button className="undubtn" onClick={undoLastAction}>⟳</button>
            <button className="icon" onClick={myFunction}>
              {/* <img src={hbicon} alt="" /> */}
            </button>
            </div>
          </div>
          <div id="myLinks">
            <div className="content">
              <div>
                <h3 className="history"> History</h3>
                <div className="scroler">

                <ul className="historyul">
                  {runWicketData.map((data, index) => (
                    <li className="historyli" key={index}>Runs  Wickets : {data.runs}({data.wickets}) | Over Ball : {data.over}.{data.ballCount}</li>
                  ))}
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>



    </>
  )
}
export default Header