import React from 'react';

const TimerDisplay = ({ timerLabel, timeLeft }) => {
  return (
    <div id="timer-display">
      <h2 id="timer-label">{timerLabel}</h2>
      <div id="time-left">{timeLeft}</div>
    </div>
  );
};

export default TimerDisplay;
