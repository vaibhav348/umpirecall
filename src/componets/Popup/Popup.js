
 function Popup({ onSelect }) {
    return (
      <div className="popup">
        {[0, 1, 2, 3, 4, 5, 6].map(num => (
          <button key={num} onClick={() => onSelect(num)}>
            {num}
          </button>
        ))}
      </div>
    );
  }
  export default Popup