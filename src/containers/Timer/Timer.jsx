import React, { useState, useEffect } from 'react';
import './Timer.css';
import clickSound from '../../assets/audio/clickSound.mp3'
import timerSound from '../../assets/audio/timerSound.mp3';

const PomodoroTimer = () => {
  const [mode, setMode] = useState('pomodoro'); // 'pomodoro' or 'break'
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  // sigma quotes
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  //sounds
  const clickAudio = new Audio(clickSound)
  const timerAudio = new Audio(timerSound)

  // Function to fetch the stoic quote from the API
  const fetchStoicQuote = async () => {
    try {
      const response = await fetch('https://api.themotivate365.com/stoic-quote');
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching stoic quote:', error);
    }
  };

  useEffect(() => {
    fetchStoicQuote();
  }, []);

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      if (timeRemaining <= 0) {
        clearInterval(timer);
        handleTimeUp();
        chrome.runtime.sendMessage({type: 'timeUp'})
      }

      return () => clearInterval(timer);
    }
  }, [timerRunning, timeRemaining]);

  const handlePomodoro = () => {
    setMode('pomodoro');
    setTimeRemaining(25 * 60); // 25 minutes pomodoro
    setTimerRunning(false);
    clickAudio.play()
  };

  const handleBreak = () => {
    setMode('break');
    setTimeRemaining(5 * 60); // 5 minutes break
    setTimerRunning(false);
    clickAudio.play()
  };

  const handleStartPause = () => {
    setTimerRunning((prevState) => !prevState);
    clickAudio.play()
  };

  const handleTimeUp = () => {
    setTimerRunning(false);
    timerAudio.play()
  };

  return (
    
    <div className="pomodoro-timer-container">
        
        <div className="stoic-quote">
        <p>"{quote}"</p>
        <p>- {author}</p>
      </div>
      <div className="timer-display">
        
        <span>
          {`${Math.floor(timeRemaining / 60)
            .toString()
            .padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
        </span>
      </div>
      
      <div className="timer-controls">
        <button onClick={handlePomodoro} className={mode === 'pomodoro' ? 'active' : ''}>
          Pomodoro
        </button>
        <button onClick={handleBreak} className={mode === 'break' ? 'active' : ''}>
          Break
        </button>
        <button onClick={handleStartPause} className={timerRunning ? 'pause' : 'start'}>
          {timerRunning ? 'Pause' : 'Start'}
        </button>
      </div>
      <div className='title'>SigmaTime</div>
      
    </div>
  );
};

export default PomodoroTimer;