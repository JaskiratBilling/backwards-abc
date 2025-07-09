import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Create array of letters from Z to A
  const backwardsAlphabet = Array.from({ length: 26 }, (_, i) => 
    String.fromCharCode(90 - i) // 90 is ASCII for 'Z', so we go Z, Y, X, ..., A
  );

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault(); // Prevent page scrolling
      if (isComplete) {
        resetApp();
      } else if (currentIndex < backwardsAlphabet.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (currentIndex === backwardsAlphabet.length - 1) {
        setIsComplete(true);
      }
    }
  };

  const resetApp = () => {
    setCurrentIndex(0);
    setIsComplete(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, isComplete]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn the ABC's Backwards</h1>
        
        {!isComplete ? (
          <div className="letter-display">
            <div className="current-letter">{backwardsAlphabet[currentIndex]}</div>
            <div className="progress">
              {currentIndex + 1} of {backwardsAlphabet.length}
            </div>
            <div className="instructions">
              Press <kbd>Space</kbd> to continue
            </div>
          </div>
        ) : (
          <div className="completion">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You've learned the alphabet backwards!</p>
            <div className="instructions">
              Press <kbd>Space</kbd> or click the button to start over
            </div>
            <button onClick={resetApp} className="reset-button">
              Start Over
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
