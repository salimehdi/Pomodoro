import React, { useState, useEffect } from "react";
import {FaRegSun} from "react-icons/fa";
import "./Pomodoro.css";
function PomodoroTimer({workTime,breakTime}) {
  const [time, setTime] = useState(workTime); 
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && !isBreak) {
      setIsBreak(true);
      setTime(breakTime); 
    } else if (time === 0 && isBreak) {
      setIsBreak(false);
      setTime(workTime); 
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(workTime);
  };

  const toggleMode = () => {
    setIsBreak(!isBreak); //react scheduling a state update
    !isBreak ? setTime(breakTime) : setTime(workTime); // since isBreak is not updated yet, we use the opposite value to schedule the time state update
  };

  return (
    <div className={`timer ${isBreak ? "break" : "work"}`}>
      
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="buttons">
        <button onClick={toggleMode}>Skip {isBreak ? "Break" : "Work"}</button>
        {isActive && 
          (<button onClick={() => { setTime(time + 60); }} > +1 </button>)
        }
      </div>
    </div>
  );
}

export default PomodoroTimer;
