// App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bh.css';

const messages = [
    "Happy Birthday!",
    "Wishing you joy!",
    "Best wishes!",
    "Have an amazing day!",
  ];


function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState('');
  const navigate=useNavigate();

  
  // Typewriter effect
  useEffect(() => {
    const message = messages[messageIndex];
    let i = 0;
    const typing = setInterval(() => {
      setTypedMessage(message.substring(0, i));
      i++;
      if (i > message.length) {
        clearInterval(typing);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 150);
    return () => clearInterval(typing);
  }, [messageIndex]);

  // Create balloons
  useEffect(() => {
    if (!showBalloons) return;

    const colors = ['#ff1493', '#00bfff', '#7cfc00', '#ffd700', '#9370db', '#ff6347'];
    const balloonContainer = document.body;

    const createBalloon = () => {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';

      // Random size (30px to 70px)
      const size = Math.random() * 40 + 30;
      balloon.style.width = `${size}px`;
      balloon.style.height = `${size}px`;

      // Random color
      balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Random position
      balloon.style.left = `${Math.random() * 100}%`;

      // Random animation duration (8s to 15s)
      balloon.style.animationDuration = `${Math.random() * 7 + 8}s`;

      // Random delay (0s to 5s)
      balloon.style.animationDelay = `${Math.random() * 5}s`;

      balloonContainer.appendChild(balloon);
    };

    // Create 20 balloons
    for (let i = 0; i < 20; i++) {
      setTimeout(createBalloon, i * 300);
    }

    return () => {
      const balloons = document.querySelectorAll('.balloon');
      balloons.forEach(balloon => balloon.remove());
    };
  }, [showBalloons]);

  // Create confetti
  useEffect(() => {
    if (!showConfetti) return;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiContainer = document.body;

    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      // Random size (5px to 15px)
      const size = Math.random() * 10 + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      // Random color
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Random shape
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%'; // circles
      } else {
        confetti.style.borderRadius = '0'; // squares
      }

      // Random position
      confetti.style.left = `${Math.random() * 100}%`;

      // Random animation duration (3s to 8s)
      confetti.style.animationDuration = `${Math.random() * 5 + 3}s`;

      // Random delay (0s to 2s)
      confetti.style.animationDelay = `${Math.random() * 2}s`;

      confettiContainer.appendChild(confetti);
    };

    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      setTimeout(createConfetti, i * 100);
    }

    return () => {
      const confettiPieces = document.querySelectorAll('.confetti');
      confettiPieces.forEach(confetti => confetti.remove());
    };
  }, [showConfetti]);

  const handleButtonClick = () => {
    setShowConfetti(true);
    setShowBalloons(true);
     navigate('/birthday')
    setTimeout(() => {
      setShowConfetti(false);
      setShowBalloons(false);
    }, 8000);
  };

  return (
    <div className='x'>
    <div className="container">
      <div className="birthday-card">
        <div className="cake-image">
          <img 
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/afd06f78-e874-4e73-8616-e77b37a1f535.png" 
            alt="Colorful birthday cake with frosting and candles in a celebration setting" 
            style={{ 
              outline: 'rgb(0, 0, 0) dotted 3px', 
              outlineOffset: '1px' 
            }}
          />
        </div>
        <div className="birthday-message">
          <div className="typing-text">{typedMessage}</div>
        </div>
        <button className="action-button" onClick={handleButtonClick}>
          Click Here for a Surprise!
        </button>
      </div>
    </div>
    </div>
  );
}

export default App;
