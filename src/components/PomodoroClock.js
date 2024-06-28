import React, { useState, useEffect, useRef } from 'react';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import './PomodoroClock.css';

const PomodoroClock = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60 * 1000); // in milliseconds
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1000);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      audioRef.current.play();
      if (isSession) {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60 * 1000);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60 * 1000);
      }
      setIsSession(prev => !prev);
    }
  }, [isActive, timeLeft, breakLength, sessionLength, isSession]);

  const handleReset = () => {
    setIsActive(false);
    setIsSession(true);
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel('Session');
    setTimeLeft(25 * 60 * 1000);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const adjustSessionLength = (action) => {
    if (!isActive) {
      if (action === 'increment' && sessionLength < 60) {
        setSessionLength(prev => prev + 1);
        setTimeLeft((prev) => (timerLabel === 'Session' ? (prev + 60000) : prev));
      } else if (action === 'decrement' && sessionLength > 1) {
        setSessionLength(prev => prev - 1);
        setTimeLeft((prev) => (timerLabel === 'Session' ? (prev - 60000) : prev));
      }
    }
  };

  const adjustBreakLength = (action) => {
    if (!isActive) {
      if (action === 'increment' && breakLength < 60) {
        setBreakLength(prev => prev + 1);
      } else if (action === 'decrement' && breakLength > 1) {
        setBreakLength(prev => prev - 1);
      }
    }
  };

  const toggleTimer = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div id="pomodoro-clock">
      <h1>25 + 5 Clock</h1>
      <TimerControls
        sessionLength={sessionLength}
        breakLength={breakLength}
        adjustSessionLength={adjustSessionLength}
        adjustBreakLength={adjustBreakLength}
        handleReset={handleReset}
        toggleTimer={toggleTimer}
        isActive={isActive}
      />
      <TimerDisplay timerLabel={timerLabel} timeLeft={formatTime(timeLeft)} />
      <audio id="beep" ref={audioRef} src={`${process.env.PUBLIC_URL}/sounds/beep.mp3`} />
    </div>
  );
};

export default PomodoroClock;
