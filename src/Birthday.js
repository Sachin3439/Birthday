import React, { useState, useEffect, useRef } from 'react';
import song from './birthday-song.mp3';
import './Birthday.css';

function Birthday() {
  const [data, setData] = useState({ name: '', message: '', image: '' });
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('birthdayData'));
    if (stored) setData(stored);
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowFireworks(true);
    if (audioRef.current) audioRef.current.play();
    setTimeout(() => setShowFireworks(false), 3000);
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      } else {
        if (isFlipped) audioRef.current?.play();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isFlipped]);

  return (
    <div className="birthday-bg">
      <h1 className="animated-heading">🎉 Happy Birthday 🎉</h1>

      <div className="balloon-container">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`balloon balloon-${i + 1}`}></div>
        ))}
      </div>

      {showFireworks && (
        <div className="fireworks">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`spark spark-${i + 1}`}></div>
          ))}
        </div>
      )}

      <div className={`flip ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-inner">
          <div className="flip-front">
            <img src={data.image} alt="birthday" />
          </div>
          <div className="flip-back">
            <h2 className="glow-text1">{data.name} 🎈</h2>
            <p className="glow-text">{data.message}</p>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={song} preload="auto" />
      <button className="glow-button" onClick={handleFlip}>
        {isFlipped ? 'Show Picture' : 'Show Wishes'}
      </button>
      <p className="shimmer-message">Many many happy returns of the day!</p>
    </div>
  );
}

export default Birthday;
