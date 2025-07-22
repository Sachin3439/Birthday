import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import song from './birthday-song.mp3';
import './Birthday.css';

function Birthday() {
  const [data, setData] = useState({ name: '', message: '', image: '' });
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const audioRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`birthdayData-${id}`));
    if (storedData) setData(storedData);
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
      }).catch(() => {});
    }
  }, []);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
    setShowFireworks(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setTimeout(() => setShowFireworks(false), 2000);
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      } else if (isFlipped) {
        audioRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isFlipped]);

  return (
    <div className="birthday-bg">
      <h1 className="animated-heading">🎉 Happy Birthday 🎉</h1>

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
