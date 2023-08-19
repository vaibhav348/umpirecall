
import "./header.css"
const Header = ({handleUndu}) => {
 
  
    
  
  return (
    <header classNameName="header">
    <h1 className='headertitle'>UMPIRE-CALL</h1>
    <button className="undubtn" onClick={handleUndu}>⟳</button>
   </header>
  )
}
export default Header