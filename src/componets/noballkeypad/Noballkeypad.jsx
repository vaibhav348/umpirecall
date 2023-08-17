import { useState } from "react";

const Keypad = ({ onClose, onSave }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberClick = (number) => {
      setSelectedNumber(number);
  };

  const handleSave = () => {
      onSave(selectedNumber);
      setSelectedNumber(null);
      onClose();
  };

  return (
      <div className="keypad">
          <h2 style={{textAlign:"center" , margin:"5px"}}>Extra Run on No-ball {selectedNumber}</h2>
          <div className="keypad-buttons">
              {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                  <button id="noballbtn"
                      key={number}
                      onClick={() => handleNumberClick(number)}
                      className={selectedNumber === number ? 'selected' : ''}
                  >
                      {number}
                  </button>
              ))}
              <button id="noballbtn" onClick={handleSave}>Save</button>
              <button id="noballbtn" onClick={onClose}>Cancel</button>
          </div>
        
      </div>
  );
};
export default Keypad