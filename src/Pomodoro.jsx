import React, { useState, useEffect } from 'react';
import './Pomodoro.css'
function PomodoroTimer() {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && !isBreak) {
      setIsBreak(true);
      setTime(300); // 5 minutes break in seconds
    } else if (time === 0 && isBreak) {
      setIsBreak(false);
      setTime(1500); // 25 minutes work time in seconds
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(1500);
  };

  const toggleMode = () => {
    (isBreak) ? setTime(1500) : setTime(300);
    setIsBreak(!isBreak);
  };

  return (
    <div className={`timer ${isBreak ? 'break' : 'work'}`}>
      <div className="heading"><span>Pomodoro Timer !</span></div>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="buttons">
        <button onClick={toggleMode} >Skip {isBreak ? 'Break' : 'Work'}</button>
        {
          (isActive) &&
              <button onClick={()=>{setTime(time + 60)}} >+1</button>
        }
      </div>
    </div>
  );
}

export default PomodoroTimer;
