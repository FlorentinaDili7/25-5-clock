import React from 'react';

const TimerControls = ({
  sessionLength,
  breakLength,
  adjustSessionLength,
  adjustBreakLength,
  handleReset,
  toggleTimer,
  isActive,
}) => {
  return (
    <div id="timer-controls">
      <div id="session-controls">
        <h2 id="session-label">Session Length</h2>
        <div className="controls">
          <button id="session-decrement" onClick={() => adjustSessionLength('decrement')} disabled={isActive}>
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => adjustSessionLength('increment')} disabled={isActive}>
            +
          </button>
        </div>
      </div>
      <div id="break-controls">
        <h2 id="break-label">Break Length</h2>
        <div className="controls">
          <button id="break-decrement" onClick={() => adjustBreakLength('decrement')} disabled={isActive}>
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => adjustBreakLength('increment')} disabled={isActive}>
            +
          </button>
        </div>
      </div>
      <button id="start_stop" onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
